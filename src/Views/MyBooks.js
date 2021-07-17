import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import '../custom-css.css'
import BookCard from '../Components/BookCard'
import Navigation from '../Components/NavBar'
import Notification from '../Components/Notification'
import { resetLibraryView } from '../Reducers/libraryReducer'

const MyBooks = () => {
  const dispatch = useDispatch()
  const books = useSelector(state => state.login.user_books)
  const targetedBook = useSelector(state => state.library)
  const [sortedBooks, setSortedBooks] = useState([...books])
  const bottomRef = useRef()

  useEffect(() => {
    sortDesc('rating')
    highlightBook()
  }, [books, targetedBook])

  const highlightBook = () => {
    if (bottomRef.current !== undefined && targetedBook.scrollToBottom === true) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      dispatch(resetLibraryView())
    }
  }

  const types = {
    title: 'title',
    author: 'author',
    rating: 'rating'
  }

  const sortDesc= (field) => {
    const type = types[field]
    const tempArr = [...books]
    tempArr.sort((bookA, bookB) => {
      if (bookA[type] > bookB[type]) {
        return -1
      } else if (bookA[type] < bookB[type]) {
        return 1
      }
      return 0
    })
    setSortedBooks(tempArr)
  }

  const sortAsc = (field) => {
    const type = types[field]
    const tempArr = [...books]
    tempArr.sort((bookA, bookB) => {
      if (bookA[type] > bookB[type]) {
        return 1
      } else if (bookA[type] < bookB[type]) {
        return -1
      }
      return 0
    })
    setSortedBooks(tempArr)
  }

  return (
    <>
    <Navigation showSort={true} sortDesc={sortDesc} sortAsc={sortAsc} />
    <Container fluid className="bookshelf" >
      <Row>
        <Notification/>
      </Row>
      <Row className="pb-3">
        {sortedBooks.map((book => {
          return (
            <Col sm={12} md={6} xl={4} className="pt-3" key={book.id} >
              <BookCard book={book} />
            </Col>
          )
        }))}
      </Row>
      <Row>
        <h1 ref={bottomRef} >Tänne!</h1>
      </Row>
    </Container>
    </>
  )
}

export default MyBooks