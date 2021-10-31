from typing import TYPE_CHECKING
from django.http.response import JsonResponse
from django.shortcuts import render
import json

def index(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        movieTitle = data['movies']
        print(movieTitle)
        return JsonResponse(movieTitle), render(request,'index.html')
    else:
        return render(request,'index.html')