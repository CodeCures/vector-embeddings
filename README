# Vector Similarity Search API

## Overview
This project provides a REST API for performing vector similarity searches using OpenAI embeddings and a PostgreSQL database. The API allows users to store documents as vector embeddings and query for the most relevant matches based on semantic similarity.

## Features
- Store documents as vector embeddings
- Query for semantically similar documents
- Uses OpenAI API for text embeddings and completion
- Built with Express.js and PostgreSQL (Sequelize ORM)

## Technologies Used
- Node.js
- Express.js
- PostgreSQL
- Sequelize
- OpenAI API
- dotenv

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- An OpenAI API key

### Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd vector-embeddings
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=4000
   OPENAI_API_KEY=your_openai_api_key
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## Database Setup

Enable the `vector` extension in PostgreSQL:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
```


Create a table to store your documents:
```sql
create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);
```

Create a function to match documents based on similarity:
```sql
create or replace function match_documents (
  query_embedding vector(384),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

## API Endpoints

### 1. Store Documents
**Endpoint:** `POST /documents`

**Description:** Creates and stores document embeddings in the database.

**Response:**
```json
{
  "data": "Documents stored successfully"
}
```

### 2. Query Documents
**Endpoint:** `POST /documents/query`

**Description:** Finds the most relevant document based on vector similarity.

**Request Body:**
```json
{
  "text": "Your search query here"
}
```

**Response:**
```json
{
  "message": "Relevant document response"
}
```

## Project Structure
```
📂 vector-embeddings
├── 📂 src
│   ├── 📂 config
│   ├── 📂 controllers
│   ├── 📂 services
│   ├── 📂 utils
│   │   ├── content.js
├── index.js
├── .env
├── package.json
```

## License
This project is licensed under the MIT License.

