import * as React from 'react';
import { Dropdown, DropdownItemProps, Grid } from 'semantic-ui-react';
import { ExpressionNode } from '@rsql/ast';

import { BufferedInput } from '../../../../components/input';
import { JudgeProgressStatus } from '../../../../domains/judge';
import { ProblemCodeSelect } from '../../../../domains/problem';
import { VerdictFilterTypes } from '../../../../domains/submission/components/filter/options';
import { UserSelect } from '../../../../domains/user';
import { RsqlUtils } from '../../../../utility';

export namespace SubmissionFilter {
  export interface Props {
    onChange?(query: string | undefined): void;
  }

  export interface Value {
    id?: number | string;
    problemCode?: string;
    username?: string;
    disqualified?: boolean;
    judgeProgressStatus?: ExpressionNode;
    verdict?: VerdictFilterTypes;
  }
}

export const SubmissionFilter: React.FC<SubmissionFilter.Props> = (props) => {
  const { onChange } = props;
  const [filters, setFilters] = React.useState<SubmissionFilter.Value>({
    id: undefined,
  });

  const handleFitlersChange = React.useCallback(
    (filters: SubmissionFilter.Value) => {
      setFilters(filters);
      const predicates: ExpressionNode[] = [];

      if (filters.id) {
        predicates.push(RsqlUtils.Builder.eq('id', filters.id));
      }
      if (filters.problemCode) {
        predicates.push(
          RsqlUtils.Builder.eq('problem.code', `*${filters.problemCode}*`)
        );
      }
      if (filters.username) {
        predicates.push(
          RsqlUtils.Builder.eq('user.username', filters.username)
        );
      }

      if (filters.disqualified !== undefined) {
        predicates.push(
          RsqlUtils.Builder.eq('disqualified', String(filters.disqualified))
        );
      }

      if (filters.judgeProgressStatus) {
        predicates.push(filters.judgeProgressStatus);
      }

      if (filters.verdict) {
        const match = VerdictFilterTypes.getProperties(filters.verdict);
        if (match.rsqlNode) predicates.push(match.rsqlNode);
      }

      if (predicates.length > 0) {
        const andPredicates = RsqlUtils.Builder.and(...predicates);
        const query = RsqlUtils.emit(andPredicates);
        onChange?.(query);
      } else onChange?.(undefined);
    },
    [onChange]
  );

  return (
    <Grid widths={16} doubling stackable>
      <Grid.Row>
        <Grid.Column width={2}>
          <BufferedInput
            type="text"
            name="id"
            placeholder="ID"
            fluid
            onChange={(value) => handleFitlersChange({ ...filters, id: value })}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <ProblemCodeSelect
            onChange={(value) =>
              handleFitlersChange({ ...filters, problemCode: value })
            }
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <UserSelect
            placeholder="Người nộp"
            onChange={(value) =>
              handleFitlersChange({ ...filters, username: value?.username })
            }
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Dropdown
            placeholder="Công nhận"
            selection
            fluid
            options={disqualifiedOptions}
            onChange={(e, { value }) => {
              handleFitlersChange({
                ...filters,
                disqualified: value as boolean,
              });
            }}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <Dropdown
            placeholder="Trạng thái"
            selection
            fluid
            options={judgeStatusOptions}
            onChange={(e, { value }) => {
              const match = judgeStatusOptions.find(
                (option) => option.value === value
              );
              handleFitlersChange({
                ...filters,
                judgeProgressStatus: match?.rsqlNode,
              });
            }}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={5}>
          <Dropdown
            placeholder="Kết quả"
            selection
            fluid
            options={verdictOptions}
            onChange={(e, { value }) => {
              handleFitlersChange({
                ...filters,
                verdict: value as VerdictFilterTypes,
              });
            }}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const verdictOptions: DropdownItemProps[] = [{ key: '', text: '' }].concat(
  VerdictFilterTypes.values.map((type) => {
    const props = VerdictFilterTypes.getProperties(type);
    return { key: type, value: type, text: props.text };
  })
);

const disqualifiedOptions: DropdownItemProps[] = [
  { key: 'any', text: '' },
  {
    key: 'qualified',
    text: 'Công nhận',
    value: false,
  },
  {
    key: 'disqualified',
    text: 'Không công nhận',
    value: true,
  },
];

const judgeStatusOptions: (DropdownItemProps & {
  rsqlNode?: ExpressionNode;
})[] = [
  {
    key: 'any',
    text: '',
    value: undefined,
  },
  {
    key: 'in_progress',
    text: 'In progress',
    value: 'in_progress',
    rsqlNode: RsqlUtils.Builder.in(
      'judge.progress.status',
      JudgeProgressStatus.InProgressValues
    ),
  },
  {
    key: 'success',
    text: 'Success',
    value: 'success',
    rsqlNode: RsqlUtils.Builder.eq(
      'judge.progress.status',
      JudgeProgressStatus.SUCCESS
    ),
  },
  {
    key: 'cancelled',
    text: 'Cancelled',
    value: 'cancelled',
    rsqlNode: RsqlUtils.Builder.eq(
      'judge.progress.status',
      JudgeProgressStatus.CANCELLED
    ),
  },
  {
    key: 'rejected',
    text: 'Rejected',
    value: 'rejected',
    rsqlNode: RsqlUtils.Builder.eq(
      'judge.progress.status',
      JudgeProgressStatus.REJECTED
    ),
  },
  {
    key: 'error',
    text: 'System error',
    value: 'error',
    rsqlNode: RsqlUtils.Builder.eq(
      'judge.progress.status',
      JudgeProgressStatus.ERROR
    ),
  },
];
