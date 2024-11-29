import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { postModel } from './models/post.model.js';
import { handleErrors } from './database/errors.js';

// Configuración global
dotenv.config();

// Instanciación de la app y middlewares
const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});

// RUTA GET/posts
app.get('/posts', async (req, res) => {
    try {
        const result = await postModel.findAll();
        return res.status(200).json(result);
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});



// RUTA POST/posts
app.post('/posts', async (req, res) => {
    const newPost = {
        titulo: req.body.titulo,
        img: req.body.url,
        descripcion: req.body.descripcion
    };

    try {
        const result = await postModel.createPost(newPost);
        return res.status(200).json({ ok: true, message: 'Post creado', result });
    } catch (error) {
        const { status, message } = handleErrors(error.code);
        return res.status(status).json({ ok: false, result: message });
    }
});
