import React from 'react'
import { Carousel, Container, Jumbotron, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import StarRating from '../Components/StarRating'

const OwnedBookView = () => {
  const book = useSelector(state => state.ownedBook.bookInfo)


  const quoteCarousel = () => {
    return (
      <Carousel>
        {book.quotes.map(quote => {
          return (
          <Carousel.Item>
            <Carousel.Caption>
              <p>{quote}</p>
            </Carousel.Caption>
          </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }
  
  return (
    <div>
      <Jumbotron fluid>
        <Container className="text-left">
          <Row>
            <Col xs={8} >
              <h1>{book.title}</h1>
              <h5><i>{book.author}</i></h5>
              <StarRating rating={book.rating} />
            </Col>
            <Col xs={4} >
              <img src={book.linkToCoverImage} alt="cover"/>
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col> 
            <h4>Review</h4>
          </Col>
        </Row>
        <Row className="text-justify">
          <Col>
            <p>{book.review}</p>
          </Col>
        </Row>
      </Container>
    </div>    
  )
}

export default OwnedBookView