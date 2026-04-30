import { Table, Button } from "react-bootstrap";
import { useState } from 'react';
import { Link } from 'react-router';

function FilmList(props) {
    return (
        <>
        <div className="border-start border-end border-1 px-3 my-3">
            <h2>All films</h2>   
            <FilmTable films={props.films} deleteFilm={props.deleteFilm} />
        </div>
        {/*<button className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4"><i class="bi bi-plus"></i></button>*/}
        <Link className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4" to="new"><i className="bi bi-plus"></i></Link>
        </>
    );
}

function FilmTable(props) {
    return (
        <Table>
            <tbody>
                {props.films.map((f) => (
                    <TableRow key={f.id} film={f} deleteFilm={props.deleteFilm} />
                ))}
            </tbody>
        </Table>
    );
};

function TableRow(props) {
    return (
        <tr>
        <TableElements film={props.film} />
        {/*passando tutte le props*/}
        <TableActions {...props} />
        </tr>
    );
}
/*
const unpackRating = (rating) => {
    let string;
   for(let i=0; i<rating; i++)
     string = string+ <i class="bi bi-star"></i> 
}*/

function TableElements(props) {
    const [isFavorite, setFavorite] = useState(false);

    return (
        <>
            <td> 
                {props.film.isFavorite ? 
                    <i className="bi bi-heart-fill text-danger"></i> :
                    <i className="bi bi-heart text-danger"></i>}
                    &nbsp;&nbsp;&nbsp;{props.film.title}
            </td>
            <td>{props.film.watchDate && props.film.watchDate.format('YYYY-MM-DD')}</td>
            <td>
            {Array.from({ length: 5 }, (_, i) => (
                <i
                key={i}
                className={`bi ${i < props.film.rating ?
                    'bi-star-fill text-warning' : 'bi-star'}`}
                />
            ))}
            </td>
        </>
    );
}

function TableActions(props) {
  return (
    <td>
        <Link className="btn" to={`${props.film.id}/edit`} state={props.film.serialize()}><i className="bi bi-pencil" /></Link>
        <button className="btn" onClick={() => props.deleteFilm(props.film.id)}> <i className="bi bi-trash"></i></button>
    </td>
  );
}

export default FilmList;