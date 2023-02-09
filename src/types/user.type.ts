export enum UserRole {
  Usual = 'обычный',
  Pro = 'pro',
}

export type UserType = {
  name: string;
  email: string;
  avatarURL: string;
  type: UserRole
}
