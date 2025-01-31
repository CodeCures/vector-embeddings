import { config } from 'dotenv';
import express from 'express'
import { createDocs, queryDocs } from './controllers/DocumentController.js';
import { sequelize } from './config/database.js';

config();

const app = express();

app.use(express.json());

app.post('/documents', createDocs)
app.post('/documents/query', queryDocs)

const port = process.env.PORT || 4000

sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.error('Unable to connect to the database:', error))

app.listen(port, () => console.log(`Listening on port ${port}`))

