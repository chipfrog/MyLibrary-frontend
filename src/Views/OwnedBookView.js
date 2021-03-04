import { React, useEffect, useState } from 'react'
import { Container, Jumbotron, Row, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import StarRating from '../Components/StarRating'
import Review from '../Components/Review'
import { deleteBookFromLibrary, tryBookUpdate } from '../Reducers/userReducer'
import DeleteConfirmation from '../Components/DeleteConfirmation'
import { Redirect } from 'react-router-dom'

const OwnedBookView = () => {
  const book = useSelector(state => state.ownedBook.bookInfo)
  const token = useSelector(state => state.login.token)
  const [bookRead, setBookRead] = useState(() => book === null ? null : book.read)
  const [bookOwned, setBookOwned] = useState(() => book === null ? null : book.owned)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()

  const handleDelete = async () => {
    dispatch(deleteBookFromLibrary(book.id, token))
    setShow(false)
  }

  useEffect(() => {
    if (book !== null) {
      if (bookRead !== book.read || bookOwned !== book.owned) {
        const updatedBook = {
          ...book,
          read: bookRead,
          owned: bookOwned
        }
        dispatch(tryBookUpdate(updatedBook, token))
      }
    }    
  }, [bookRead, bookOwned])

  if (book === null) {
    return (
      <Redirect to='/' />
    )
  }
 
  return (
    <>
    <Jumbotron fluid>
      <Container>
        <Row>
          <Col xs={7}>
            <h1>{book.title}</h1>
            <h5><i>{book.author}</i></h5>
            <StarRating book={book} />
            <Form className="pt-3">
              <Form.Check
                inline 
                type="checkbox"
                id="read"
                label="Read"
                checked={bookRead}
                onChange={() => setBookRead(!bookRead)}
              />
              <Form.Check
                inline 
                type="checkbox"
                id="owned"
                label="Owned"
                checked={bookOwned}
                onChange={() => setBookOwned(!bookOwned)}
              />
            </Form>
          </Col>
          <Col xs={5} >
            <img src={book.linkToCoverImage} alt="cover"/>
          </Col>
        </Row>
      </Container>

    </Jumbotron>
    <Container>
      <DeleteConfirmation show={show} setShow={setShow} book={book} handleDelete={handleDelete} />
      <Review setShow={setShow} />
    </Container>
    </>
  )
}

export default OwnedBookView