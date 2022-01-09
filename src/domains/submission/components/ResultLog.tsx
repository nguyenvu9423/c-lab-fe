import * as React from 'react';
import { Divider, Header, List, Message, Segment } from 'semantic-ui-react';
import { TextFileOverview } from '../../../components';
import {
  DetailedJudgeResult,
  ErrorLabel,
  JudgeVerdict,
  TestResultLabel,
} from '../../judge';
import { ScoringType } from '../../judge-config';

export const ResultLog: React.FC<{
  detailedResult: DetailedJudgeResult;
  scoringType: ScoringType;
}> = (props) => {
  const { detailedResult, scoringType } = props;
  const { verdict, testResults } = detailedResult;

  if (verdict === JudgeVerdict.COMPILE_ERROR) {
    return (
      <div>
        <Header as="h4" style={{ display: 'inline-block' }}>
          Compilation
        </Header>
        : <ErrorLabel message="Compile error" />
        <Message negative>
          <TextFileOverview>{detailedResult.message}</TextFileOverview>
        </Message>
      </div>
    );
  } else
    return (
      <List className="result-log" size="tiny">
        {testResults.map((testResult) => {
          const { test } = testResult;
          return (
            <React.Fragment key={test.id}>
              <List.Item>
                <List.Content>
                  <div className="test-name">
                    <Header as="h4">Test {test.id}</Header>:{' '}
                    <TestResultLabel
                      testResult={testResult}
                      scoringType={scoringType}
                    />
                  </div>
                  <Segment.Group>
                    <Segment>
                      <Header as="h5">Input</Header>
                    </Segment>
                    <Segment>
                      <TextFileOverview>{test.input.overview}</TextFileOverview>
                    </Segment>
                    <Segment as="h5">Output</Segment>
                    <Segment>
                      <TextFileOverview>
                        {testResult.outputOverview}
                      </TextFileOverview>
                    </Segment>
                    <Segment>
                      <Header as="h5">Answer</Header>
                    </Segment>
                    <Segment>
                      <TextFileOverview>
                        {test.output.overview}
                      </TextFileOverview>
                    </Segment>
                  </Segment.Group>
                </List.Content>
              </List.Item>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    );
};
