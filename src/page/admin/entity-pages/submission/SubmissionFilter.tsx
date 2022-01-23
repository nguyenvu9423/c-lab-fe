import * as React from 'react';
import { Dropdown, DropdownItemProps, Grid } from 'semantic-ui-react';
import { BufferedInput } from '../../../../components/input';
import { JudgeProgressStatus } from '../../../../domains/judge';
import { ProblemCodeSelect } from '../../../../domains/problem';
import { VerdictFilterTypes } from '../../../../domains/submission/components/filter/options';
import { UserSelect } from '../../../../domains/user';
import { FilterUtils } from '../../../../utility/filter/utils';

export namespace SubmissionFilter {
  export interface Props {
    onChange?(query: string): void;
  }

  export interface Value {
    id?: number | string;
    problemCode?: string;
    username?: string;
    disqualified?: boolean;
    judgeProgressStatus?: string;
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
      let query = '';
      if (filters.id) {
        query = FilterUtils.joinAnd(query, `id==${filters.id}`);
      }
      if (filters.problemCode) {
        query = FilterUtils.joinAnd(
          query,
          `problem.code==*${filters.problemCode}*`
        );
      }
      if (filters.username) {
        query = FilterUtils.joinAnd(
          query,
          `user.username==${filters.username}`
        );
      }

      if (filters.disqualified !== undefined) {
        query = FilterUtils.joinAnd(
          query,
          `disqualified==${filters.disqualified}`
        );
      }

      if (filters.judgeProgressStatus) {
        query = FilterUtils.joinAnd(query, filters.judgeProgressStatus);
      }

      if (filters.verdict) {
        const match = VerdictFilterTypes.getProperties(filters.verdict);
        if (match.query) query = FilterUtils.joinAnd(query, match.query);
      }

      onChange?.(query);
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
                judgeProgressStatus: match?.query,
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

const judgeStatusOptions: (DropdownItemProps & { query?: string })[] = [
  {
    key: 'any',
    text: '',
    value: undefined,
  },
  {
    key: 'in_progress',
    text: 'In progress',
    value: 'in_progress',
    query: `judge.progress.status=in=(${JudgeProgressStatus.InProgressValues.join(
      ','
    )})`,
  },
  {
    key: 'success',
    text: 'Success',
    value: 'success',
    query: `judge.progress.status==${JudgeProgressStatus.SUCCESS}`,
  },
  {
    key: 'cancelled',
    text: 'Cancelled',
    value: 'cancelled',
    query: `judge.progress.status==${JudgeProgressStatus.CANCELLED}`,
  },
  {
    key: 'rejected',
    text: 'Rejected',
    value: 'rejected',
    query: `judge.progress.status==${JudgeProgressStatus.REJECTED}`,
  },
  {
    key: 'error',
    text: 'System error',
    value: 'error',
    query: `judge.progress.status==${JudgeProgressStatus.ERROR}`,
  },
];
