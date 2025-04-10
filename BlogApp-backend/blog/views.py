from rest_framework import viewsets, permissions
from .models import BlogPost
from .serializers import BlogPostSerializer
from .permissions import IsAuthorOrReadOnly  # 👈 Import the permission

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def get_permissions(self):
        if self.action in ['create', 'update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
