import * as uuid from 'uuid';
import { Toast } from '../../store/actions';

export class CRUDToastBuilder {
  entity: string;
  operation: 'create' | 'update' | 'delete';
  status?: 'success' | 'failed';

  constructor(entity: string, operation: 'create' | 'update' | 'delete') {
    this.entity = entity;
    this.operation = operation;
  }

  build(): Toast {
    console.log(this.status);
    return {
      id: uuid.v4(),
      header: capitalize(`${this.operation} ${this.entity} sucessfully`),
      content: `The ${this.entity} has been ${this.operation}d successfully`,
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
