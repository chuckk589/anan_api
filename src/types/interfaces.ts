import { AbstractNamingStrategy } from '@mikro-orm/core';

export interface RequestWithUser extends Request {
  user: { UserId: number; RoleId: number };
}
class MyCustomNamingStrategy extends AbstractNamingStrategy {
  classToTableName(entityName: string): string {
    return this.underscore(entityName);
  }
  columnNameToProperty(columnName: string, customName?: string): string {
    return columnName;
  }
  joinColumnName(propertyName: string): string {
    return this.underscore(propertyName) + '_' + this.referenceColumnName();
  }

  joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
    return this.classToTableName(entityName) + '_' + (referencedColumnName || this.referenceColumnName());
  }

  joinTableName(sourceEntity: string, targetEntity: string, propertyName: string): string {
    return this.classToTableName(sourceEntity) + '_' + this.classToTableName(propertyName);
  }

  propertyToColumnName(propertyName: string): string {
    return this.underscore(propertyName);
  }

  referenceColumnName(): string {
    return 'id';
  }

  private underscore(name: string): string {
    return name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
  }
}
