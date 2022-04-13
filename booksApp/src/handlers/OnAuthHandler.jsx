/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../components/common/Header';
import Home from '../Pages/Home';
import BookPage from '../Pages/BookPage';
import Favorites from '../Pages/Favorites';

export default function OnAuthHandler() {
  const [form, setForm] = useState({
    mail: '',
    pass: '',
  });

  const changeForm = (event) => {
    const { id } = event.target;
    const formElement = {};
    formElement[id] = event.target.value;
    setForm({
      ...form,
      ...formElement,
    });
  };

  const [switchStatus, setStatus] = useState(false);
  const disabelModal = () => setStatus(true);
  const enableModal = () => setStatus(false);

  const [valid, setValid] = useState({ class: '', message: null });
  const invalidLoginPass = (textMessage) => {
    setValid({ class: 'show', message: textMessage });
    setTimeout(() => setValid({ class: '', message: null }), 5000);
  };

  const sendForm = async (event) => {
    event.preventDefault();
    disabelModal();
    const url = `${process.env.REACT_APP_URL}/api/user/login`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(form),
    });
    if (!response.ok) throw Error(response.statusText);

    const result = await response.json();
    if (!result.id) {
      enableModal();
      await invalidLoginPass(result.message);
    } else {
      localStorage.setItem('id', result.id);
      localStorage.setItem('mail', result.mail);
      window.location.reload();
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let logBtn;
  if (localStorage.mail) {
    const localInfo = ` ${localStorage.getItem('mail')}`;
    logBtn = (
      <>
        <span className="pt-2">Добро пожаловать{localInfo}</span>
        <Button
          variant="primary"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="ml-2"
        >
          Log out
        </Button>
      </>
    );
  } else {
    logBtn = (
      <>
        <Button variant="warning" onClick={handleShow} className="ml-2">
          Log in
        </Button>
      </>
    );
  }

  return (
    <>
      <Router>
        <Header
          sendForm={sendForm}
          changeForm={changeForm}
          switchStatus={switchStatus}
          valid={valid}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          logBtn={logBtn}
        />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/book/:bookId" component={BookPage} />
          <Route exact path="/favorites" component={Favorites} />
        </Switch>
      </Router>
    </>
  );
}
