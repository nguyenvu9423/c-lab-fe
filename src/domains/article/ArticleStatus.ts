export enum ArticleStatus {
  ACTIVE = 'ACTIVE',
  IN_ACTIVE = 'IN_ACTIVE',
  HIDDEN = 'HIDDEN',
  BANNED = 'BANNED',
}

export const articleStatusValues: ArticleStatus[] = [
  ArticleStatus.ACTIVE,
  ArticleStatus.IN_ACTIVE,
  ArticleStatus.HIDDEN,
  ArticleStatus.BANNED,
];
