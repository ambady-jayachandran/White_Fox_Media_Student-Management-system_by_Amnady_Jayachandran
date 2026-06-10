from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    LoginView,
    LogoutView,
    RegisterView,
    StudentListCreateView,
    StudentRetrieveUpdateDestroyView,
    TokenValidateView,
)

urlpatterns = [
    path("login", LoginView.as_view(), name="login"),
    path("register", RegisterView.as_view(), name="register"),
    path("logout", LogoutView.as_view(), name="logout"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/validate", TokenValidateView.as_view(), name="token_validate"),
    path("students", StudentListCreateView.as_view(), name="student_list_create"),
    path("students/<int:pk>", StudentRetrieveUpdateDestroyView.as_view(), name="student_detail"),
]
