import {Container, Navbar} from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css";

function NavHeader(props) {
    return (
        <Navbar bg='primary' data-bs-theme='dark'>
        <Container fluid>
            <Navbar.Brand
                className="user-select-none"
                style={{ cursor: 'pointer' }}
                onClick={props.onToggleSidebar}
            >
                <i className="bi bi-person-video3"></i>{' '}FilmLibrary
            </Navbar.Brand>
            <NavSearch/>
        </Container>
        </Navbar>
    );
}

function NavSearch(props) {
    return(
        <div className="d-flex justify-content-end w-100">
        <form className="me-2" role="search" style={{ width: '66.66%' }}>
            <input
            className="form-control me-2 bg-light text-dark placeholder-dark"
            type="search"
            placeholder="Search..."
            aria-label="Search"
            />
        </form>
        <i className="bi bi-person-circle text-light fs-4"></i>
        </div>
    );
}

export default NavHeader;

