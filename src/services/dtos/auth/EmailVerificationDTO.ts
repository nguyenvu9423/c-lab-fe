import { EntityId } from '@reduxjs/toolkit';

export interface EmailVerificationDTO {
  id: EntityId;

  user: {
    id: EntityId;
    username: string;
  };
}
