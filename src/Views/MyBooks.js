import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import '../custom-css.css'
import BookCard from '../Components/BookCard'
import Navigation from '../Components/NavBar'

const MyBooks = () => {
  const books = useSelector(state => state.login.user_books)
  const [sortedBooks, setSortedBooks] = useState([...books])

  useEffect(() => {
    sortDesc('rating')
  }, [books])

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
      <Row className="pb-3">
        {sortedBooks.map((book => {
          return (
            <Col sm={12} md={6} xl={4} className="pt-3" key={book.id} >
              <BookCard book={book} />
            </Col>
          )
        }))}
      </Row>
    </Container>
    </>
  )
}

export default MyBooks