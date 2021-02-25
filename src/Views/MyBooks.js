import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Container, Table, Button } from 'react-bootstrap'
import '../custom-css.css'

const MyBooks = () => {
  const books = useSelector(state => state.login.user_books)
  const [sortedBooks, setSortedBooks] = useState([...books])

  const sortByTitle = () => {
    const kirjat = [...sortedBooks].sort((bookA, bookB) => {
      return bookA.title.localeCompare(bookB.title)
    })
    setSortedBooks(kirjat)
  }

  const sortByRating = () => {
    const kirjat = [...sortedBooks].sort((bookA, bookB) => {
      return bookB.rating - bookA.rating
    })
    setSortedBooks(kirjat)
  }

  return (
    <Container>
      <h1 className="pt-3 pb-5 text-center">My Library</h1>
      <Button onClick={sortByTitle}>Title</Button>
      <Button onClick={sortByRating}>Rating</Button>
      <Table bordered hover style={{overflowX: 'auto'}}>
        <thead>
          <tr>
            <th>Cover</th>
            <th>Title</th>
            <th>Author</th>
            <th>Stars</th>
          </tr>
        </thead>
        <tbody>
          {sortedBooks.map(book => {
            return (
              <tr>
                <td><img src={book.linkToCoverImage} alt="book cover"/></td>
                <td><b>{book.title}</b></td>
                <td><b>{book.author}</b></td>
                <td><b>{book.rating}</b></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default MyBooks