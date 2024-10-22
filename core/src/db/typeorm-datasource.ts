import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, DataSourceOptions } from "typeorm";
import 'dotenv/config'

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    "dist/**/*.entity.js"
  ],
  migrations: ['dist/db/migrations/*.js'],
  ssl: process.env.DATABASE_SSL === 'true',
  extra: {
    ssl:
      process.env.DATABASE_SSL === 'true'
        ? {
            rejectUnauthorized: false,
          }
        : null,
  },
  synchronize: false,
  migrationsRun: false,
}

export const connectionSource = new DataSource(dbConfig as DataSourceOptions);
