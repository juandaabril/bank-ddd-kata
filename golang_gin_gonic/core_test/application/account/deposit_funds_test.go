package account

import (
	"github.com/stretchr/testify/assert"
	application "go_gin_gonic/core/application/account"
	infrastructue "go_gin_gonic/core/infrastructure/account"
	"go_gin_gonic/core_test/domain/account"
	"testing"
)

func TestDepositFunds(t *testing.T) {
	randomAccount := account.RandomAccountWithThisBalance(100)
	depositValue := 100

	accountRepository := infrastructue.NewInMemoryAccountRepository()
	depositFunds := application.NewDepositFunds(accountRepository)
	errSave := accountRepository.Save(randomAccount)

	err := depositFunds.Execute(randomAccount.Id(), depositValue)

	databaseAccount, errFind := accountRepository.FindById(randomAccount.Id())

	assert.Nil(t, errSave)
	assert.Nil(t, err)
	assert.Nil(t, errFind)
	assert.NotNil(t, databaseAccount)
	assert.EqualValues(t, randomAccount.Id(), databaseAccount.Id())
	assert.EqualValues(t, randomAccount.CustomerId(), databaseAccount.CustomerId())
	assert.EqualValues(t, randomAccount.Balance()+depositValue, databaseAccount.Balance())
}
