import sqlite from "sqlite3";

import {Film} from "./models.js"
import dayjs from "dayjs";

const db = new sqlite.Database("films-copy2.db", (err) => {
  if (err) throw err;
});

export const listFilms = (filter) => {
    return new Promise((resolve,reject)=> {
        const sql = "SELECT * FROM films";
        if(filter === "favorites")
            sql = "SELECT * FROM films WHERE isFavorite = 1";
        else if(filter === "top-rated")
            sql = "SELECT * FROM films WHERE rating = 5";
        else if(filter === "seen-last-month"){
            const threshold = dayjs().subtract(1, "month").format("YYYY-MM-DD");
            sql = `SELECT * FROM films WHERE watchDate >= '${threshold}`;
        }
        else if(filter === "unseen")
            sql = "SELECT * FROM films WHERE watchDate = NULL"

        db.all(sql, (err, rows) => {
            if (err)
                reject(err);
            else {
                const results = rows.map(row => new Film(row.id, row.title, row.isFavorite,
                                    row.watchDate, row.rating, row.userId));
                resolve(results);
            }
        });
    });
}

export const getFilm = (id) => {
    return new Promise((resolve,reject)=> {
        const sql = "SELECT * FROM films WHERE id=?"
        db.get(sql, [id], (err,row) => {
            if(err)
                reject(err);
            else {
                const result = new Film(row.id, row.title, row.isFavorite,
                                        row.watchDate, row.rating, row.userId)
                resolve(result);
            }
        })
    })
}

export const addFilm = (film) => {
    return new Promise((resolve,reject) => {
        const sql = "INSERT INTO films(title, isFavorite, watchDate, rating, userId) VALUES (?,?,?,?,?)"
        db.run(sql, [
            film.title,
            film.isFavorite,
            film.watchDate,
            film.rating,
            film.userId
        ],
            function(err) {
                if(err) reject(err);
                else resolve(this.lastID);
        });
    })
}

export const updateFilm = (id, film) => {
    return new Promise((resolve,reject) => {
        const sql = `UPDATE films SET title = ?,
                    isFavorite = ?, watchDate = ?,
                    rating = ?, userId = ? WHERE id = ?`
        db.run(sql, [
            film.title,
            film.isFavorite,
            film.watchDate,
            film.rating,
            film.userId,
            id
        ],
            function(err) {
                if(err) reject(err);
                else resolve(this.lastID);
        });
    })
}

