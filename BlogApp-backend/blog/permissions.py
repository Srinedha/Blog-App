from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthorOrReadOnly(BasePermission):
    """
    Custom permission to only allow authors of a blog post to edit/delete it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions allowed to anyone
        if request.method in SAFE_METHODS:
            return True

        # Write permissions only for the author
        return obj.author == request.user
