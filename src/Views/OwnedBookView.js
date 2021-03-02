import { React } from 'react'
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from '../Components/StarRating'
import Review from '../Components/Review'
import { deleteBookFromLibrary } from '../Reducers/userReducer'

const OwnedBookView = () => {
  const book = useSelector(state => state.ownedBook.bookInfo)
  const token = useSelector(state => state.login.token)
  const dispatch = useDispatch()
 
  const handleBookDelete = async () => {
    dispatch(deleteBookFromLibrary(book.id, token))
  }

  return (
    <>
    <Jumbotron fluid>
      <Container>
          <Row>
            <Col xs={8}>
              <h1>{book.title}</h1>
              <h5><i>{book.author}</i></h5>
              <StarRating book={book} />
            </Col>
            <Col xs={4} >
              <img src={book.linkToCoverImage} alt="cover"/>
            </Col>
            <Button xsOffset={10} variant="danger" onClick={() => handleBookDelete()} >
              Delete
            </Button>
          </Row>
      </Container>
    </Jumbotron>
    <Container>
      <Review/>
    </Container>
    </>
  )
}

export default OwnedBookView