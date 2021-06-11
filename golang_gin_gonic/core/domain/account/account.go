package account

type Account struct {
	id         string
	customerId string
	balance    int
}

func NewAccountWithBalance(accountId string, customerId string, balance int) *Account {
	return &Account{
		id:         accountId,
		customerId: customerId,
		balance:    balance,
	}
}

func NewAccount(accountId string, customerId string) *Account {
	return &Account{
		id:         accountId,
		customerId: customerId,
		balance:    0,
	}
}

func (account *Account) Id() string {
	return account.id
}

func (account *Account) CustomerId() string {
	return account.customerId
}

func (account *Account) Balance() int {
	return account.balance
}

func (account *Account) IncreaseBalance(value int) {
	account.balance = account.balance + value
}
