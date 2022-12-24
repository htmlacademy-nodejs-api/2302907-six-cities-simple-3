enum userRole {
  'обычный',
  'pro',
}

export type UserType = {
  name: string;
  email: string;
  avatarURL: string;
  password: string;
  type: userRole
}
