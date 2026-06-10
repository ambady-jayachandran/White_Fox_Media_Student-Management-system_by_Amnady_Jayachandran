from rest_framework.permissions import IsAuthenticated


class IsAuthenticatedUser(IsAuthenticated):
    """Named permission class for explicit student API protection."""

