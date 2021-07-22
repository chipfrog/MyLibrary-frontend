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
  const targetedView = useSelector(state => state.library)
  const [sortedBooks, setSortedBooks] = useState([...books])
  const [showAlert, setShowAlert] = useState(false)
  const topRef = useRef()
  const bottomRef = useRef()

  useEffect(() => {
    sortDesc('rating')
    targetAddedBook()
  }, [books, targetedView])

  const targetAddedBook = () => {
    if (bottomRef.current !== undefined && targetedView.scrollToBottom === true) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      dispatch(resetLibraryView())
      setShowAlert(true)
    }
  }

  const targetTopRef = () => {
    if (topRef.current !== (undefined || null ) && !targetedView.scrollToBottom) {
      topRef.current.scrollIntoView()
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
      <div ref={topRef}></div>
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
              <BookCard book={book} targetPageTop={targetTopRef}  />
            </Col>
          )
        }))}
      </Row>
      <div ref={bottomRef}></div>
    </Container>
    </>
  )
}

export default MyBooks