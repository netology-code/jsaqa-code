import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import defaultBookCover from '../../img/book';
import readFile from '../../utils/read-file';

export default function AddBookForm({
                               closeForm,
                               sendForm,
                             }) {
  const [bookCover, setBookCover] = useState(defaultBookCover);
  const [fail, setFail] = useState({ class: '', message: '' }); // показ ошибки при неправильной обложке

  const invalidImage = () => {
    setFail({ class: 'show', message: 'Неправильный тип файла' });
    setTimeout(() => setFail({ class: '', message: null }), 5000);
  };

  const [form, setForm] = useState({});
  const changeForm = async (event) => {
    event.preventDefault();
    if (!event.target) return;
    const { name, value, checked, files } = event.target;

    switch (name) {
      case 'fileCover': {
        const file = files[0];
        if (!file) return;
        const isImage = file.type.toLowerCase().startsWith('image');
        if (!isImage) {
          invalidImage();
          return;
        }
        const content = await readFile(file);
        setBookCover(content);
        setForm((old) => ({ ...old, [name]: content }))
        break;
      }
      case 'fileBook': {
        const file = files[0];
        if (!file) return;
        setForm((old) => ({ ...old, [name]: file, fileName: file.name }));
        break;
      }
      case 'favorite': {
        setForm((old) => ({ ...old, [name]: checked || '' }));
        break;
      }
      default:
        setForm((old) => ({ ...old, [name]: value }));
    }
  };

  const send = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set('title', form.title || '');
    formData.set('description', form.description || '');
    formData.set('authors', form.authors || '');
    formData.set('favorite', form.favorite || '');
    formData.append('fileCover', form.fileCover);
    formData.append('fileBook', form.fileBook);
    formData.set('fileName', form.fileName);

    sendForm(formData);
  }
  return (

    <Form
      onChange={(event) => changeForm(event)}
      onSubmit={(event) => send(event)}
    >
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          placeholder="Enter book title"
          required
        />
      </Form.Group>
      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          name="description"
          placeholder="Enter book description"
        />
      </Form.Group>
      <Form.Group controlId="fileCover">
        <Form.Label>Cover</Form.Label>
        <div>
          <img
            src={bookCover}
            alt="book cover"
            style={{ maxWidth: '100%' }}
          />
          <Form.File name="fileCover" />
        </div>
        <div className={`mb-3 pl-4 text-danger font-weight-bold collapse ${fail.class}`}>
          {fail.message}
        </div>
      </Form.Group>
      <Form.Group controlId="fileBook">
        <Form.Label>Book file</Form.Label>
        <Form.File
          name="fileBook"
        />
      </Form.Group>
      <Form.Group controlId="authors">
        <Form.Label>Authors</Form.Label>
        <Form.Control
          name="authors"
          type="text"
          placeholder="Enter book authors"
        />
      </Form.Group>
      <Form.Group>
        <Form.Check
          label="add to favorite"
          id="favorite"
          name="favorite"
          feedbackTooltip
        />
      </Form.Group>
      <Button variant="dark" onClick={closeForm}>
        Cancel
      </Button>
      <Button className="ml-2" variant="success" type="submit">
        Submit
      </Button>
    </Form>
  )
}

AddBookForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
  sendForm: PropTypes.func.isRequired,
};
