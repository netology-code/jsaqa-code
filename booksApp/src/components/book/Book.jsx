import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Book({
                               props: { title, fileCover, authors, key, favorite, description },
                             }) {
  const btn = !favorite ? (
    <Button variant="success">Add to favorite</Button>
  ) : (
    <Button variant="secondary">Delete from favorite</Button>
  );

  const onClick = async (event) => {
    if (event.target.tagName === 'BUTTON') {
      event.preventDefault();
      const url = `${process.env.REACT_APP_URL}/api/favorites/books/${key}`;
      const response = !favorite
        ? await fetch(url, {
          method: 'POST',
          body: key,
        })
        : await fetch(url, {
          method: 'DELETE',
        });
      if (response.ok) {
        window.location.reload();
      } else {
        throw Error(response.statusText);
      }
    }
  };

  return (
    <>
      <Link
        className="mt-3"
        style={{
          textDecoration: 'none',
          position: 'relative',
          color: '#000',
        }}
        to={{
          pathname: `book/${key}`,
          state: {
            ...{ title, description, fileCover, authors, favorite, key },
          },
        }}
      >
        <Card
          className="h-100"
          onClick={onClick}
          key={key}
          style={{
            maxWidth: '300px',
            minWidth: '150px',
            textAlign: 'center',
          }}
        >
          <Card.Img variant="top" src={fileCover} />
          <Card.Body>
            <Card.Title style={{ margin: 'auto' }}>{title}</Card.Title>
            <Card.Text style={{ margin: 'auto' }}>{authors}</Card.Text>
          </Card.Body>
          {localStorage.mail ? (<Card.Footer>{btn}</Card.Footer>) : null}
        </Card>
      </Link>
    </>
  );
}

Book.propTypes = {
  props: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fileCover: PropTypes.string.isRequired,
    fileBook: PropTypes.shape.isRequired,
    authors: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    favorite: PropTypes.string.isRequired,
  }).isRequired,
};
