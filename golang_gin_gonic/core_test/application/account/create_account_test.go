package account

import (
	"github.com/stretchr/testify/assert"
	application "go_gin_gonic/core/application/account"
	infrastructue "go_gin_gonic/core/infrastructure/account"
	"testing"
)

func TestCreateAccount(t *testing.T) {
	accountId := "123"
	customerId := "456"

	accountRepository := infrastructue.NewInMemoryAccountRepository()
	createAccount := application.NewCreateAccount(accountRepository)

	err := createAccount.Execute(accountId, customerId)

	newAccount, errFindById := accountRepository.FindById(accountId)

	assert.Nil(t, err)
	assert.Nil(t, errFindById)
	assert.NotNil(t, newAccount)
	assert.EqualValues(t, newAccount.Id(), accountId)
	assert.EqualValues(t, newAccount.CustomerId(), customerId)
	assert.EqualValues(t, newAccount.Balance(), 0)
}
