import "bootstrap/dist/css/bootstrap.min.css";

import { useRef, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import './App.css'
import { Film } from './models/FLModels.jsx'
import NavHeader from './components/NavHeader.jsx';
import Sidebar from "./components/Sidebar.jsx";
import FilmList from "./components/FilmList.jsx";
import dayjs from "dayjs";

const myFilmLibrary = [
  new Film(1, "Pulp Fiction", true, "2026-04-10", 5, 1),
  new Film(2, "21 Grams", true, "2026-03-17", 4, 1),
  new Film(3, "Star Wars", false, undefined, undefined, 1),
  new Film(4, "Matrix", false, undefined, undefined, 1),
  new Film(5, "Shrek", false, "2026-03-21", 3, 1)
];

export const FilmFilter = {
  ALL: 'ALL',
  FAVORITES: 'FAVORITES',
  BEST_RATED: 'BEST_RATED',
  SEEN_LAST_MONTH: 'SEEN_LAST_MONTH',
  UNSEEN: 'UNSEEN'
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


function App() {
  const [films, setFilms] = useState(myFilmLibrary);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filter, setFilter] = useState(FilmFilter.ALL);
  const filteredFilms = getFilteredFilms(films, filter);

  return (
    <>
      <NavHeader onToggleSidebar={() => setShowSidebar(!showSidebar)}/>
      <Sidebar
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        onFilterChange={setFilter}
        filter={filter} />
      <div style={{ marginLeft: showSidebar ? `355px` : '0px'}}>
        <FilmList films={filteredFilms} />
      </div>
      <button className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4"><i class="bi bi-plus"></i></button>
    </>
  )
}

export default App