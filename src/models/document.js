import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Document = sequelize.define('Document', {
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    embedding: {
        type: DataTypes.VECTOR(1536),
        allowNull: false
    }
}, {
    tableName: 'documents',
    timestamps: false
});

Document.rpc = async function (func, params) {
    const query = `
    SELECT * FROM ${func}(:query_embedding, :match_threshold, :match_count);
  `;

    const result = await sequelize.query(query, {
        replacements: params,
        type: sequelize.QueryTypes.SELECT
    });

    return result;
}