package account

import (
	"errors"
	domain "go_gin_gonic/core/domain/account"
)

type InMemoryAccountRepository struct {
	database map[string]*domain.Account
}

func NewInMemoryAccountRepository() domain.AccountRepository {
	return &InMemoryAccountRepository{
		database: map[string]*domain.Account{},
	}
}

func (repository *InMemoryAccountRepository) Save(account *domain.Account) error {
	repository.database[account.Id()] = account
	return nil
}

func (repository *InMemoryAccountRepository) FindById(id string) (*domain.Account, error) {
	result := repository.database[id]
	if result == nil {
		return nil, errors.New("account not found")
	}

	account := domain.NewAccountWithBalance(result.Id(), result.CustomerId(), result.Balance())
	return account, nil
}
