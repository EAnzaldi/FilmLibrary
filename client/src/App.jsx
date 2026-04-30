import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from 'react'
import './App.css'
import { Film } from './models/FLModels.jsx'
import FilmList from "./components/FilmList.jsx";
import { FilmForm, EditFilmForm } from "./components/FilmForm.jsx";
import dayjs from "dayjs";
import {Routes, Route} from 'react-router';
import DefaultLayout from "./components/DefaultLayout.jsx";
import { LoginForm } from "./components/LoginForm.jsx";
import NotFound from "./components/NotFound.jsx"

const myFilmLibrary = [
  new Film(1, "Pulp Fiction", true, "2026-04-10", 5, 1),
  new Film(2, "21 Grams", true, "2026-03-17", 4, 1),
  new Film(3, "Star Wars", false, undefined, undefined, 1),
  new Film(4, "Matrix", false, undefined, undefined, 1),
  new Film(5, "Shrek", false, "2026-03-21", 3, 1)
];

export const FilmFilter = {
  ALL: '',
  FAVORITES: 'favorites',
  BEST_RATED: 'best-rated',
  SEEN_LAST_MONTH: 'seen-last-month',
  UNSEEN: 'unseen'
};

const getFilteredFilms = (films, filter) => {
  switch(filter){
    case FilmFilter.FAVORITES:
      return films.filter((f) => f.isFavorite);
    case FilmFilter.BEST_RATED:
      return films.filter((f) => f.rating === 5);
    case FilmFilter.SEEN_LAST_MONTH:{
      const threshold = dayjs().subtract(1, "month");
      return films.filter((f) => f.watchDate?.isAfter(threshold));
    }
    case FilmFilter.UNSEEN:
      return films.filter((f) => !f.watchDate);
    default: 
      return films;
  }
}

{/* ROUTES:
  - index: / (?)
  - login: /login

  - libreria dei film: /films

  - nuovo film: /films//new
  - modifica film: /films/:fid/edit

  - filtro favorites: /films/favorites
  - filtro best rated: /films/best-rated
  - filtro seen last month: /films/seen-last-month
  - filtro unseen:  /films/unseen

  - not found: *
  */}

function App() {
  const [films, setFilms] = useState(myFilmLibrary);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filter, setFilter] = useState(FilmFilter.ALL);
  const filteredFilms = getFilteredFilms(films, filter);

  const addFilm = (film) => {
    setFilms(oldFilms => {
      // temporaneo
      const newId = Math.max(...oldFilms.map(ans => ans.id)) + 1;
      const newFilm = new Film(newId, film.title, film.isFavorite, film.watchDate, film.rating);
      return [...oldFilms, newFilm];
    });
  }

  const editFilm = (film) => {
    setFilms(oldFilms => {
      return oldFilms.map(f => {
        if(f.id === film.id)
          return new Film(film.id, film.title, film.isFavorite, film.watchDate, film.rating);
        else return f;
      });
    });
  }

  const deleteFilm = (filmId) => {
    setFilms(oldFilms => {
      return oldFilms.filter((film) => film.id !== filmId); 
    });
  }

  return (
    <Routes>
      <Route path="/login" element={ <LoginForm/>}></Route>
      <Route path="/films" element={ <DefaultLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar} setFilter={setFilter} filter={filter}/>}>
        <Route index element={ <FilmList films={filteredFilms} deleteFilm={deleteFilm}/> }></Route>
        <Route path="favorites" element={<FilmList films={filteredFilms} deleteFilm={deleteFilm}/>}></Route>
        <Route path="best-rated" element={<FilmList films={filteredFilms} deleteFilm={deleteFilm}/>}></Route>
        <Route path="seen-last-month" element={<FilmList films={filteredFilms} deleteFilm={deleteFilm}/>}></Route>
        <Route path="unseen" element={<FilmList films={filteredFilms} deleteFilm={deleteFilm}/>}></Route>
        <Route path="new" element={<FilmForm addFilm={addFilm} />}></Route>
        <Route path=":filmId/edit" element={<EditFilmForm editFilm={editFilm}/>}></Route>
      </Route>
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  )
}

export default App

{/*
    <Routes>
      <Route element={ <DefaultLayout />}>
        <Route path="/questions/:questionId" element={ <QuestionDescription questions={questions} /> }>
          <Route index element={ <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} editAnswer={updateAnswer} deleteAnswer={deleteAnswer}/> } ></Route>
          <Route path="answers/new" element={<AnswerForm addAnswer={addAnswer} />}></Route>
          <Route path="answers/:answerId/edit" element={<EditAnswerForm answers={answers} editAnswer={updateAnswer}/>}></Route>
        </Route>
      </Route>
  </Routes>
  */}