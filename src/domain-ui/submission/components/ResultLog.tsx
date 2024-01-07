import * as React from 'react';
import { Divider, Header, List, Message, Segment } from 'semantic-ui-react';
import { TextFileOverviewContainer, TextFileOverview } from '@/components';
import { DetailedJudgeResult, JudgeVerdict } from '@/domains/judge';
import { JudgeType } from '@/domains/judge-config';
import { ErrorLabel, TestResultLabel } from '../../judge';

export const ResultLog: React.FC<{
  detailedResult: DetailedJudgeResult;
  judgeType: JudgeType;
}> = (props) => {
  const { detailedResult, judgeType } = props;
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
                      judgeType={judgeType}
                    />
                  </div>
                  <Segment.Group>
                    <Segment>
                      <Header as="h5">Input</Header>
                    </Segment>
                    <TextFileOverviewContainer>
                      {test.input.overview}
                    </TextFileOverviewContainer>
                    <Segment as="h5">Output</Segment>
                    <TextFileOverviewContainer>
                      {testResult.outputOverview}
                    </TextFileOverviewContainer>
                    <Segment>
                      <Header as="h5">Answer</Header>
                    </Segment>
                    <TextFileOverviewContainer>
                      {test.output.overview}
                    </TextFileOverviewContainer>
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
