from core.provider import provider

class ProviderMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.provider = provider

        response = self.get_response(request)

        return response
