from django.http import JsonResponse
from django.shortcuts import render
from . import scraper


# Create your views here.
def scrap(request):

    return JsonResponse({"status": scraper.search_youtube(request.GET.get("query"))})
