from django.urls import path, include

from .views import UploadAPIVIew, WorkerAPIVIew

urlpatterns = [
    path('upload/', UploadAPIVIew.as_view()),
    path('worker/', WorkerAPIVIew.as_view())
]