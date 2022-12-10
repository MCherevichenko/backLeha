import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import 'dotenv/config';

const options: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST,
    port: +process.env.POSTGRES_DB_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    dropSchema: false,
    synchronize: false,
    logging: false,
    logger: 'advanced-console',
    entities: ['src/**/*.entity.ts'],
    migrations: ['migrations/**/*.ts'],
};

export default new DataSource(options);
