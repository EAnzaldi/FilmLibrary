import { Outlet } from "react-router";
import NavHeader from "./NavHeader";
import { Container } from "react-bootstrap";
import Sidebar from './Sidebar.jsx'

function DefaultLayout(props) {
  return(
    <>
    <NavHeader onToggleSidebar={() => props.setShowSidebar(!props.showSidebar)}/>
    <Sidebar
        show={props.showSidebar}
        onHide={() => props.setShowSidebar(false)}
        onFilterChange={props.setFilter}
        filter={props.filter} />
    <Container fluid className="mt-3">
        <div style={{ marginLeft: props.showSidebar ? `355px` : '0px'}}>
            <Outlet />
        </div>
    </Container>
    </>
  );
}

export default DefaultLayout;