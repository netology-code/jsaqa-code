import React from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Book from './Book';

export default function BooksDeck({
                                    openForm,
                                    AddBookCard,
                                    cards,
                                  }) {
  return (
    <>
      <Container>
        <CardDeck className="d-flex flex-wrap">
          {cards.map((elem) => (
            <Book props={elem} key={uuidv4()} />
          ))}
          <AddBookCard openForm={openForm} />
        </CardDeck>
      </Container>
    </>
  );
}

BooksDeck.propTypes = {
  openForm: PropTypes.func,
  AddBookCard: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.any.isRequired,
};

BooksDeck.defaultProps = {
  AddBookCard: () => <></>,
  openForm: () => null,
};
