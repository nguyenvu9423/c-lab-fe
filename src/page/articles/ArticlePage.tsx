import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { match, Redirect } from 'react-router';
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

export const ArticlePage: React.FC<{
  match: match<{ id: string; slug?: string }>;
  location: Location;
}> = (props) => {
  const {
    match: { params },
    location,
  } = props;
  const dispatch = useDispatch();
  const contextRef = React.createRef<HTMLElement>();
  console.log(params);

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

  if (article && article.slug && params.slug !== article.slug) {
    return <Redirect to={`/articles/${article.id}/view/${article.slug}`} />;
  }

  return (
    <Grid container relaxed divided>
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

          <Grid.Row>
            <Grid.Column width={article.contentTableShown ? 12 : 16}>
              <Ref innerRef={contextRef}>
                <ArticleContentContainer article={article} />
              </Ref>
            </Grid.Column>
            {article.contentTableShown && (
              <Grid.Column width={4}>
                <Sticky
                  className="article table-content"
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

const ArticleContentContainer: React.FC<{ article: Article }> = (props) => {
  const { article } = props;
  const author = useSelector(UserSelectors.selectById(article.author));

  const markupContent = React.useMemo(() => {
    return article ? ArticleUtils.markupContent(article.content) : undefined;
  }, [article?.content]);

  return (
    <div className="article text-container">
      <Segment vertical basic>
        <Header as="h1">
          {article.title}
          <Header.Subheader>{article.subtitle}</Header.Subheader>
        </Header>
      </Segment>
      <Segment vertical basic>
        <div>
          <Avatar user={author} style={{ width: 48, height: 48 }} />
          <span
            style={{
              display: 'inline-block',
              marginLeft: 14,
              verticalAlign: 'middle',
            }}
          >
            <div>{`${author.firstName} ${author.lastName}`}</div>
            <div
              style={{
                color: 'rgba(0,0,0,.6)',
              }}
            >
              Sep 16, 2017
            </div>
          </span>
        </div>
      </Segment>
      <Segment vertical>
        <div
          className="content"
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
