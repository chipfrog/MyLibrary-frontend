import { Button, Modal, Row } from "react-bootstrap"


const DeleteConfirmationUser = ({ show, setShow, handleDelete }) => {

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
        <Row>
          <b>Do you want delete your account and all your books? This action cannot be reversed.</b>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button className="mr-1" variant="danger" onClick={handleDelete}>Delete my account</Button>
        <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default DeleteConfirmationUser