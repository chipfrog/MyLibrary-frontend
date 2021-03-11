import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table, Row, Col } from 'react-bootstrap'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'
import '../custom-css.css'
import BookCard from '../Components/BookCard'

const MyBooks = () => {
  const books = useSelector(state => state.login.user_books)
  const [sortType, setSortType] = useState('rating')
  const [asc, setAsc] = useState('rating')

  const [ratingAsc, setRatingAsc] = useState(true)
  const [titleAsc, setTitleAsc] = useState(true)
  const [authorAsc, setAuthorAsc] = useState(true)

  // const dispatch = useDispatch()
  
  // const setInfo = async (info) => {
  //   dispatch(setOwnedBookInfo(info))
  // }

  // useEffect(() => {
  //   const sortBooks = () => {
  //     const sortTypes = {
  //       title: 'title',
  //       author: 'author',
  //       rating: 'rating'
  //     }

  //     const ascTypes = {
  //       title: titleAsc,
  //       author: authorAsc,
  //       rating: ratingAsc
  //     }

  //     const test = sortTypes[sortType]
  //     const ascBy = ascTypes[asc]
  //     if (ascBy) {
  //       books.sort((bookA, bookB) => {
  //         if (bookA[test] > bookB[test]) {
  //           return -1
  //         } else if (bookA[test] < bookB[test]) {
  //           return 1
  //         }
  //         return 0
  //       })
  //     } else {
  //       books.sort((bookA, bookB) => {
  //         if (bookB[test] > bookA[test]) {
  //           return -1
  //         } else if (bookB[test] < bookA[test]) {
  //           return 1
  //         }
  //         return 0
  //       })
  //     }
  //   }
  //   sortBooks()
  // }, [sortType, ratingAsc, titleAsc, authorAsc, books])

  const handleSortType = (type) => {
    setAsc(type)
    setSortType(type)
    handleAscType(type)
  }

  const handleAscType = (type) => {
    switch(type) {
      case 'rating':
        setRatingAsc(!ratingAsc)
        break
      case 'title':
        setTitleAsc(!titleAsc)
        break
      case 'author':
        setAuthorAsc(!authorAsc)
        break    
      default:
        break
    }
  }

  return (
    <Container fluid className="bookshelf" >
      <Row className="pb-3">
        {books.map((book => {
          return (
            <Col sm={12} md={6} xl={4} className="pt-3">
              <BookCard book={book} />
            </Col>
          )
        }))}
      </Row>
    </Container>
  )
}

export default MyBooks