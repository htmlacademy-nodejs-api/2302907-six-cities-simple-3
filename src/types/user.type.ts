enum UserRole {
  Usual = 'обычный',
  Pro = 'pro',
}

export type UserType = {
  name: string;
  email: string;
  avatarURL: string;
  password: string;
  type: UserRole
}
