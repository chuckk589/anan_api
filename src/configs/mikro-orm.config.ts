import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import 'dotenv/config';

const MikroORMOptions: MikroOrmModuleOptions = {
  type: 'postgresql',
  allowGlobalContext: true,
  ...(process.env.NODE_ENV === 'development' ? { debug: true, logger: console.log.bind(console) } : {}),
  entities: ['./dist/modules/mikroorm/entities/'],
  entitiesTs: ['./src/modules/mikroorm/entities/'],
  clientUrl: process.env.DB_URL,
  discovery: {
    warnWhenNoEntities: false, // by default, discovery throws when no entity is processed
    requireEntitiesArray: false, // force usage of class refrences in `entities` instead of paths
    alwaysAnalyseProperties: false, // do not analyse properties when not needed (with ts-morph)
  },
  seeder: {
    path: './dist/modules/mikroorm/seeders', // path to the folder with seeders
    pathTs: './src/modules/mikroorm/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'ConfigSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default MikroORMOptions;
