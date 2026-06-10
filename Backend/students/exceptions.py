from django.http import Http404
from rest_framework import exceptions, status
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is None:
        return response

    if isinstance(exc, (exceptions.ValidationError,)):
        message = "Validation Error"
        errors = response.data
    elif isinstance(exc, Http404):
        message = "Resource not found"
        errors = response.data
    else:
        message = response.data.get("detail", "Something went wrong") if isinstance(response.data, dict) else "Something went wrong"
        errors = None

    payload = {"success": False, "message": message}
    if errors is not None:
        payload["errors"] = errors

    response.data = payload
    if response.status_code >= status.HTTP_500_INTERNAL_SERVER_ERROR:
        response.data = {"success": False, "message": "Something went wrong"}
    return response
