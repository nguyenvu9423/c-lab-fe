import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { fetchArticle } from '../../store/actions/article';
import {
  Grid,
  Header,
  Ref,
  Sticky,
  Label,
  Segment,
  Divider,
} from 'semantic-ui-react';
import { ArticleContentTable } from './components/ArticleContentTable';
import { LoadingState } from '../../store/common';
import { ErrorMessage, LoadingIndicator } from '../../components';
import {
  ArticleSelectors,
  AuthorizationSelectors,
  UserSelectors,
} from '../../store/selectors';
import { Target } from '../../store/reducers/target';
import { ArticleUtils } from './utils';
import { Avatar } from '../../components/avatar/Avatar';
import { State } from '../../store';
import { Article } from '../../domains/article';
import { ArticleSettingPanel } from './components/ArticleSettingPanel';
import { TagSelectors } from '../../store/selectors/TagSelectors';
import { resetState } from '../../store/actions';
import { DateTimeUtils } from '../../utility/data-type/DateTimeUtils';
import { Breakpoint } from '../../utility';
import { useScrollToTop } from '../../common/hooks';
import { UnknownException } from '../../exception/UnkownException';
import { Link } from 'react-router-dom';

export const ArticlePage: React.FC = () => {
  const params = useParams();
  const slug = params['*'];

  if (!params.id || !slug) {
    throw UnknownException.createDefault();
  }

  useScrollToTop();

  const dispatch = useDispatch();
  const contextRef = React.createRef<HTMLElement>();
  const isGreaterMediumScreen = useMediaQuery({
    query: `(min-width: ${Breakpoint.md}px)`,
  });

  const { data } = useSelector((state: State) => state.articlePage);
  const article = useSelector(ArticleSelectors.byId(params.id));
  const canEdit = useSelector(
    article ? AuthorizationSelectors.canUpdateArticle(article) : () => undefined
  );

  React.useEffect(() => {
    dispatch(
      fetchArticle.request({
        id: Number(params.id),
        target: Target.ARTICLE_PAGE,
      })
    );
    return () => {
      dispatch(resetState({ target: Target.ARTICLE_PAGE }));
    };
  }, [dispatch, params.id]);

  React.useEffect(() => {
    if (article && location.hash) {
      const elementId = location.hash.substr(1);
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView();
    }
  });

  if (article && article.slug && slug !== article.slug) {
    return <Navigate to={`/articles/${article.id}/view/${article.slug}`} />;
  }

  return (
    <Grid container relaxed stackable>
      {data.article.loadingState === LoadingState.LOADING && (
        <Grid.Row>
          <Grid.Column width="16">
            <LoadingIndicator />
          </Grid.Column>
        </Grid.Row>
      )}
      {data.article.loadingState === LoadingState.ERROR && (
        <Grid.Row>
          <Grid.Column>
            <ErrorMessage message={data.article.error.message} />
          </Grid.Column>
        </Grid.Row>
      )}
      {data.article.loadingState === LoadingState.LOADED && article && (
        <>
          {canEdit && (
            <Grid.Row>
              <Grid.Column floated="right" textAlign="right" width="16">
                <ArticleSettingPanel article={article} />
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )}

          <Grid.Row divided>
            <Grid.Column width={article.contentTableShown ? 12 : 16}>
              <Ref innerRef={contextRef}>
                <ArticleContentContainer
                  article={article}
                  showContentTable={!isGreaterMediumScreen}
                />
              </Ref>
            </Grid.Column>
            {isGreaterMediumScreen && article.contentTableShown && (
              <Grid.Column width={4}>
                <Sticky
                  className="table-content"
                  context={contextRef}
                  offset={76}
                >
                  <Segment basic>
                    <ArticleContentTable article={article} />
                  </Segment>
                </Sticky>
              </Grid.Column>
            )}
          </Grid.Row>
        </>
      )}
    </Grid>
  );
};

namespace ArticleContentContainer {
  export interface Props {
    article: Article;
    showContentTable?: boolean;
  }
}

const ArticleContentContainer: React.FC<ArticleContentContainer.Props> = (
  props
) => {
  const { article, showContentTable } = props;
  const author = useSelector(UserSelectors.selectById(article.author));

  const markupContent = React.useMemo(() => {
    return article ? ArticleUtils.markupContent(article.content) : undefined;
  }, [article?.content]);

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
            <ArticleContentTable article={article} />
          </Segment>
          <Divider />
        </>
      )}
      <Segment basic>
        <div
          className="text-container"
          dangerouslySetInnerHTML={{
            __html: markupContent ?? '',
          }}
        />
      </Segment>

      <Segment vertical>
        <TagPanel tagIds={article.tags} />
      </Segment>
    </div>
  );
};

const TagPanel: React.FC<{ tagIds: number[] }> = (props) => {
  const { tagIds } = props;
  const tags = useSelector(TagSelectors.selectByIds(tagIds));
  return (
    <Label.Group tag>
      {tags.map((tag) => (
        <Label key={tag.id}>{tag.name}</Label>
      ))}
    </Label.Group>
  );
};
