import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Tabs, Tab, Form, Button, Card } from 'react-bootstrap'
import { tryBookUpdate, addQuoteToBook } from '../Reducers/userReducer'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'

const Review = () => {
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
    dispatch(setOwnedBookInfo(updatedBook))
    setEditReview(false)
    setQuoteAdding(false)
  }

  const handleNewQuote = async (event) => {
    event.preventDefault()
    dispatch(addQuoteToBook(book.id, newQuote, token))
    setQuoteAdding(false)
    setNewQuote(null)
  }

  return (
    <Tabs>
      <Tab eventKey="review" title="Review">
        {!editReview ?
          <Row className="pt-2">
            <Col>
              {review}
            </Col>
            <Button variant="link" onClick={() => setEditReview(!editReview)}>Edit</Button>
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
            {book.quotes.map(quote => {
              return (
                <Col key={quote.id}>
                  <Card>
                    <Card.Header>
                      <Button variant="link">Delete</Button>
                    </Card.Header>
                    <Card.Body>
                      {quote.quote}
                    </Card.Body>
                  </Card>
                </Col>
              )
            })}
            <Button variant="link" onClick={() => setQuoteAdding(!quoteAdding)} >Add quote</Button>
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
    </Tabs>
  )
}

export default Review