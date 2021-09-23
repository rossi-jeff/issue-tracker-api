import { NotFoundException } from '@nestjs/common';

export const NotFound = (entity: any, Id: number) => {
  return new NotFoundException(
    `${entity.name || entity} not found with Id: ${Id}`,
  );
};
