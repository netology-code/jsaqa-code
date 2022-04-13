import React from 'react';
import { useParams } from 'react-router-dom';
import BookHandler from '../handlers/BookHandler';

export default function BookPage() {
  const { bookId } = useParams();
  return (
    <BookHandler bookId={bookId} />
  );
}
