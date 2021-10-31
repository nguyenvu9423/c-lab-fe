import * as React from 'react';
import { Divider, Header, List, Message, Segment } from 'semantic-ui-react';
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
          <pre style={{ whiteSpace: 'pre-wrap' }}>{detailedResult.message}</pre>
        </Message>
      </div>
    );
  } else
    return (
      <List className="result-log" size="tiny">
        {testResults.map((testResult) => {
          const { test } = testResult;
          return (
            <>
              <List.Item key={test.id}>
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
                      <pre>{test.input.overview}</pre>
                    </Segment>
                    <Segment as="h5">Output</Segment>
                    <Segment>
                      <pre>{testResult.outputOverview}</pre>
                    </Segment>
                    <Segment>
                      <Header as="h5">Answer</Header>
                    </Segment>
                    <Segment>
                      <pre>{test.output.overview}</pre>
                    </Segment>
                  </Segment.Group>
                </List.Content>
              </List.Item>
              <Divider />
            </>
          );
        })}
      </List>
    );
};
