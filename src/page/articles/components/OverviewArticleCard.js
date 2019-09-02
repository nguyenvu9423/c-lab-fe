import * as React from 'react';
import { Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

class BaseOverviewArticleCard extends React.Component {
  render() {
    const { article } = this.props;
    if (article === undefined) return null;
    const { author } = article;

    return (
      <Card fluid>
        <Card.Content>
          {author && (
            <Image size="mini" floated="left" src={author.avatarLink} />
          )}
          <Card.Header>{article && article.title}</Card.Header>
          {author && (
            <Card.Meta>
              by{' '}
              <a style={{ fontSize: 'bold' }} href={`users/${author.username}`}>
                {author.username}
              </a>
            </Card.Meta>
          )}
        </Card.Content>
        <Card.Content>
          <Card.Description>
            <div
              className={'article-container'}
              style={{
                maxHeight: 250,
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
              dangerouslySetInnerHTML={{
                __html: article && article.content
              }}
            />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>Extra Content</Card.Content>
      </Card>
    );
  }
}

export const OverviewArticleCard = connect((state, ownProps) => {
  const { articleId } = ownProps;
  const { entities } = state;
  return {
    article: entities.article[articleId]
  };
})(BaseOverviewArticleCard);
