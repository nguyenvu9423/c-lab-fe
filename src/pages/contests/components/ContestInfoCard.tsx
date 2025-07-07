import React, { useEffect, useMemo, useState } from 'react';
import { Divider, Header, Icon, Label, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { Contest } from '@/domains/contest';

export namespace ContestInfoCard {
  export interface Props {
    contest: Contest;
  }
}

export const ContestInfoCard: React.FC<ContestInfoCard.Props> = (props) => {
  const { contest } = props;
  const now = moment();
  return (
    <Segment>
      <Header textAlign="center">{contest.name}</Header>
      <Divider />

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {now.isBefore(contest.start) ? (
          <div>
            <span style={{ marginRight: 8 }}>Bắt đầu:</span>
            <span>
              <Icon name="clock outline" />
              {moment(contest.start).format('HH:MM DD-MM-YYYY')}
            </span>
          </div>
        ) : now.isAfter(contest.end) ? (
          <Label color="blue">
            <Icon name="hourglass end" />
            Kết thúc
          </Label>
        ) : (
          <div>
            <span style={{ marginRight: 8 }}>Còn lại</span>
            <Timer end={contest.end} />
          </div>
        )}
      </div>
    </Segment>
  );
};

const Timer: React.FC<{ end: string }> = (props) => {
  const end = useMemo(() => moment(props.end), [props.end]);
  const [diff, setDiff] = useState(moment.duration(end.diff(moment())));
  useEffect(() => {
    const id = setInterval(
      () => setDiff(moment.duration(end.diff(moment()))),
      4000,
    );
    return () => clearInterval(id);
  }, [end]);

  return (
    <Label color="blue">
      <Icon name="hourglass two" />
      {diff.days() ? `${diff.days()} ngày` : ''}
      {diff.hours()} giờ {diff.minutes()} phút
    </Label>
  );
};
