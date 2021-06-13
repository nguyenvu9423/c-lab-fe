import * as React from 'react';
import { Link } from 'react-router-dom';
import { Image, Card, Label, Header, Icon } from 'semantic-ui-react';
import DefaultThumbnail from '../../../../public/images/default-thumbnail.png';
import DefaultAvatar from '../../../../public/images/avatar-placeholder.png';
import { serverPath } from '../../../server';
import ArrayUtils from '../../../utility/ArrayUtils';

export function OverviewArticleCard(props) {
  const { article } = props;
  const { author } = article;
  if (!author) return null;
  if (!author) {
    return null;
  }
  return (
    <Card fluid>
      <Card.Content>
        <Card.Description>
          <div style={{ display: 'flex' }}>
            <Image
              bordered
              src={
                article.thumbnailURL ? article.thumbnailURL : DefaultThumbnail
              }
              style={{
                width: 150,
                marginRight: 14,
                objectFit: 'cover',
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Header as={Link} to={`/articles/${article.id}`}>
                {article.title}
              </Header>
              <div
                style={{ flexGrow: 1 }}
                className={'article-container'}
                dangerouslySetInnerHTML={{
                  __html: article.overview,
                }}
              />
              <div
                style={{
                  display: 'inline-block',
                  marginTop: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <Image
                  circular
                  size="mini"
                  floated="left"
                  bordered
                  style={{
                    width: 24,
                    height: 24,
                    margin: '0 1rem 0 0',
                    objectFit: 'cover',
                  }}
                  src={
                    author.avatarUrl
                      ? serverPath.resolve(author.avatarUrl)
                      : DefaultAvatar
                  }
                />
                <a
                  style={{
                    verticalAlign: 'middle',
                    color: 'rgba(0,0,0,.87)',
                    fontWeight: 'bold',
                  }}
                  href={`users/${author.username}`}
                >
                  {author.username}
                </a>
                <span
                  style={{ verticalAlign: 'middle', color: 'rgba(0,0,0,.4)' }}
                >
                  {' '}
                  - 3 hours ago
                </span>
              </div>
            </div>
          </div>
        </Card.Description>
      </Card.Content>
      {ArrayUtils.isNotEmpty(article.tags) && (
        <Card.Content extra>
          <Label.Group tag>
            {article.tags.map((tag) => (
              <Label key={tag.id}>{tag.name}</Label>
            ))}
          </Label.Group>
        </Card.Content>
      )}
    </Card>
  );
}
