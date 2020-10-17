from core.account.domain.accont_id import AccountId
from core_test.shared.base.domain.uuid_mother import UUIDMother


class AccountIdMother(object):
    @staticmethod
    def random() -> AccountId:
        random_uuid = UUIDMother.random().value
        return AccountId(random_uuid)
