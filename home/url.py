from django.urls import path
from . import views


urlpatterns = [
    path('', views.index,name='index'),
    path('getmovie', views.getmovie,name='getmovie'),
    #path('getseries', views.getseries,name='getseries'),
    # path('home',views.homepage, name='home')
]