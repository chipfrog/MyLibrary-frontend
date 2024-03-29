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

  const [owned, setOwned] = useState(false)
  const [read, setRead] = useState(false)
  const [notOwned, setNotOwned] = useState(false)
  const [unread, setUnread] = useState(false)
  
  const topRef = useRef()
  const bottomRef = useRef()

  const types = {
    title: 'title',
    author: 'author',
    rating: 'rating'
  }

  const fields = {
    read: 'read',
    owned: 'owned'  
  }

  useEffect(() => {
    sortDesc('rating', books)
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

  const sortDesc= (field, booksToBeSorted) => {
    let tempArr = [...sortedBooks]
    if (booksToBeSorted !== undefined) {
      tempArr = [...booksToBeSorted]
    }
    const type = types[field]
    tempArr.sort((bookA, bookB) => {
      let bookFieldA = bookA[type]
      let bookFieldB = bookB[type]

      if (type === 'author') {
        bookFieldA = getSurname(bookA)
        bookFieldB = getSurname(bookB)
      }
      if (bookFieldA > bookFieldB) {
        return -1
      } else if (bookFieldA < bookFieldB) {
        return 1
      }
      return 0
    })
    setSortedBooks(tempArr)
  }

  const sortAsc = (field, booksToBeSorted) => {
    let tempArr = [...sortedBooks]
    if (booksToBeSorted !== undefined) {
      tempArr = [...booksToBeSorted]
    }
    const type = types[field]
    tempArr.sort((bookA, bookB) => {
      let bookFieldA = bookA[type]
      let bookFieldB = bookB[type]

      if (type === 'author') {
        bookFieldA = getSurname(bookA)
        bookFieldB = getSurname(bookB)
      }
      if (bookFieldA > bookFieldB) {
        return 1
      } else if (bookFieldA < bookFieldB) {
        return -1
      }
      return 0
    })
    setSortedBooks(tempArr)
  }

  const getSurname = (book) => {
    const stringArr = book.author.split(" ")
    const surname = stringArr[stringArr.length - 1]
    return surname
  }

  const filterBooks = (owned, read, notOwned, unread, currentSort) => {
    let tempArr = [...books]
    if (owned) tempArr = conditionalFilter(true, 'owned', tempArr)
    if (read) tempArr = conditionalFilter (true, 'read', tempArr)
    if (notOwned) tempArr = conditionalFilter (false, 'owned', tempArr)
    if (unread) tempArr = conditionalFilter (false, 'read', tempArr)

    switch (currentSort) {
      case 'Rating Desc':
        sortDesc('rating', tempArr)
        break
      case 'Rating Asc':
        sortAsc('rating', tempArr)
        break
      case 'Title Asc':
        sortAsc('title', tempArr)
        break
      case 'Title Desc':
        sortDesc('title', tempArr)
        break
      case 'Author Asc':
        sortAsc('author', tempArr)
        break
      case 'Author Desc':
        sortDesc('author', tempArr)
        break      
      default: 
        break  
    }
  }

  const conditionalFilter = (trueOrFalse, condition, array) => {
    let tempArr = []
    const field = fields[condition]
    if (trueOrFalse) {
      for (let i = 0; i < array.length; i ++) {
        if (array[i][field]) tempArr.push(array[i])
      }
      return tempArr
    }
    for (let i = 0; i < array.length; i ++) {
      if (!array[i][field]) tempArr.push(array[i])
    }
    return tempArr
  }

  return (
    <Container fluid className="bookshelf" >
      <div ref={topRef}></div>
      <Navigation 
        showSort={true} 
        sortDesc={sortDesc} 
        sortAsc={sortAsc} 
        filterBooks={filterBooks}
        read={read}
        setRead={setRead}
        unread={unread}
        setUnread={setUnread}
        owned={owned}
        setOwned={setOwned}
        notOwned={notOwned}
        setNotOwned={setNotOwned}
      />
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
  
  )
}

export default MyBooks