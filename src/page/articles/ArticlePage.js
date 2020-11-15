import * as React from 'react';
import { fetchArticle } from '../../store/actions/article';
import {
  Container,
  Grid,
  Header,
  Ref,
  Sticky,
  Button,
  Label,
  Segment
} from 'semantic-ui-react';
import { ContentTable } from './internal/ContentTable';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingState } from '../../store/common';
import { LoadingIndicator, ErrorMessage } from '../../components';
import { ArticleSelectors } from '../../store/selectors';
import { Target } from '../../store/reducers/target';
import { Link } from 'react-router-dom';
import { resetState } from '../../store/actions';
import { ArticleUtility } from '../../utility/TextUtility';
import { Avatar } from '../../components/avatar/Avatar';

function ArticlePage(props) {
  const {
    match: { url, params },
    location
  } = props;

  const { data } = useSelector(state => state.articlePage);
  const dispatch = useDispatch();
  const contextRef = React.createRef();
  const article = useSelector(ArticleSelectors.byId(params.id));

  const markupContent = React.useMemo(() => {
    return article ? ArticleUtility.markupContent(article.content) : undefined;
  }, [article?.content]);

  React.useEffect(() => {
    if (data.article.loadingState === LoadingState.LOAD_NEEDED) {
      dispatch(
        fetchArticle.request({ id: params.id }, { target: Target.ARTICLE_PAGE })
      );
    }
    return () => dispatch(resetState({ target: Target.ARTICLE_PAGE }));
  }, [params.id]);

  React.useEffect(() => {
    if (article && location.hash) {
      const elementId = location.hash.substr(1);
      const element = document.getElementById(elementId);
      if (element) element.scrollIntoView();
    }
  });

  if (LoadingState.isInProgress(data.article.loadingState)) {
    return <LoadingIndicator />;
  }

  if (data.article.error) {
    return (
      <Container>
        <ErrorMessage>{data.article.error.message}</ErrorMessage>
      </Container>
    );
  }
  const { author } = article;

  return (
    <Grid container relaxed divided>
      <Grid.Row>
        <Grid.Column floated="right" textAlign="right" width="16">
          <Button
            as={Link}
            to={`${url}/edit`}
            content="Edit"
            icon="edit"
            labelPosition="left"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="12">
          <Ref innerRef={contextRef}>
            <div className="article text-container">
              <Segment vertical basic="very">
                <Header as="h1">
                  {article.title}
                  <Header.Subheader>{article.subtitle}</Header.Subheader>
                </Header>
              </Segment>
              <Segment vertical basic="very">
                <div>
                  <Avatar user={author} style={{ width: 48, height: 48 }} />
                  <span
                    style={{
                      display: 'inline-block',
                      marginLeft: 14,
                      verticalAlign: 'middle'
                    }}
                  >
                    <div>{`${author.firstName} ${author.lastName}`}</div>
                    <div
                      style={{
                        color: 'rgba(0,0,0,.6)'
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
                    __html: markupContent
                  }}
                />
              </Segment>

              <Segment vertical>
                <Label.Group tag>
                  <Label>Test</Label>
                </Label.Group>
              </Segment>
            </div>
          </Ref>
        </Grid.Column>
        <Grid.Column width="4">
          <Sticky
            className="article table-content"
            context={contextRef}
            offset={76}
          >
            <Segment basic="very">
              <ContentTable article={article} />
            </Segment>
          </Sticky>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export { ArticlePage };
