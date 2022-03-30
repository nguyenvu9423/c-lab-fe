import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router';
import { useMediaQuery } from 'react-responsive';
import { fetchArticle } from '../../store/actions/article';
import { Grid, Ref, Sticky, Segment, Divider } from 'semantic-ui-react';
import { ArticleContentTable } from './components/ArticleContentTable';
import { LoadingState } from '../../store/common';
import { ErrorMessage, LoadingIndicator } from '../../components';
import {
  ArticleSelectors,
  AuthorizationSelectors,
} from '../../store/selectors';
import { Target } from '../../store/reducers/target';
import { State } from '../../store';
import { Article } from '../../domains/article';
import { ArticleSettingPanel } from './components/ArticleSettingPanel';
import { resetState } from '../../store/actions';
import { Breakpoint } from '../../utility';
import { useScrollToTop } from '../../common/hooks';
import { UnknownException } from '../../exception/UnkownException';
import { RawDraftContentState } from 'draft-js';
import { ArticleContentContainer } from './components/ArticleContentContainer';
import { TOP_NAV_OFFSET } from '../../common/variables';

export const ArticlePage: React.FC = () => {
  const params = useParams();
  const slug = params['*'];

  if (!params.id) {
    throw UnknownException.createDefault();
  }

  useScrollToTop();

  const dispatch = useDispatch();

  const { data } = useSelector((state: State) => state.articlePage);
  const article = useSelector(ArticleSelectors.byId(params.id));

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
        <LoadedArticleView article={article} />
      )}
    </Grid>
  );
};

export const LoadedArticleView: React.FC<{ article: Article }> = (props) => {
  const { article } = props;

  const contextRef = React.useRef<HTMLElement>(null);
  const isGreaterMediumScreen = useMediaQuery({
    query: `(min-width: ${Breakpoint.md}px)`,
  });

  const canEdit = useSelector(
    article ? AuthorizationSelectors.canUpdateArticle(article) : () => undefined
  );

  React.useEffect(() => {
    if (article && location.hash) {
      const elementId = location.hash.substr(1);
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView();
    }
  });

  const rawContentState: RawDraftContentState = React.useMemo(
    () => JSON.parse(article.content),
    [article?.content]
  );
  return (
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
              contentState={rawContentState}
              showContentTable={!isGreaterMediumScreen}
            />
          </Ref>
        </Grid.Column>
        {isGreaterMediumScreen && article.contentTableShown && (
          <Grid.Column width={4}>
            <Sticky
              className="table-content"
              context={contextRef}
              offset={TOP_NAV_OFFSET}
            >
              <Segment basic>
                {rawContentState && (
                  <ArticleContentTable contentState={rawContentState} />
                )}
              </Segment>
            </Sticky>
          </Grid.Column>
        )}
      </Grid.Row>
    </>
  );
};
