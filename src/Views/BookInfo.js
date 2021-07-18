import { React, useState } from 'react'
import { Container, Row, Col, Jumbotron, Image, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addBookToLibrary } from '../Reducers/userReducer'
import '../custom-css.css'

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
  }

  // Korjaa näkymä, kun kirjalijoita enemmän kuin yksi!
  return (
    <>
      <Jumbotron fluid>
        <Container className="jumbo">
          <Row>
            <Col xs={7}>
              <h2>{bookInfo.volumeInfo.title}</h2>
              <h3>{bookInfo.volumeInfo.subtitle}</h3>
              <h5 className="pb-5"><i>{bookInfo.volumeInfo.authors}</i></h5>
              <Button onClick={() => handleBookAdding()}>Add book to library</Button>
            </Col>
            <Col xs={5} >
              <img src={bookInfo.volumeInfo.imageLinks.thumbnail} alt="cover"/>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col className="text-justify">
            <h3 className="pb-2" >Description</h3>  
            {bookInfo.volumeInfo.description}
          </Col>
        </Row>
      </Container>
    </>
  )

  // return (
  //   <Container className="bookinfo">
  //     <h2>{bookInfo.volumeInfo.title}</h2>
  //     <h3>{bookInfo.volumeInfo.subtitle}</h3>
  //     <h5><i>{bookInfo.volumeInfo.authors}</i></h5>
  //     <Row className="pt-4">
  //       <Col md={6}>
  //         <Image src={bookInfo.volumeInfo.imageLinks.thumbnail} />
  //       </Col>
  //       <Col className="text-justify">
  //         {bookInfo.volumeInfo.description}
  //       </Col>
  //     </Row>
  //     <Row className="pt-4">
  //       <Col>
  //         <Button onClick={() => handleBookAdding()}>Add book</Button>
  //       </Col>
  //       <Col>
  //       </Col>
  //     </Row>
  //   </Container>  
  // )
}

export default BookInfo