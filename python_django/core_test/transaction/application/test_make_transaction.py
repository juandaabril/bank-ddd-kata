import unittest

from core.transactions.application.MakeTransaction import MakeTransaction
from core.transactions.domain.transaction_repository import TransactionRepository
from core.transactions.infrastructure.in_memory_transaction_repository import InMemoryTransactionRepository
from core_test.account.domain.accont_id_mother import AccountIdMother


class TransactionIdMother(object):
    pass


class TestMakeTransaction(unittest.TestCase):
    make_transaction: MakeTransaction
    transactionRepository: TransactionRepository

    def test_make_a_transaction(self):
        transaction_id = TransactionIdMother.random()
        account_id = AccountIdMother.random()
        amount = 500

        self.transactionRepository = InMemoryTransactionRepository()
        self.make_transaction = MakeTransaction(self.transactionRepository)

        self.make_transaction(account_id, amount)




if __name__ == '__main__':
    unittest.main()
