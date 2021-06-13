import * as React from 'react';
import { JudgeConfigForm } from './JudgeConfigForm';
import { JudgeConfigService } from '../../service/JudgeConfigService';

export function AddJudgeConfigForm(props) {
  const { problemId, onCancel, onSuccess } = props;

  const handleSubmit = React.useCallback((values) => {
    const formData = new FormData();
    const { testPackageFile, externalJudger, ...dto } = values;
    formData.append(
      'judgeConfig',
      new Blob([JSON.stringify(dto)], { type: 'application/json' })
    );
    formData.append('file', testPackageFile);
    if (externalJudger) {
      formData.append('externalJudger', externalJudger);
    }

    return JudgeConfigService.create(formData).then(() => {
      onSuccess?.();
    });
  }, []);

  return (
    <JudgeConfigForm
      initialValues={{ problemId }}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
}
