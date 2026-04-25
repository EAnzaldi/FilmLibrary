// import
import express from "express";
import morgan from "morgan";
import { listFilms, getFilm, addFilm, updateFilm } from "./dao.js";
import dayjs from "dayjs"

// init
const app = express();
const port = 3001;

// middlewares
app.use(express.json());
app.use(morgan("dev"));

const allowed = ["favorites","top-rated","seen-last-month","unseen"];

/* ROUTES */
//GET /api/films
app.get("/api/films", async (req, res) => {
    const q = req.query.filter;
    if(q && !allowed.includes(q))
        return res.status(400).json(error);
    try{
        const films = await listFilms(q);
        res.status(200).json(films);
    }
    catch(err) {
        console.error(err);
        res.status(500).end();
    }
});

app.get("/api/films/:id", async (req, res) => {
    try{
        const film = await getFilm(req.params.id);
        res.status(200).json(film);
    }
    catch(err) {
        console.error(err);
        res.status(500).end();
    }
})

app.post("/api/films", async (req,res) => {
    const { title, rating, watchDate, isFavorite } = req.body;
    const errors = [];
    if(!title || typeof title !== "string")
        errors.push("Title is required")
    if(rating !== undefined && (typeof rating !== "number" || rating < 0 || rating > 5))
        errors.push("Rating must be a number between 0 and 5");
    if(watchDate && !dayjs(watchDate).isValid())
        errors.push("Watch date must be valid")

    if (errors.length) return res.status(422).json({ error: "Validation failed", details: errors });
    
    try{
        const film = await addFilm(req.body);
        res.status(201).json(film);
    }
    catch(err) {
        console.error(err);
        res.status(500).end();
    }
})

app.put("/api/films/:id", async (req,res) => {
    const { title, rating, watchDate, isFavorite } = req.body;
    const errors = [];
    if(!title || typeof title !== "string")
        errors.push("Title is required")
    if(rating !== undefined && (typeof rating !== "number" || rating < 0 || rating > 5))
        errors.push("Rating must be a number between 0 and 5");
    if(watchDate && !dayjs(watchDate).isValid())
        errors.push("Watch date must be valid")

    if (errors.length) return res.status(422).json({ error: "Validation failed", details: errors });
    
    const id = Number.parseInt(req.params.id);
    try{
        const film = await updateFilm(id, req.body);
        res.status(200).json(film);
    }
    catch(err) {
        console.error(err);
        res.status(500).end();
    }
})



// start the server
app.listen(port, () => {console.log(`API server started at http://localhost:${port}`)});