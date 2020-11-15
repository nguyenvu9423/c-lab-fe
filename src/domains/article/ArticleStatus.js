export class ArticleStatus {
  static ACTIVE = new ArticleStatus('ACTIVE', 'Active');
  static IN_ACTIVE = new ArticleStatus('IN_ACTIVE', 'Inactive');
  static HIDDEN = new ArticleStatus('HIDDEN', 'Hidden');
  static BANNED = new ArticleStatus('BANNED', 'Banned');

  static values = [this.ACTIVE, this.IN_ACTIVE, this.HIDDEN, this.BANNED];

  constructor(name, title) {
    this.name = name;
    this.title = title;
  }

  getByName(name) {
    return this.values.find(value => value.name === name);
  }
}
