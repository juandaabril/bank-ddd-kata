from amqp.events.event_handler import event_handler


def EventPattern(pattern: str):
    def decorator(func):
        event_handler.register_handler(pattern, func)
        return func

    return decorator
