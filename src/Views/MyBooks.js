import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import '../custom-css.css'
import BookCard from '../Components/BookCard'
import Navigation from '../Components/Navigation'
import Notification from '../Components/Notification'
import { resetLibraryView } from '../Reducers/libraryReducer'

const MyBooks = () => {
  const dispatch = useDispatch()
  const books = useSelector(state => state.login.user_books)
  const targetedBook = useSelector(state => state.library)
  const [sortedBooks, setSortedBooks] = useState([...books])
  const [showAlert, setShowAlert] = useState(false)
  const bottomRef = useRef()

  useEffect(() => {
    sortDesc('rating')
    highlightBook()
  }, [books, targetedBook])

  const highlightBook = () => {
    if (bottomRef.current !== undefined && targetedBook.scrollToBottom === true) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      dispatch(resetLibraryView())
      setShowAlert(true)
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
    
    <Container fluid className="bookshelf" >
      <Navigation showSort={true} sortDesc={sortDesc} sortAsc={sortAsc} />
      <Row>
        {showAlert === true &&
          <Notification setShowAlert={setShowAlert} />
        }
      </Row>
      <Row  className="library">
        {sortedBooks.map((book => {
          return (
            <Col sm={12} md={6} xl={4} className="pt-3" key={book.id} >
              <BookCard book={book} />
            </Col>
          )
        }))}
      </Row>
      <div ref={bottomRef}>
      </div>
    </Container>
    </>
  )
}

export default MyBooks