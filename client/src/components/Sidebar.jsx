import { Button } from 'react-bootstrap';
import { FilmFilter } from '../App';
import { Link } from 'react-router'

function Sidebar(props) {
   const getClass = (filter) => `btn w-100 text-start ${filter === props.filter ? 'btn-primary' : 'btn-light'}`;

    return(
        <div style={{
            position: 'fixed',
            top: '58px',
            width: props.show ? '360px' : '0px',
            height: 'calc(100vh - 60px)',
            backgroundColor: '#f8f9fa',
            overflow: 'auto',
            zIndex: 1040
        }}>
            <div style={{ padding: '20px', position: 'relative' }}>
                <h5 style={{ marginBottom: '20px' }}>Filters</h5>
                <ul className="list-unstyled d-grid gap-2" style={{ marginTop: '20px' }}>
                    <Link className={getClass(FilmFilter.ALL)} to={`${FilmFilter.ALL}`} onClick={() => props.onFilterChange(FilmFilter.ALL)} >All</Link>
                    <Link className={getClass(FilmFilter.FAVORITES)} to={`${FilmFilter.FAVORITES}`} onClick={() => props.onFilterChange(FilmFilter.FAVORITES)} >Favorites</Link>
                    <Link className={getClass(FilmFilter.BEST_RATED)} to={`${FilmFilter.BEST_RATED}`} onClick={() => props.onFilterChange(FilmFilter.BEST_RATED)}>Best rated</Link>
                    <Link className={getClass(FilmFilter.SEEN_LAST_MONTH)} to={`${FilmFilter.SEEN_LAST_MONTH}`} onClick={() => props.onFilterChange(FilmFilter.SEEN_LAST_MONTH)}>Seen Last Month</Link>
                    <Link className={getClass(FilmFilter.UNSEEN)} to={`${FilmFilter.UNSEEN}`} onClick={() => props.onFilterChange(FilmFilter.UNSEEN)}>Unseen</Link>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;