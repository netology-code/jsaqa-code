import React from 'react';
import { Button, Container, Form, Modal, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../img/books_image.png';

export default function Header({
                                 changeForm,
                                 sendForm,
                                 switchStatus,
                                 valid,
                                 handleClose,
                                 show,
                                 logBtn,
                               }) {
  return (
    <>
      <Navbar
        style={{
          backgroundColor: 'rgb(124, 25, 218)',
          color: 'white',
        }}
      >
        <Container>
          <Link to="/">
            <Navbar.Brand className="text-light">
              <img
                src={logo}
                height="40"
                width="40"
                className="d-inline-block align-top"
                alt="Logo"
              />
              <span className="ml-2">Books list</span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {localStorage.mail ? (
              <Nav.Link
                href="/favorites"
                className="font-weight-bold text-warning ml-4"
              >
                <h4>Favorites</h4>
              </Nav.Link>
            ) : null}
            <Nav className="ml-auto">{logBtn}</Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton={!switchStatus}>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onChange={(event) => changeForm(event)}
            onSubmit={(event) => sendForm(event)}
          >
            <Form.Group controlId="mail">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                disabled={switchStatus}
              />
              <Form.Text className="text-muted">have fun!</Form.Text>
            </Form.Group>
            <Form.Group controlId="pass">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                disabled={switchStatus}
                required
              />
            </Form.Group>
            <div
              className={`mb-3 pl-4 text-danger font-weight-bold collapse ${valid.class}`}
            >
              {valid.message}
            </div>
            <Button
              variant="dark"
              onClick={handleClose}
              disabled={switchStatus}
            >
              Cancel
            </Button>
            <Button
              className="ml-2"
              variant="success"
              type="submit"
              disabled={switchStatus}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

Header.propTypes = {
  changeForm: PropTypes.func.isRequired,
  sendForm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  switchStatus: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  logBtn: PropTypes.node.isRequired,
  valid: PropTypes.shape({
    class: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};
