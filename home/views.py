from typing import TYPE_CHECKING
from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import json
import pandas as pd
import numpy as np

# df = pd.read_csv('F:\study\sem5\Data Science\project\movies.csv',low_memory=False)
df = pd.read_csv('D:\Programming\DataBase\movies.csv', low_memory=False)


@csrf_exempt
def index(request):
    return render(request, "index.html")


@csrf_exempt
def getmovie(request):
    if request.method == 'GET':
        title = (df['original_title'].drop_duplicates()).tolist()
        return JsonResponse({"success": True, "suggestion": title})
    elif request.method == 'POST':
        data = json.loads(request.body)
        moviesList = data['movies']
        
        movieGenre = []
        movieActor = []
        movieProdCom = []
        movieLanguage = []
        movieDirector = []

        for movieTitle in moviesList:
            movie = df[df['original_title'].str.contains(movieTitle, na=False)]

            movieG = movie['genre'].dropna()
            movieGArr = np.array(movieG.values)

            for arr in movieGArr:
                for li in arr.split(", "):
                    if li not in movieGenre:
                        movieGenre.append(li)

            movieA = movie['actors'].dropna()
            movieAArr = np.array(movieA.values)

            for arr in movieAArr:
                i = 0
                for li in arr.split(", "):
                    i += 1
                    if i <= 2:
                        if li not in movieActor:
                            movieActor.append(li)

            if len(moviesList) > 1:
                pass
            else:
                moviePC = movie['production_company'].dropna()
                moviePCArr = np.array(moviePC.values)

                for arr in moviePCArr:
                    for li in arr.split(", "):
                        if li not in movieProdCom:
                            movieProdCom.append(li)

            movieLan = movie['language'].dropna()
            movieLanArr = np.array(movieLan.values)

            for arr in np.array(movieLan):
                i = 0
                for li in arr.split(", "):
                    i += 1
                    if i <= 1:
                        if li not in movieLanguage:
                            movieLanguage.append(li)

            movieDirc = movie['director'].dropna()
            movieDircArr = np.array(movieDirc.values)

            for arr in np.array(movieDirc):
                for li in arr.split(", "):
                    if li not in movieDirector:
                        movieDirector.append(li)
        # print(movieGenre)
        # print(movieActor)
        # print(movieProdCom)
        # print(movieLanguage)
        # print(movieDirector)
        # df[df['title'].str.contains('The Avengers',na = False)]

        movieGenreString = ""
        for gen in movieGenre[:3]:
            movieGenreString = movieGenreString+"|"+gen
        movieGenreString = movieGenreString[1:]

        movieActorString = ""
        for act in movieActor:
            movieActorString = movieActorString+"|"+act
        movieActorString = movieActorString[1:]

        movieProdComString = ""
        for PC in movieProdCom:
            movieProdComString = movieProdComString+"|"+PC
        movieProdComString = movieProdComString[1:]

        enteredMovieString = ""
        for EM in moviesList:
            enteredMovieString = enteredMovieString+"|"+EM
        enteredMovieString = enteredMovieString[1:]

        enteredLanguageString = ""
        for LANG in movieLanguage[:1]:
            enteredLanguageString = enteredLanguageString+"|"+LANG
        enteredLanguageString = enteredLanguageString[1:]

        movieDirectorString = ""
        for Dirc in movieDirector:
            movieDirectorString = movieDirectorString+"|"+Dirc
        movieDirectorString = movieDirectorString[1:]

        print(movieGenreString)
        print(movieActorString)
        print(movieProdComString)
        print(enteredMovieString)
        print(enteredLanguageString)
        
        filterGenre = df[
        (df['genre'].str.contains(movieGenreString))
        & (df['production_company'].str.contains(movieProdComString))
        & (df['director'].str.contains(movieDirectorString))
        & (df['language'].str.contains(enteredLanguageString))
        | (df['actors'].str.contains(movieActorString))
        ]
        result = filterGenre.loc[(~(filterGenre['original_title'].str.contains(enteredMovieString)))].sample(n=10)

        print(type(result))
        
        # for output in result:
            
        #     # time = output['duration'].astype(int)
        #     # hours = int(time/60)
        #     # minu = time%60
        #     print(output)
        #     # resultDic = {
        #     #     'original_title' : output['original_title'],
        #     #     'year' : output['year'],
        #     #     'date_published	' : output['genre'],
        #     #     # 'duration' : (hours,":",minu),
        #     #     'country' : output['country'],
        #     #     'language' : output['language'],
        #     #     'director' : output['director'],
        #     #     'writer' : output['writer'],
        #     #     'production_company' : output['production_company'],
        #     #     'actor' : output.actors,
        #     #     'description' : output['description'],
        #     #     'budget' : output['budget'],
        #     #     'worlwide_gross_income' : output['worlwide_gross_income']
        #     # }
        #     # print(type(output['worlwide_gross_income']))
        #     # resultList.append(output['worlwide_gross_income'])
        # return JsonResponse({"success" : True, "output" : resultList},safe = False)
        resultDict = result.to_dict()
        
        print(type(resultDict))
        return JsonResponse(resultDict,safe = False)
        
    else:
        return JsonResponse({"success" : False, "error" : "Internal Server Error"})

# @csrf_exempt
# def getseries(request):
#     if request.method == 'POST':
#         data = json.loads(request.body)
#         #seriesTitles = data['series']
#         print(data)
#         #dummydata = {
#            # "Title" : "gameofthrones",
#            # "Cast" : "narendra modi",
#           #  }
#         return JsonResponse({"success": True, "suggestion" : data})
#     else:
#         return JsonResponse({"success" : False, "error" : "None"})

# @csrf_exempt
# def homepage(request):
#     return render(request, "index.html")
