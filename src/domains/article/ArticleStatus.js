export class ArticleStatus {
  static ACTIVE = new ArticleStatus('ACTIVE', 'Active');
  static IN_ACTIVE = new ArticleStatus('IN_ACTIVE', 'Inactive');
  static HIDDEN = new ArticleStatus('HIDDEN', 'Hidden');
  static BANNED = new ArticleStatus('BANNED', 'Banned');

  constructor(name, title) {
    this.name = name;
    this.title = title;
  }

  getByName(name) {
    return this.values.find((value) => value.name === name);
  }
}

export const articleStatusValues = [
  ArticleStatus.ACTIVE,
  ArticleStatus.IN_ACTIVE,
  ArticleStatus.HIDDEN,
  ArticleStatus.BANNED,
];
