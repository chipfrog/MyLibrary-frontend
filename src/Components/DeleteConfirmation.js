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
        <Modal.Title>Delete {book.title} by {book.author} from the library?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteConfirmation