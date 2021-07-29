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
  const [currentSorting, setCurrentSorting] = useState('ratingDesc')
  
  const topRef = useRef()
  const bottomRef = useRef()
  
  const types = {
    title: 'title',
    author: 'author',
    rating: 'rating'
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
    const tempArr = [...sortedBooks]
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

  const sortTypes = {
    ratingDesc: () => sortDesc('rating'),
    ratingAsc: () => sortAsc('rating'),
    titleAsc: () => sortAsc('title'),
    titleDesc: () => sortDesc('title'),
    authorAsc: () => sortAsc('author'),
    authorDesc: () => sortDesc('author')

  }


  const filterBooks = (owned, read, notOwned, unread) => {
    
    let tempArr = [...books]
    if (owned) tempArr = filterOwned(tempArr)
    if (read) tempArr = filterRead(tempArr)
    if (notOwned) tempArr = filterNotOwned(tempArr)
    if (unread) tempArr = filterUnread(tempArr)
    sortTypes[currentSorting](tempArr)

    console.log(tempArr)
    //setSortedBooks(tempArr)

  }

  const filterOwned = (array) => {
    let tempArr = []
    for (let i=0; i < array.length; i ++) {
      if (array[i].owned) {
        tempArr.push(array[i])
      }
    }
    return tempArr
  }

  const filterRead = (array) => {
    let tempArr = []
    for (let i=0; i < array.length; i ++) {
      if (array[i].read) {
        tempArr.push(array[i])
      }
    }
    return tempArr
  }

  const filterNotOwned = (array) => {
    let tempArr = []
    for (let i=0; i < array.length; i ++) {
      if (!array[i].owned) {
        tempArr.push(array[i])
      }
    }
    return tempArr
  }

  const filterUnread = (array) => {
    let tempArr = []
    for (let i=0; i < array.length; i ++) {
      if (!array[i].read) {
        tempArr.push(array[i])
      }
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
        currentSorting={currentSorting}
        setCurrentSorting={setCurrentSorting}
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