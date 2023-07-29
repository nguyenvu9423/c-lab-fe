import * as React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card, Label, Header, Grid } from 'semantic-ui-react';
import DefaultThumbnail from '../../../../public/images/default-thumbnail.png';
import { ArrayUtils } from '../../../utils';
import { Article } from '@/domains/article';
import { useSelector } from 'react-redux';
import { TagSelectors } from '@/store/selectors/TagSelectors';
import { UserSelectors } from '@/store/selectors';
import { BackEndConfig } from '../../../config';
import { DateTimeUtils } from '../../../utils/data-type/DateTimeUtils';
import { Avatar } from '@/components/avatar/Avatar';
import { ArticlePageLink } from '../ArticlePageLink';
import { MarkdownView } from '../../../components';

export const OverviewArticleCard: React.FC<{ article: Article }> = (props) => {
  const { article } = props;

  const author = useSelector(UserSelectors.selectById(article.author));
  const tags = useSelector(TagSelectors.selectByIds(article.tags));

  return (
    <Card className="overview-article-card" fluid>
      <Card.Content>
        <Card.Description>
          <Grid stackable>
            <Grid.Column width={4}>
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
            </Grid.Column>
            <Grid.Column className="info" width={12}>
              <ArticlePageLink article={article}>
                <Header>{article.title}</Header>
              </ArticlePageLink>
              <MarkdownView>{article.overview}</MarkdownView>
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
            </Grid.Column>
          </Grid>
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
