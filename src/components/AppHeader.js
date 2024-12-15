import {Container, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

function AppHeader(){
    return(
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">
                    LN
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default AppHeader;