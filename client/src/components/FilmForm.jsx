import dayjs from "dayjs";
import { useActionState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router";

export function EditFilmForm(props) {
  const location = useLocation();
  const film = location.state;
  // ricostruiamo l'oggetto dayjs dalla stringa
  film.watchDate = dayjs(film.watchDate);

  return (
    <>
    {film ?
      <FilmForm film={film} editFilm={props.editFilm} /> :
      <Row>
        <Col as="p" className="lead">Impossible to edit a non-existent film.</Col>
      </Row>
    }
    </>
  );
}

export function FilmForm(props) {
  const navigate = useNavigate();

  const initialState = {
    title: props.film?.title,
    watchDate: props.film?.watchDate ?? undefined,
    isFavorite: props.film?.isFavorite,
    rating: props.film?.rating
  };

  const handleSubmit = async (prevState, formData) => {
    const film = Object.fromEntries(formData.entries());
    const watchDate = dayjs(film.watchDate);

    //validazione
    if(film.title.trim()==="") {
      film.error = "Title can't be empty, please fix it!"
      film.watchDate = watchDate;
      return film;
    }

    if(watchDate.isAfter(dayjs())){
      film.error = "Watch date can't be set in the future, please fix it!"
      film.watchDate = watchDate;
      return film;
    }

    if(film.rating<0 || film.rating>5){
      film.error = "Rating must be in the range [0,5], please fix it!"
      film.watchDate = watchDate;
      return film;
    }

    if(props.addFilm)
      props.addFilm(film);
    else
      props.editFilm({id: props.film.id, ... film});

    navigate(`/films`);
  }

  const [state, formAction] = useActionState(handleSubmit, initialState);

  return(
    <>
      {state.error && <Alert variant="secondary">{state.error}</Alert>}
      <Form action={formAction}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" type="text" required={true} minLength={2} defaultValue={state.title}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Favorite</Form.Label>
          <Form.Check name="isFavorite" type="checkbox" defaultChecked={state.isFavorite}></Form.Check>
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control name="rating" type="number" required={false} min={0} max={5} defaultValue={state.rating}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Watch date</Form.Label>
          <Form.Control name="watchDate" type="date" required={false} defaultValue={state.watchDate?.format("YYYY-MM-DD")}></Form.Control>
        </Form.Group>
        {props.addFilm && <Button variant="primary" type="submit">Add</Button>}
        {props.editFilm && <Button variant="primary" type="submit">Edit</Button>}
      </Form>
    </>
  );

}