import { NotFoundException } from '@nestjs/common';

export const NotFoundUUID = (entity: any, UUID: string) => {
  return new NotFoundException(
    `${entity.name || entity} not found with UUID: ${UUID}`,
  );
};
