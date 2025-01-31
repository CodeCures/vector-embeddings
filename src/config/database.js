import { Sequelize } from 'sequelize';
import pgvector from 'pgvector/sequelize';

pgvector.registerType(Sequelize);

export const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'vector_db',
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 5432,
    ssl: false,
});