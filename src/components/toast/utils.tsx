import * as uuid from 'uuid';
import { Toast } from '../../store/actions';

export class CRUDToastBuilder {
  entity: string;
  operation: 'tạo' | 'sửa' | 'xóa';
  status?: 'success' | 'failed';

  constructor(entity: string, operation: 'tạo' | 'sửa' | 'xóa') {
    this.entity = entity;
    this.operation = operation;
  }

  build(): Toast {
    return {
      id: uuid.v4(),
      header: capitalize(`${this.operation} ${this.entity} thành công`),
      content: capitalize(`${this.entity} đã được ${this.operation}`),
      status:
        this.status === 'success'
          ? 'positive'
          : this.status === 'failed'
          ? 'negative'
          : undefined,
      duration: 2500,
    };
  }

  setStatus(status: 'success' | 'failed' | undefined): CRUDToastBuilder {
    this.status = status;
    return this;
  }
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
