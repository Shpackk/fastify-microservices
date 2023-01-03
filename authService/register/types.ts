enum AccountType {
  DEFAULT = 'DEFAULT',
  BUSINESS = 'BUSINESS',
}

export interface RegisterDto {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  password: string;
  accountType: AccountType;
}
