import * as React from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react/dist/commonjs/collections/Grid/Grid';

class BaseOverviewArticleCard extends React.Component {
  render() {
    const { articleId } = this.props;
    const { entities } = this.props;
    const article = entities.article[articleId];
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>{article && article.title}</Card.Header>
        </Card.Content>
        <Card.Content>
          <Card.Meta>Meta</Card.Meta>
          <Card.Description>
            <div
              className={'article-container'}
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

export const OverviewArticleCard = connect(state => {
  return {
    entities: state.entities
  };
})(BaseOverviewArticleCard);
