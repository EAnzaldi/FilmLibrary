import { Form, Button } from 'react-bootstrap';
import { useActionState } from 'react';
import { useNavigate } from 'react-router';

export function LoginForm(props) {
    const navigate = useNavigate();

    const initialState = {
        username: '',
        password: ''
    };

    const handleSubmit = async (prevState, formData) => {
        navigate(`/films`);
    }

    const [state, formAction] = useActionState(handleSubmit, initialState);

    return(
        <>
        {state.error && <Alert variant="secondary">{state.error}</Alert>}
        <Form action={formAction}>
            <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" type="text" required={true} minLength={2} defaultValue={state.title}></Form.Control>
            </Form.Group>
            <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type="password" required={true} minLength={8} defaultChecked={state.isFavorite}></Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">Login</Button>
        </Form>
        </>
    );

}