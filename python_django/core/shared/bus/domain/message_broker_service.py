from abc import ABCMeta, abstractmethod


class MessageBrokerService(metaclass=ABCMeta):

    @abstractmethod
    def send(self, exchange_name: str, message_type: str, message: str):
        pass

