import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'react-bootstrap';
import BooksDeck from '../components/book/BooksDeck';
import AddBookCard from '../components/book/AddBookCard';
import AddBookForm from '../components/book/AddBookForm';

export default function BooksHandler() {
  const [books, setBooks] = useState([]);
  const [isFormShown, showForm] = useState(false); // показ добавления книги
  const openForm = () => showForm(true);
  const closeForm = () => showForm(false);

  const fetchBooks = () => {
    const url = `${process.env.REACT_APP_URL}/api/books`;
    fetch(url)
      .then((response) => response.json())
      .then(setBooks)
  }
  const sendForm = async (form) => {
    const url = `${process.env.REACT_APP_URL}/api/books`;
    form.set('key', uuidv4());

    const response = await fetch(url, {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      closeForm();
      await fetchBooks();
    } else {
      throw Error(response.statusText);
    }
  };
  useEffect(fetchBooks, []);

  return (
    <>
      <BooksDeck
        openForm={openForm}
        AddBookCard={AddBookCard}
        cards={books}
      />
      {isFormShown && (
        <Modal show={isFormShown} onHide={closeForm}>
          <Modal.Header closeButton>
            <Modal.Title>Book description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddBookForm
              closeForm={closeForm}
              sendForm={sendForm}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
