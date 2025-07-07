import * as React from 'react';
import { useSelector } from 'react-redux';
import { Header, Segment } from 'semantic-ui-react';
import { ConstSelectors, JudgeConfigSelectors } from '@/store/selectors';
import { JudgeType } from '@/domains/judge-config';
import { Problem } from '@/domains/problem';

import { AcmFilterForm } from './AcmFilterForm';
import { OIFilterForm } from './OIFilterForm';
import { RsqlUtils } from '@/utils/rsql';
import { ExpressionNode } from '@rsql/ast';
import { VerdictFilterTypes } from './options';

export namespace SubmissionFilterCard {
  export interface Props {
    problem: Problem;

    onQueryChange?(query: string | undefined): void;
  }
}

export const SubmissionFilterCard: React.FC<SubmissionFilterCard.Props> = (
  props,
) => {
  const { problem, onQueryChange } = props;
  const judgeConfig = useSelector(
    problem.judgeConfig
      ? JudgeConfigSelectors.selectById(problem.judgeConfig)
      : ConstSelectors.value(undefined),
  );

  const handleSubmit = React.useCallback(
    (values: AcmFilterForm.Value | OIFilterForm.Value) => {
      const predicates: ExpressionNode[] = [];
      if (values.language && values.language !== 'ANY') {
        predicates.push(RsqlUtils.Builder.eq('language', values.language));
      }

      if (values.verdict) {
        const filterProps = VerdictFilterTypes.getProperties(values.verdict);
        if (filterProps.rsqlNode) {
          predicates.push(filterProps.rsqlNode);
        }
      }

      if ('score' in values && values.score) {
        const { operator, value } = values.score;
        predicates.push(
          RsqlUtils.Builder.comparison(
            'judge.result.score',
            operator,
            Number(value) / 100,
          ),
        );
      }

      if ('passedTestCount' in values && values.passedTestCount) {
        const { operator, value } = values.passedTestCount;
        predicates.push(
          RsqlUtils.Builder.comparison(
            'judge.result.passedTestCount',
            operator,
            value,
          ),
        );
      }

      const query =
        predicates.length > 0
          ? RsqlUtils.emit(RsqlUtils.Builder.and(...predicates))
          : undefined;

      onQueryChange?.(query ? query : undefined);
    },
    [onQueryChange],
  );

  if (!judgeConfig) return null;

  return (
    <>
      <Header as="h3" attached="top">
        Lọc
      </Header>
      <Segment attached="bottom" clearing>
        {judgeConfig.judgeType === JudgeType.ACM ? (
          <AcmFilterForm onSubmit={handleSubmit} />
        ) : (
          <OIFilterForm onSubmit={handleSubmit} />
        )}
      </Segment>
    </>
  );
};
