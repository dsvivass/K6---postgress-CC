from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework import status
import json
from .models import File, Worker

# Create your views here.


class UploadAPIVIew(APIView):

    parser_classes = [MultiPartParser]

    def post(self, request):

        data = request.data

        file, filename, description = data['file'], data['file'].name, data['description']
        File.objects.create(file=file, filename=filename,
                            description=description)

        return Response({"message": 'OK'}, status=status.HTTP_200_OK)


class WorkerAPIVIew(APIView):

    def get(self, request):
        workers = Worker.objects.all()
        workers = [{
            'name': worker.name,
            'email': worker.email,
            'created_at': worker.created_at} for worker in workers]
        return Response(workers, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        name, email = data['name'], data['email']
        Worker.objects.create(name=name, email=email)
        return Response({"message": 'OK'}, status=status.HTTP_200_OK)
