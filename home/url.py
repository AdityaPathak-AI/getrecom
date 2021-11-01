from django.urls import path
from . import views


urlpatterns = [
    path('getmovie', views.getmovie,name='getmovie'),
    path('getseries', views.getseries,name='getseries'),
    path('', views.index,name='index'),
]