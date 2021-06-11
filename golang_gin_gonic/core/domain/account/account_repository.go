package account

type AccountRepository interface {
	Save(account *Account) error
	FindById(id string) (*Account, error)
}
