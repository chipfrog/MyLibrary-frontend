import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import StarRatingUser from './StarRatingUser'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'

const BookCard = ({ book, targetPageTop }) => {
  const dispatch = useDispatch()

  // const setInfo = (info) => {
  //   console.log('setting info')
  //   console.log(info)
  //   dispatch(setOwnedBookInfo(info))
  // }
  
  const handleClick = (info) => {
    dispatch(setOwnedBookInfo(info))
    targetPageTop()
  }

  return (
    <Card className="h-100 w-100">
      <Card.Body className="genre">
        <Row>
          <Col className="pr-0">
            <Link to={`/${book.title}`} onClick={() => handleClick(book)} >
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
        <Row className="float-right pr-2">
          <StarRatingUser book={book} />
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default BookCard