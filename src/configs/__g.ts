import { AbstractNamingStrategy, MikroORM } from '@mikro-orm/core';
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

(async () => {
  const orm = await MikroORM.init({
    type: 'postgresql',
    allowGlobalContext: true,
    ...(process.env.NODE_ENV === 'development' ? { debug: true, logger: console.log.bind(console) } : {}),
    entities: ['./dist/modules/mikroorm/entities/'],
    entitiesTs: ['./src/modules/mikroorm/entities/'],
    clientUrl: 'postgresql://postgres@127.0.0.1:5432',
    discovery: {
      warnWhenNoEntities: false, // by default, discovery throws when no entity is processed
      requireEntitiesArray: false, // force usage of class refrences in `entities` instead of paths
      alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
    },
    namingStrategy: MyCustomNamingStrategy,
    seeder: {
      path: './dist/modules/mikroorm/seeders', // path to the folder with seeders
      pathTs: './src/modules/mikroorm/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
      defaultSeeder: 'ConfigSeeder', // default seeder class name
      glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
      emit: 'ts', // seeder generation mode
      fileName: (className: string) => className, // seeder file naming convention
    },
  });
  const generator = orm.getEntityGenerator();
  const dump = await generator.generate({
    save: true,
    baseDir: process.cwd() + '/my-entities',
  });
  console.log(dump);
  await orm.close(true);
})();
