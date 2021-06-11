package account

import (
	"go_gin_gonic/core/domain/account"
)

type CreateAccount struct {
	accountRepository account.AccountRepository
}

func NewCreateAccount(accountRepository account.AccountRepository) *CreateAccount {
	return &CreateAccount{
		accountRepository: accountRepository,
	}
}

func (self *CreateAccount) Execute(accountId string, customerId string) error {
	account := account.NewAccount(accountId, customerId)
	return self.accountRepository.Save(account)
}
