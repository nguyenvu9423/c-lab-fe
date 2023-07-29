import React from 'react';
import { useSelector } from 'react-redux';
import { RawDraftContentState } from 'draft-js';
import { Article } from '@/domains/article';
import { UserSelectors } from '@/store/selectors';
import { Divider, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Avatar } from '@/components/avatar/Avatar';
import { DateTimeUtils } from '../../../utils/data-type/DateTimeUtils';
import { ArticleContentTable } from './ArticleContentTable';
import { RichTextView } from '../../../components';
import { TagPanel } from './TagPanel';

export namespace ArticleContentContainer {
  export interface Props {
    article: Article;
    contentState: RawDraftContentState;
    showContentTable?: boolean;
  }
}

export const ArticleContentContainer: React.FC<
  ArticleContentContainer.Props
> = (props) => {
  const { article, contentState, showContentTable } = props;
  const author = useSelector(UserSelectors.selectById(article.author));

  return (
    <div className="article-container text-container">
      <Segment basic>
        <Header as="h1">
          {article.title}
          <Header.Subheader>{article.subtitle}</Header.Subheader>
        </Header>
      </Segment>
      <Segment className="additional-info" basic>
        <Link to={`/users/${author.username}`}>
          <Avatar user={author} />
        </Link>
        <span className="info-container">
          <Link className="username-label" to={`/users/${author.username}`}>
            {author.username}
          </Link>
          <div className="created-at-label">
            {DateTimeUtils.of(article.createdAt).fromNow()}
          </div>
        </span>
      </Segment>
      {showContentTable && (
        <>
          <Segment basic>
            <ArticleContentTable contentState={contentState} />
          </Segment>
          <Divider />
        </>
      )}
      <Segment basic>
        <RichTextView contentState={contentState} />
      </Segment>

      <Segment vertical>
        <TagPanel tagIds={article.tags} />
      </Segment>
    </div>
  );
};
