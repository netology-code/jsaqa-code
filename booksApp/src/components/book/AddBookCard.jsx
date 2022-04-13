import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import defaultAddBook from '../../img/addBook';

export default function AddBookCard({ openForm }) {
  if (!localStorage.mail) return null;
  return (
    <Card
      onClick={openForm}
      style={{
        maxWidth: '300px',
        minWidth: '150px',
        textAlign: 'center',
      }}
      className="btn p-0 mt-3"
    >
      <Card.Img
        src={defaultAddBook}
        style={{ height: '70%' }}
        className="m-auto"
      />
      <Button variant="warning">Add new</Button>
    </Card>
  );
}
AddBookCard.propTypes = {
  openForm: PropTypes.func.isRequired,
};
