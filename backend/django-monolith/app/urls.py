from django.urls import path
from .views import AssetListCreateView

urlpatterns = [
    path('assets/', AssetListCreateView.as_view(), name='asset-list-create'),
] 