import React, { useEffect, useState } from 'react';
import { Card, CardDeck, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BooksDeck from '../components/book/BooksDeck';

export default function Favorites() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const url = `${process.env.REACT_APP_URL}/api/favotites/books`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCards(data);
      });
  }, []);

  if (!cards.length) {
    return (
      <Container>
        <CardDeck className="d-flex flex-wrap">
          <Card
            className="btn ml-auto mr-auto mt-5 font-weight-bold text-info"
            style={{
              maxWidth: '300px',
              minWidth: '150px',
              textAlign: 'center',
              border: '3px solid black',
            }}
          >
            <Link to="/">
              Please add some book to favorit on home page!
            </Link>
          </Card>
        </CardDeck>
      </Container>
    );
  }

  return (
    <BooksDeck
      cards={cards}
    />
  );
}
