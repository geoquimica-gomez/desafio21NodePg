import { pool } from "../database/connection.js";
import { handleErrors } from "../database/errors.js";

const findAll = async () => {
    const { rows} = await pool.query("SELECT * FROM posts");
    return rows;
};


const createPost = async (post) => {
    try {
        const { titulo, img, descripcion } = post;
        if (!titulo.trim() || !img.trim() || !descripcion?.trim()) {
            throw new Error('400: Expected valid fields');
        }
        const consulta = 'INSERT INTO posts VALUES (DEFAULT, $1, $2, $3) RETURNING *;';
        const values = [titulo, img, descripcion];
        const result = await pool.query(consulta, values);
        return result.rows[0];
    } catch (error) {
        const handledError = handleErrors(error.message.startsWith('400') ? '400' : '500');
        throw handledError;
    }
};



export const postModel = {
    findAll,
    createPost
};

