import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Tabs, Tab, Form, Button, Card } from 'react-bootstrap'
import { tryBookUpdate, addQuoteToBook } from '../Reducers/userReducer'
import { AiOutlineClose } from 'react-icons/ai'

const Review = ({ setShow }) => {
  const book = useSelector(state => state.ownedBook.bookInfo)
  const dispatch = useDispatch()
  
  const token = useSelector(state => state.login.token)
  const [editReview, setEditReview] = useState(false)
  const [review, setReview] = useState(book.review)
  const [quoteAdding, setQuoteAdding] = useState(false)
  const [newQuote, setNewQuote] = useState(null)

  const handleReview = async (event) => {
    event.preventDefault()
    const updatedBook = {
      ...book,
      review: review,
    }
    dispatch(tryBookUpdate(updatedBook, token))
    setEditReview(false)
    setQuoteAdding(false)
  }

  const handleNewQuote = async (event) => {
    event.preventDefault()
    dispatch(addQuoteToBook(book.id, newQuote, token))
    setQuoteAdding(false)
    setNewQuote(null)
  }

  const handleQuoteDelete = (id) => {
    let filteredQuotes = book.quotes
    for (let i = 0; i < filteredQuotes.length; i ++) {
      if (filteredQuotes[i].id === id) {
        filteredQuotes.splice(i, 1)
        break
      }
    }
    const updatedBook = {
      ...book,
      quotes: filteredQuotes
    }
    dispatch(tryBookUpdate(updatedBook, token))
  }

  return (
    <Tabs>
      <Tab eventKey="review" title="Review">
        {!editReview ?
          <Row className="pt-2">
            <Col xs={2} sm={1}>
              <Button variant="link" onClick={() => setEditReview(!editReview)}>Edit</Button>
            </Col>
            <Col xs={10} sm={11}>
              {review}
            </Col>
          </Row>
          :
          <Form onSubmit={handleReview} >
            <Form.Group>
              <Form.Control 
                as="textarea" 
                rows={10} 
                value={review} 
                onChange={e => setReview(e.target.value)} 
              />
            </Form.Group>
            <Button type="submit" className="mr-1">Save changes</Button>
            <Button variant="secondary" onClick={() => setEditReview(false)}>Cancel</Button> 
          </Form>
        }
      </Tab>
      <Tab eventKey="quotes" title="Quotes">
        {!quoteAdding ?
        <Row className="pt-2">
          <Col xs={12} sm={2}>
            <Button variant="link" onClick={() => setQuoteAdding(!quoteAdding)} >Add quote</Button>
          </Col>
          <Col xs={12} sm={10}>
            {book.quotes.map(quote => {
              return (
                <Row className="mb-3">
                  <Col key={quote.id}>
                    <Card >
                      <Card.Header>
                        <Row>
                          <Col className="pr-0 text-right">
                            <AiOutlineClose className="pointer" onClick={() => handleQuoteDelete(quote.id)} />
                          </Col>
                        </Row>
                      </Card.Header>
                      <Card.Body className="overflow-auto" >
                        <i> {quote.quote}</i>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              )
            })}
          </Col>
          </Row>
          :
          <Form onSubmit={handleNewQuote}>
            <Form.Group>
              <Form.Control 
                as="textarea" 
                rows={10} 
                onChange={e => setNewQuote(e.target.value)} 
              />
            </Form.Group>
            <Button type="submit" className="mr-1">Save quote</Button>
            <Button variant="secondary" onClick={() => setQuoteAdding(false)}>Cancel</Button>
          </Form>
        }
      </Tab>
      <Tab eventKey="options" title="Options">
        <Row>
          <Col className="pt-5 text-center">
            <Button variant="link" style={{ color: 'red' }} onClick={() => setShow(true)} >
              Delete Book
            </Button>
          </Col>
        </Row>
      </Tab>
    </Tabs>
  )
}

export default Review