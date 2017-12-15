from django.conf.urls import url, include
import views

urlpatterns = [
url(r'show_dashboard$', views.show_dashboard, ),
url(r'show_orderdata$', views.show_orderdata, ),
url(r'show_typedata$', views.show_typedata, ),
url(r'show_predictdata$', views.show_predictdata, ),
url(r'show_areadata$', views.show_areadata, ),
url(r'show_worlddata$', views.show_worlddata, ),
]