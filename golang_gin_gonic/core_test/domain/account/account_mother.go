package account

import "go_gin_gonic/core/domain/account"

func RandomAccountWithThisBalance(balance int) *account.Account {
	return account.NewAccountWithBalance("123", "24", balance)
}
