import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Tabs, Tab, Form, Button } from 'react-bootstrap'
import { tryBookUpdate } from '../Reducers/userReducer'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'

const Review = ({ book }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.login.token)
  const [editReview, setEditReview] = useState(false)
  const [review, setReview] = useState(book.review)
  const [quotes, setQuotes] = useState(book.quotes)

  const handleBookUpdate = async (event) => {
    event.preventDefault()
    console.log('updating...')
    const updatedBook = {
      ...book,
      review: review,
      quotes: quotes
    }
    console.log(updatedBook)
    dispatch(tryBookUpdate(updatedBook, token))
    dispatch(setOwnedBookInfo(updatedBook))
    setEditReview(false)
  }

  return (
    <Tabs>
      <Tab eventKey="review" title="Review">
        {!editReview ?
          <Row>
            <Col>
              {review}
            </Col>
            <Button variant="link" onClick={() => setEditReview(!editReview)}>Edit</Button>
          </Row>

          :
          <Form onSubmit={handleBookUpdate} >
            <Form.Group>
              <Form.Control 
                as="textarea" 
                rows={10} 
                value={review} 
                onChange={e => setReview(e.target.value)} 
              />
            </Form.Group>
              <Button type="submit" className="mr-1">Save changes</Button>
              <Button variant="secondary" onClick={() => setEditReview(false)} >Cancel</Button> 
          </Form>
        }
      </Tab>
      <Tab eventKey="quotes" title="Quotes">
        These are the quotes
      </Tab>
    </Tabs>
  )
}

export default Review