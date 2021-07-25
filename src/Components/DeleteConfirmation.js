import React from 'react'
import { Button, Modal, Row } from 'react-bootstrap'


const DeleteConfirmation = ({ show, setShow, book, handleDelete }) => {

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <b>Delete {book.title} by {book.author}</b> from the library?
      </Modal.Body>
      <Modal.Footer>
        <Button className="mr-1" variant="danger" onClick={handleDelete}>Delete</Button>
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmation