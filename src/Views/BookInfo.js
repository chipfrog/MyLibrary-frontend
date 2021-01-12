import { React, useState } from 'react'
import { Container, Row, Col, Image, Button, Form, Modal } from 'react-bootstrap'
import { useDispatch ,useSelector } from 'react-redux'
import { addBookToLibrary } from '../Reducers/loginReducer'

const BookInfo = () => {
  const dispatch = useDispatch()
  const info = useSelector(state => state.bookInfo)
  const token = useSelector(state => state.login.token)
  const bookInfo = info.bookInfo

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [review, setReview] = useState('')
  const [rating, setRating] = useState(1)
  const [read, setRead] = useState(false)
  const [quote, setQuote] = useState('')
  const [quoteList, setQuoteList] = useState([])
  const [quoteCount, setQuoteCount] = useState(0)
  
  if (bookInfo === null) {
    return (
      <h2>undefined</h2>
    )
  }

  const handleBookAdding = async (event) => {
    event.preventDefault()
    
    const book = {
      ...bookInfo,
      rating: rating,
      review: review,
      read: read,
      quotes: quoteList
    }
    console.log(book)
    dispatch(addBookToLibrary(book, token))
    setReview('')
    setRating(1)
    setRead(false)
    setQuote('')
    setQuoteList([])
    setQuoteCount(0)
    handleClose()
  }

  const handleAddQuote = () => {
    setQuoteList(quoteList.concat(quote))
    setQuote('')
    setQuoteCount(quoteCount + 1)
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
          <Button onClick={handleShow}>Add book</Button>
        </Col>
        <Col>
        </Col>
      </Row>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false} 
      >
        <Modal.Header closeButton>
          <Modal.Title>{bookInfo.volumeInfo.title} by {bookInfo.volumeInfo.authors}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleBookAdding} className="pt-4 text-left" >
          <Form.Row>
            <Form.Group controlId="formGrade" >
              <Form.Label>Grade</Form.Label>
                <Form.Control 
                  as="select" 
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={9}>9</option>
                  <option value={10}>10</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formReview" >
              <Form.Label>Review</Form.Label>
              <Form.Control 
                as="textarea"
                rows={10}
                value={review}
                onChange={e => setReview(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} >
              <Form.Label>Favorite quotes</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={quote}
                onChange={e => setQuote(e.target.value)}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} >
              <Button onClick={handleAddQuote}>Add quote</Button>
            </Form.Group>
            <Form.Group as={Col} >
              Quotes saved: {quoteCount}
            </Form.Group>
            <Form.Group as={Col} controlId="formBookRead">
              <Form.Check label="Book read" onChange={() => setRead(!read)}/>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} >
              <Button type="submit">Submit</Button>
            </Form.Group>
          </Form.Row>
        </Form>
        </Modal.Body>
      </Modal>      
    </Container>  
  )
}

export default BookInfo