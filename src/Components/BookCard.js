import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import StarRatingUser from './StarRatingUser'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'
import { FaArchive, FaBook } from 'react-icons/fa'

const BookCard = ({ book, targetPageTop }) => {
  const dispatch = useDispatch()
  
  const handleClick = async (info) => {
    dispatch(setOwnedBookInfo(info))
    targetPageTop()
  }

  return (
    <Card className="h-100 w-100">
      <Card.Body className="genre">
        <Row>
          <Col className="pr-0">
            <Link id="book_cover" to={`/${book.title}`} onClick={() => handleClick(book)} >
              <img src={book.linkToCoverImage} alt="book cover"/>
            </Link>
          </Col>
          <Col className="pl-0">
            <Row>
              <h5>{book.title}</h5>
            </Row>
            <Row>
              <h6 className="text-muted" ><i>by {book.author}</i></h6>
            </Row>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col className="text-muted" >
            Date added: {new Date(book.date).toLocaleString().split(',')[0]}
          </Col> 
        </Row>
        <Row className="mb-1" >
          <Col className="text-left" style={{color: 'green'}} >
            {book.read &&  <FaBook className="mr-1" />}
            {book.owned && <FaArchive/> }
          </Col>
          <Col className="text-right" >
            <StarRatingUser book={book} />
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default BookCard