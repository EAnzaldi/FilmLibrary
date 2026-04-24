import { Button } from 'react-bootstrap';
import { FilmFilter } from '../App';

function Sidebar(props) {
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
                    <li><Button
                        className={`btn w-100 text-start
                            ${props.filter === FilmFilter.ALL ? '' : 'btn-light'}`} 
                        onClick={() => props.onFilterChange(FilmFilter.ALL)}>
                        All</Button></li>
                    <li><Button
                        className={`btn w-100 text-start
                            ${props.filter === FilmFilter.FAVORITES ? '' : 'btn-light'}`} 
                        onClick={() => props.onFilterChange(FilmFilter.FAVORITES)}>
                        Favorites</Button></li>
                    <li><Button
                        className={`btn w-100 text-start
                            ${props.filter === FilmFilter.BEST_RATED ? '' : 'btn-light'}`} 
                        onClick={() => props.onFilterChange(FilmFilter.BEST_RATED)}>
                        Best Rated</Button></li>
                    <li><Button
                        className={`btn w-100 text-start
                            ${props.filter === FilmFilter.SEEN_LAST_MONTH ? '' : 'btn-light'}`} 
                        onClick={() => props.onFilterChange(FilmFilter.SEEN_LAST_MONTH)}>
                        Seen Last Month</Button></li>
                    <li><Button
                        className={`btn w-100 text-start
                            ${props.filter === FilmFilter.UNSEEN ? '' : 'btn-light'}`} 
                        onClick={() => props.onFilterChange(FilmFilter.UNSEEN)}>
                        Unseen</Button></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;