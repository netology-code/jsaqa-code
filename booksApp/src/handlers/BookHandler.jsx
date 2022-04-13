import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AboutBook from '../components/book/AboutBook';

export default function BookHandler({ bookId }) {
  const [book, setBook] = useState(null);
  const load = () => {
    fetch(`${process.env.REACT_APP_URL}/api/books/${bookId}`)
      .then((res) => res.json())
      .then(setBook)
  }

  useEffect(() => load(), []);
  if (!book) return <div>Loading...</div>
  return (
    <AboutBook
      id={bookId}
      authors={book.authors}
      description={book.description}
      title={book.title}
      fileCover={book.fileCover}
    />
  )
}

BookHandler.propTypes = {
  bookId: PropTypes.string.isRequired,
}
