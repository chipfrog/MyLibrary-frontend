import { React, useState } from 'react'
import { Container, Row, Col, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addBookToLibrary } from '../Reducers/userReducer'

const BookInfo = () => {
  const info = useSelector(state => state.bookInfo)
  const token = useSelector(state => state.login.token)
  const bookInfo = info.bookInfo
  const [bookAdded, setAddedBook] = useState(false)
  const dispatch = useDispatch()

  const handleBookAdding = () => {
    dispatch(addBookToLibrary(bookInfo, token))
    setAddedBook(true)
  }

  if (bookInfo === null) {
    return (
      <h2>undefined</h2>
    )
  }
  
  if (bookAdded) {
    return (
      <Redirect to={'/'}/>
    )
    // return (
    //   <Redirect to={`/info/${bookInfo.volumeInfo.title}`}/>
    // )
  }

  // Korjaa näkymä, kun kirjalijoita enemmän kuin yksi!
  return (
    <Container className="pt-4 text-center">
      <h2>{bookInfo.volumeInfo.title}</h2>
      <h3>{bookInfo.volumeInfo.subtitle}</h3>
      <h5><i>{bookInfo.volumeInfo.authors}</i></h5>
      <Row className="pt-4">
        <Col md={6}>
          <Image src={bookInfo.volumeInfo.imageLinks.thumbnail} />
        </Col>
        <Col className="text-justify">
          {bookInfo.volumeInfo.description}
        </Col>
      </Row>
      <Row className="pt-4">
        <Col>
          <Button onClick={() => handleBookAdding()}>Add book</Button>
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>  
  )
}

export default BookInfo