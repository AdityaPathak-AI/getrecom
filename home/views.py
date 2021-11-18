from typing import TYPE_CHECKING
from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd

df = pd.read_csv('D:\Programming\DataBase\movies.csv',low_memory=False)


@csrf_exempt
def index(request):
    return render(request, "index.html")

@csrf_exempt
def getmovie(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        movieTitles = data['movies']
        print(movieTitles)
        title = df['title'].tolist
        dummydata = {
            'title' : title
            }
        print(dummydata)
        return JsonResponse({"success": True, "suggestion" : dummydata})
    else:
        return JsonResponse({"success" : False, "error" : "Internal Server Error"})

@csrf_exempt
def getseries(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        #seriesTitles = data['series']
        print(data)
        #dummydata = {
           # "Title" : "gameofthrones",
           # "Cast" : "narendra modi",
          #  }
        return JsonResponse({"success": True, "suggestion" : data})
    else:
        return JsonResponse({"success" : False, "error" : "Internal Server Error"})

# @csrf_exempt
# def homepage(request):
#     return render(request, "index.html")
