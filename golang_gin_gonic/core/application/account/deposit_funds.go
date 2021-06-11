package account

import "go_gin_gonic/core/domain/account"

type DepositFunds struct {
	accountRepository account.AccountRepository
}

func (depositFunds *DepositFunds) Execute(accountId string, value int) error {
	account, err := depositFunds.accountRepository.FindById(accountId)
	if err != nil {
		return err
	}

	account.IncreaseBalance(value)

	return depositFunds.accountRepository.Save(account)
}

func NewDepositFunds(repository account.AccountRepository) *DepositFunds {
	return &DepositFunds{
		accountRepository: repository,
	}
}
