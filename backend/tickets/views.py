from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q, Count, Avg
from django.db.models.functions import TruncDay
import os
import json

from google import genai

from .models import Ticket
from .serializers import TicketSerializer


# =====================================================
# Utility: AI Classification Function
# =====================================================
def classify_with_gemini(description):
    api_key = os.getenv("GOOGLE_API_KEY")

    if not api_key:
        raise Exception("GOOGLE_API_KEY not found in environment variables.")

    client = genai.Client(api_key=api_key)

    prompt = f"""
Classify this support ticket into:

Category: billing, technical, general
Priority: low, medium, high

Description:
{description}

Return ONLY valid JSON in this format:
{{
    "category": "billing|technical|general",
    "priority": "low|medium|high"
}}
"""

    response = client.models.generate_content(
        model="gemini-flash-latest",
        contents=prompt
    )

    ai_text = response.text.strip()

    # Remove markdown block if Gemini returns ```json
    if ai_text.startswith("```"):
        ai_text = ai_text.replace("```json", "").replace("```", "").strip()

    parsed_json = json.loads(ai_text)

    # Safety Validation Layer
    allowed_categories = ["billing", "technical", "general"]
    allowed_priorities = ["low", "medium", "high"]

    category = parsed_json.get("category", "general")
    priority = parsed_json.get("priority", "medium")

    if category not in allowed_categories:
        category = "general"

    if priority not in allowed_priorities:
        priority = "medium"

    return category, priority


# =====================================================
# CRUD + Filtering + Auto AI Classification
# =====================================================
class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all().order_by('-created_at')
    serializer_class = TicketSerializer

    def get_queryset(self):
        queryset = Ticket.objects.all().order_by('-created_at')

        category = self.request.query_params.get('category')
        priority = self.request.query_params.get('priority')
        status = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category=category)

        if priority:
            queryset = queryset.filter(priority=priority)

        if status:
            queryset = queryset.filter(status=status)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) |
                Q(description__icontains=search)
            )

        return queryset

    # 🔥 AUTO AI CLASSIFICATION ON CREATE
    def perform_create(self, serializer):
        description = serializer.validated_data.get("description")

        # Default fallback values
        category = "general"
        priority = "medium"

        try:
            category, priority = classify_with_gemini(description)
        except Exception as e:
            print("AI classification failed:", str(e))

        serializer.save(
            category=category,
            priority=priority,
            status="open"
        )


# =====================================================
# Stats Endpoint
# =====================================================
@api_view(['GET'])
def ticket_stats(request):
    total_tickets = Ticket.objects.count()
    open_tickets = Ticket.objects.filter(status='open').count()

    priority_data = (
        Ticket.objects
        .values('priority')
        .annotate(count=Count('id'))
    )

    priority_breakdown = {
        item['priority']: item['count']
        for item in priority_data
    }

    category_data = (
        Ticket.objects
        .values('category')
        .annotate(count=Count('id'))
    )

    category_breakdown = {
        item['category']: item['count']
        for item in category_data
    }

    avg_data = (
        Ticket.objects
        .annotate(day=TruncDay('created_at'))
        .values('day')
        .annotate(count=Count('id'))
        .aggregate(avg=Avg('count'))
    )

    avg_tickets_per_day = avg_data['avg'] or 0

    return Response({
        "total_tickets": total_tickets,
        "open_tickets": open_tickets,
        "avg_tickets_per_day": avg_tickets_per_day,
        "priority_breakdown": priority_breakdown,
        "category_breakdown": category_breakdown,
    })


# =====================================================
# Manual AI Classification Endpoint
# =====================================================
@api_view(['POST'])
def classify_ticket(request):
    description = request.data.get("description")

    if not description:
        return Response({"error": "Description is required."}, status=400)

    try:
        category, priority = classify_with_gemini(description)

        return Response({
            "category": category,
            "priority": priority
        })

    except Exception as e:
        return Response({
            "error": str(e)
        }, status=500)
