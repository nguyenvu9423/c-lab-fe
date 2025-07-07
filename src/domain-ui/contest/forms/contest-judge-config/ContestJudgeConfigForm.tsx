import React, {
  PropsWithChildren,
  useState,
  MouseEvent,
  KeyboardEvent,
} from 'react';
import { Button, Dimmer, Form, Loader, Ref, Table } from 'semantic-ui-react';
import { FormikHelpers, useFormik } from 'formik';
import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  MouseSensor as LibMouseSensor,
  KeyboardSensor as LibKeyboardSensor,
} from '@dnd-kit/core';

import { AddProblemConfigModal } from '../../modals';
import { EditProblemConfigModal } from '../../modals/EditProblemConfigModal';

import { SubmitButton } from '@/components/button';
import { ContestJudgeType } from '@/domains/contest/ContestJudgeType';
import { Problem } from '@/domains/problem';
import { useErrorMessageRenderer } from '@/components/form';

export namespace ContestJudgeConfigForm {
  export interface Props {
    initialValues?: Partial<Value>;

    onSubmit?: (value: Value, helpers: FormikHelpers<Value>) => void;
  }

  export interface Value {
    type: ContestJudgeType;

    problemConfigs: ProblemConfig[];
  }

  export interface ProblemConfig {
    code: string;

    score: number;

    problem: Problem;
  }
}

export const ContestJudgeConfigForm: React.FC<ContestJudgeConfigForm.Props> = (
  props,
) => {
  const { initialValues, onSubmit } = props;

  const { values, touched, errors, isSubmitting, setFieldValue, handleSubmit } =
    useFormik<ContestJudgeConfigForm.Value>({
      initialValues: {
        type: initialValues?.type ?? ContestJudgeType.ACM,
        problemConfigs: initialValues?.problemConfigs ?? [],
      },
      onSubmit: (value, helpers) => onSubmit?.(value, helpers),
    });

  const errorMessageRenderer = useErrorMessageRenderer({ touched, errors });
  const [openAddForm, setOpenAddForm] = useState(false);
  const [editedProblemConfigIndex, setEditedProblemConfigIndex] = useState<
    number | undefined
  >(undefined);

  const sensors = useSensors(
    useSensor(MouseSensor, undefined),
    useSensor(KeyboardSensor, undefined),
  );

  return (
    <Dimmer.Dimmable dimmed={isSubmitting}>
      <Form onSubmit={handleSubmit} error={true}>
        <Form.Field width={8}>
          <label>Kiểu chấm</label>
          <Form.Select
            value={values.type}
            options={judgeTypeOptions}
            onChange={(_event, { value }) => setFieldValue('type', value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Bài tập</label>
          <Button
            type="button"
            icon="add"
            content="Thêm"
            onClick={() => setOpenAddForm(true)}
          />
          <DndContext
            sensors={sensors}
            onDragEnd={(params) => {
              const { over, active } = params;
              if (!over) return;
              const newProblemConfigs = [...values.problemConfigs];
              const movedConfig = newProblemConfigs.splice(
                Number(active.id),
                1,
              );
              newProblemConfigs.splice(Number(over.id), 0, ...movedConfig);
              setFieldValue('problemConfigs', newProblemConfigs);
            }}
          >
            <Table>
              <Table.Header>
                <Table.HeaderCell width={1} style={{ borderBottom: 0 }}>
                  Mã
                </Table.HeaderCell>
                <Table.HeaderCell width={4} style={{ borderBottom: 0 }}>
                  Tên bài
                </Table.HeaderCell>
                <Table.HeaderCell width={1} style={{ borderBottom: 0 }}>
                  Điểm
                </Table.HeaderCell>
                <Table.HeaderCell width={2} style={{ borderBottom: 0 }} />
              </Table.Header>
              <Table.Body>
                {values.problemConfigs.map((problemConfig, index) => {
                  const { code, score, problem } = problemConfig;
                  const isLastRow = index === values.problemConfigs.length - 1;
                  return (
                    <>
                      <DroppableRow index={index} />
                      <DraggableRow index={index}>
                        <Table.Cell>{code}</Table.Cell>
                        <Table.Cell>
                          {problem.code} - {problem.title}
                        </Table.Cell>
                        <Table.Cell>{score}</Table.Cell>
                        <Table.Cell textAlign="right">
                          <Button
                            data-no-dnd="true"
                            type="button"
                            icon="edit"
                            size="tiny"
                            onClick={() => setEditedProblemConfigIndex(index)}
                          />
                          <Button
                            data-no-dnd="true"
                            type="button"
                            icon="delete"
                            size="tiny"
                            negative
                            primary
                            onClick={() => {
                              const newProblemConfigs = [
                                ...values.problemConfigs,
                              ];

                              newProblemConfigs.splice(index, 1);
                              setFieldValue(
                                'problemConfigs',
                                newProblemConfigs,
                              );
                            }}
                          />
                        </Table.Cell>
                      </DraggableRow>
                      {isLastRow && <DroppableRow index={index + 1} />}
                    </>
                  );
                })}
              </Table.Body>
            </Table>
          </DndContext>
          {errorMessageRenderer('problemConfigs')}
        </Form.Field>

        <SubmitButton floated="right" />
      </Form>

      {openAddForm && (
        <AddProblemConfigModal
          onCancel={() => setOpenAddForm(false)}
          onSubmit={(value, helpers) => {
            const isDuplicated = values.problemConfigs.some(
              (config) => config.problem.code === value.problem.code,
            );
            if (isDuplicated) {
              helpers.setFieldError('problem', 'Bài tập này đã được thêm');
              return;
            }
            setFieldValue('problemConfigs', [...values.problemConfigs, value]);
            setOpenAddForm(false);
          }}
        />
      )}

      {editedProblemConfigIndex !== undefined && (
        <EditProblemConfigModal
          initialValue={values.problemConfigs[editedProblemConfigIndex]}
          onCancel={() => setEditedProblemConfigIndex(undefined)}
          onSubmit={(value, helpers) => {
            const filtedProblemConfigs = values.problemConfigs.filter(
              (_item, index) => index !== editedProblemConfigIndex,
            );

            const isProblemDuplicated = filtedProblemConfigs.some(
              (config) => config.problem.code === value.problem.code,
            );

            const isCodeDuplicated = filtedProblemConfigs.some(
              (config) => config.code === value.code,
            );

            if (isProblemDuplicated) {
              helpers.setFieldError('problem', 'Bài tập này đã được thêm');
              return;
            }

            if (isCodeDuplicated) {
              helpers.setFieldError('code', 'Mã bài này đã được thêm');
              return;
            }

            const newProblemConfigs = [...values.problemConfigs];
            newProblemConfigs[editedProblemConfigIndex] = value;

            setFieldValue('problemConfigs', newProblemConfigs);
            setEditedProblemConfigIndex(undefined);
          }}
        />
      )}
      <Dimmer inverted active={isSubmitting}>
        <Loader />
      </Dimmer>
    </Dimmer.Dimmable>
  );
};

const judgeTypeOptions = ContestJudgeType.values.map((type) => ({
  value: type,
  text: type,
}));

const DroppableRow: React.FC<{
  index: number;
}> = ({ index }) => {
  const { isOver, setNodeRef } = useDroppable({ id: index });

  const style = {
    height: isOver ? 8 : 1,
    backgroundColor: isOver ? '#E0E1E2' : undefined,
  };

  return (
    <Ref innerRef={setNodeRef}>
      <Table.Row style={style}>
        <Table.Cell colSpan="4" style={{ padding: 0, border: 0 }} />
      </Table.Row>
    </Ref>
  );
};

const DraggableRow: React.FC<PropsWithChildren<{ index: number }>> = ({
  index,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: index,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    cursor: 'grabbing',
  };

  return (
    <Ref innerRef={setNodeRef}>
      <Table.Row style={style} {...listeners} {...attributes}>
        {children}
      </Table.Row>
    </Ref>
  );
};

export class MouseSensor extends LibMouseSensor {
  static activators = [
    {
      eventName: 'onMouseDown' as const,
      handler: ({ nativeEvent: event }: MouseEvent) => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}

export class KeyboardSensor extends LibKeyboardSensor {
  static activators = [
    {
      eventName: 'onKeyDown' as const,
      handler: ({ nativeEvent: event }: KeyboardEvent<Element>) => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}

function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
}
