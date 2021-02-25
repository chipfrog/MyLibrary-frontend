import React, { useState } from 'react'
import { Modal, Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addBookToLibrary, tryBookUpdate } from '../Reducers/userReducer'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'

const BookReviewForm = ({ bookInfo, handleClose, show }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.login.token)
  const isNewBook = bookInfo.volumeInfo !== undefined

  const [review, setReview] = useState(() => {if (isNewBook) {return ''} return bookInfo.review})
  const [quote, setQuote] = useState('')
  const [quoteList, setQuoteList] = useState(() => {if (isNewBook) {return []} return bookInfo.quotes})
  const [quoteCount, setQuoteCount] = useState(() => {if (isNewBook) {return 0} return bookInfo.quotes.length})

  // Active only when adding a new book
  const [rating, setRating] = useState(1)
  const [read, setRead] = useState(false)

  const handleAddQuote = () => {
    setQuoteList(quoteList.concat(quote))
    setQuote('')
    setQuoteCount(quoteCount + 1)
  }

  const handleBookAdding = () => {
  
    const book = {
      ...bookInfo,
      rating: rating,
      review: review,
      read: read,
      quotes: quoteList
    }
    dispatch(addBookToLibrary(book, token))
    setReview('')
    setRating(1)
    setRead(false)
    setQuote('')
    setQuoteList([])
    setQuoteCount(0)
    handleClose()
  }

  const handleBookUpdate = async () => {
    const book = {
      ...bookInfo,
      review: review,
      quotes: quoteList
    }
    console.log(book)
    dispatch(tryBookUpdate(book, token))
    dispatch(setOwnedBookInfo(book))
    // setReview(review)
    // setRating(rating)
    // setRead(read)
    // setQuote('')
    // setQuoteList(quoteList)
    // setQuoteCount(quoteCount)
    handleClose()
  }

  const handleBook = () => {
    if (isNewBook) {
      handleBookAdding()
    } else {
      handleBookUpdate()
    }
  }

  return (
    <Modal
      size="xl"
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false} 
    >
      <Modal.Header closeButton>
        {!isNewBook ?
          <Modal.Title>{bookInfo.title} by {bookInfo.author}</Modal.Title> 
          : <Modal.Title>{bookInfo.volumeInfo.title} by {bookInfo.volumeInfo.authors}</Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
      <Form className="pt-4 text-left" >
        <Form.Row>
          {isNewBook &&
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
          }
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
            <Button onClick={handleBook}>
              Submit
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
      </Modal.Body>
    </Modal>
  )
}

export default BookReviewForm