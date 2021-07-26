import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Tabs, Tab, Form, Button, Card, Container } from 'react-bootstrap'
import { tryBookUpdate, addQuoteToBook } from '../Reducers/userReducer'
import { AiOutlineClose } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
import Category from './Category'

const Review = ({ setShow, handleColorOpen }) => {
  const book = useSelector(state => state.ownedBook.bookInfo)
  const token = useSelector(state => state.login.token)
  
  const [review, setReview] = useState(book.review)
  const [editReview, setEditReview] = useState(false)
  const [quoteAdding, setQuoteAdding] = useState(false)
  const [newQuote, setNewQuote] = useState(null)
  const [categoryAdding, setCategoryAdding] = useState(false)
  const [newCategory, setNewCategory] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    setReview(book.review)
  }, [book])

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

  const handleQuoteDelete = async (id) => {
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

  const handleNewCategory = async (event) => {
    event.preventDefault()
    const updatedBook = {
      ...book,
      categories: book.categories.concat(newCategory)
    }
    dispatch(tryBookUpdate(updatedBook, token))
    setCategoryAdding(false)
    setNewCategory(null)
  }

  const handleCategoryDelete = async (category) => {
    let filteredCategories = book.categories
    for (let i = 0; i < filteredCategories.length; i ++) {
      if (filteredCategories[i] === category) {
        filteredCategories.splice(i, 1)
        break
      }
    }
    const updatedBook = {
      ...book,
      categories: filteredCategories
    }
    dispatch(tryBookUpdate(updatedBook, token))
  }


  return (
    <Tabs>
      <Tab eventKey="review" title="Review">
        {!editReview ?
          <Row className="pt-3">
            <Col xs={12} sm={2}>
              <Button variant="link" onClick={() => setEditReview(!editReview)}>Edit</Button>
            </Col>
            <Col xs={12} sm={10}>
              {review}
            </Col>
          </Row>
          :
          <Row className="pt-3">
            <Col sm={12} md={2}>
              <Button variant="secondary" onClick={() => setEditReview(!editReview)}>Cancel</Button>
            </Col>
            <Col sm={12} md={10} >
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
              </Form>
            </Col>
          </Row>
        }
      </Tab>
      <Tab eventKey="quotes" title="Quotes">
        {!quoteAdding ?
        <Row className="pt-3">
          <Col xs={12} sm={2}>
            <Button variant="link" onClick={() => setQuoteAdding(!quoteAdding)} >
              <FaPlus size={35} />
            </Button>
          </Col>
          <Col xs={12} sm={10}>
            {book.quotes.map(quote => {
              return (
                <Row className="mb-3 mt-3">
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
          <Row className="pt-3">
            <Col sm={12} md={2} >
              <Button variant="secondary" onClick={() => setQuoteAdding(!quoteAdding)}>Cancel</Button>
            </Col>
            <Col sm={12} md={10} >
              <Form onSubmit={handleNewQuote}>
                <Form.Group>
                  <Form.Control 
                    as="textarea" 
                    rows={8} 
                    onChange={e => setNewQuote(e.target.value)} 
                    placeholder="Write your quote here."
                  />
                </Form.Group>
                <Button type="submit" className="mr-1">Save quote</Button>
              </Form>
            </Col>
          </Row>
        }
      </Tab>
      <Tab eventKey="categories" title="Categories" >
        {!categoryAdding ?
        <Row className="pt-3">
          <Col xs={12} sm={2}>
            <Button variant="link" onClick={() => setCategoryAdding(!categoryAdding)} >
              <FaPlus size={35} />
            </Button>
          </Col>
          <Col xs={12} sm={10} className='mt-3' >
            <Container>
              <Row>
                {book.categories.map(category => {
                  return (
                    <Category key={category} name={category} handleCategoryDelete={() => handleCategoryDelete(category)} owned={true} />
                  )
                })}
              </Row>
            </Container>
          </Col>
        </Row>
        :
        <Row className="pt-3">
          <Col sm={12} md={2} >
            <Button variant="secondary" onClick={() => setCategoryAdding(!categoryAdding)}>Cancel</Button>
          </Col>
          <Col sm={12} md={10} >
            <Form onSubmit={handleNewCategory} >
              <Form.Group>
                <Form.Control 
                  type="input"
                  onChange={e => setNewCategory(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" className="mr-1">Save category</Button>
            </Form>
          </Col>
        </Row>
        }  
      </Tab>
      <Tab eventKey="options" title="Options">
        <Row>
          <Col>
            <Button variant="link" onClick={() => handleColorOpen()} >
              Change background color
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
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