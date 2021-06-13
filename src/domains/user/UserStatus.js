export class UserStatus {
  static ACTIVE = new UserStatus('ACTIVE', 'Active');
  static IN_ACTIVE = new UserStatus('IN_ACTIVE', 'Inactive');
  static BANNED = new UserStatus('BANNED', 'Banned');

  constructor(name, title) {
    this.name = name;
    this.title = title;
  }

  getByName(name) {
    return this.values.find((value) => value.name === name);
  }
}

export const userStatusValues = [
  UserStatus.ACTIVE,
  UserStatus.IN_ACTIVE,
  UserStatus.BANNED,
];
