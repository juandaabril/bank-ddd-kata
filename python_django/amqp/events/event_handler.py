from core.provider import provider


class EventHandler:
    def __init__(self):
        self.handlers = {}

    def call(self, pattern, event):
        if pattern in self.handlers:
            for h in self.handlers[pattern]:
                h(event, provider)

    def register_handler(self, pattern: str, handler):
        if pattern in self.handlers:
            self.handlers[pattern].append(handler)
        else:
            self.handlers[pattern] = [handler]


event_handler = EventHandler()
