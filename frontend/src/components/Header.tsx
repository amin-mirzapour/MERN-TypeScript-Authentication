import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { LinkContainer } from 'react-router-bootstrap';
import { logoutUser } from '../slices/usersSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Header = () => {
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN Auth</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <NavDropdown title={user.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
