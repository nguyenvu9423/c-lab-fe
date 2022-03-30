import * as React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card, Label, Header } from 'semantic-ui-react';
import DefaultThumbnail from '../../../../public/images/default-thumbnail.png';
import { ArrayUtils } from '../../../utility';
import { Article } from '../../../domains/article';
import { useSelector } from 'react-redux';
import { TagSelectors } from '../../../store/selectors/TagSelectors';
import { UserSelectors } from '../../../store/selectors';
import { BackEndConfig } from '../../../config';
import { DateTimeUtils } from '../../../utility/data-type/DateTimeUtils';
import { Avatar } from '../../../components/avatar/Avatar';
import { ArticlePageLink } from '../ArticlePageLink';

export const OverviewArticleCard: React.FC<{ article: Article }> = (props) => {
  const { article } = props;

  const author = useSelector(UserSelectors.selectById(article.author));
  const tags = useSelector(TagSelectors.selectByIds(article.tags));

  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>
          <div className="overview-article-card">
            <ArticlePageLink article={article}>
              <Image
                bordered
                className="thumbnail"
                src={
                  article.thumbnail
                    ? BackEndConfig.API_URL + article.thumbnail
                    : DefaultThumbnail
                }
              />
            </ArticlePageLink>

            <div className="content">
              <ArticlePageLink article={article}>
                <Header>{article.title}</Header>
              </ArticlePageLink>

              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: article.overview }}
              />
              <div className="additional-info">
                <Link
                  className="username-label"
                  to={`/users/${author.username}`}
                >
                  <Avatar user={author} />
                  {author.username}
                </Link>
                <span className="created-at-label">
                  {' '}
                  - {DateTimeUtils.of(article.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>
        </Card.Description>
      </Card.Content>
      {ArrayUtils.isNotEmpty(article.tags) && (
        <Card.Content extra>
          <Label.Group tag>
            {tags.map((tag) => tag && <Label key={tag.id}>{tag.name}</Label>)}
          </Label.Group>
        </Card.Content>
      )}
    </Card>
  );
};
