import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { normalize } from 'normalizr';
import { userContestRegistrationSchema } from '@/entity-schemas/user-contest-registration-schemas';
import { ContestRegistrationService } from '@/services/contest';
import { deleteEntity, updateEntity } from '@/store/actions';

export namespace ContestRegistrationButton {
  export interface Props {
    userId: number;

    contestId: number;

    value?: boolean;

    onRegistrationChanged?: (registration: boolean) => void;
  }
}

export const ContestRegistrationButton: React.FC<
  ContestRegistrationButton.Props
> = (props) => {
  const dispatch = useDispatch();
  const { userId, contestId, value, onRegistrationChanged } = props;
  const [isLoading, setLoading] = useState(false);

  const updateRegistration = useCallback(
    (register: boolean) => {
      setLoading(true);
      if (!value) {
        ContestRegistrationService.registerUser(userId, contestId)
          .then((dto) => {
            const { data } = dto;
            const normalizedData = normalize(
              data,
              userContestRegistrationSchema,
            );
            dispatch(updateEntity({ entities: normalizedData.entities }));
            onRegistrationChanged?.(register);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        ContestRegistrationService.unregisterUser(userId, contestId)
          .then(() => {
            dispatch(deleteEntity({ id: `${userId}-${contestId}` }));
          })
          .finally(() => setLoading(false));
      }
    },
    [userId, contestId, onRegistrationChanged, dispatch, value],
  );

  if (value === undefined) return;

  return (
    <>
      {value ? (
        <Button
          loading={isLoading}
          icon="calendar check"
          color="green"
          size="small"
          labelPosition="left"
          content="Đã đăng kí"
          onClick={() => {
            updateRegistration(false);
          }}
        />
      ) : (
        <Button
          loading={isLoading}
          icon="calendar check outline"
          labelPosition="left"
          content="Đăng kí"
          size="small"
          onClick={() => {
            updateRegistration(true);
          }}
        />
      )}
    </>
  );
};
