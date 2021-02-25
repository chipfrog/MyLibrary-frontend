import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Container, Table, Button, Row, Col } from 'react-bootstrap'
import { FaSortNumericDown, FaSortNumericUpAlt, FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa'
import '../custom-css.css'

const MyBooks = () => {
  const books = useSelector(state => state.login.user_books)
  const [sortedBooks, setSortedBooks] = useState([...books])
  const [sortType, setSortType] = useState('rating')
  const [asc, setAsc] = useState('rating')

  const [ratingAsc, setRatingAsc] = useState(true)
  const [titleAsc, setTitleAsc] = useState(true)
  const [authorAsc, setAuthorAsc] = useState(true)

  useEffect(() => {
    const sortBooks = () => {
      let kirjat = []
      
      const sortTypes = {
        title: 'title',
        author: 'author',
        rating: 'rating'
      }

      const ascTypes = {
        title: titleAsc,
        author: authorAsc,
        rating: ratingAsc
      }

      const test = sortTypes[sortType]
      const ascBy = ascTypes[asc]
      if (ascBy) {
        kirjat = [...sortedBooks].sort((bookA, bookB) => {
          if (bookA[test] > bookB[test]) {
            return -1
          } else if (bookA[test] < bookB[test]) {
            return 1
          }
          return 0
        })
      } else {
        kirjat = [...sortedBooks].sort((bookA, bookB) => {
          if (bookB[test] > bookA[test]) {
            return -1
          } else if (bookB[test] < bookA[test]) {
            return 1
          }
          return 0
        })
      }
      setSortedBooks(kirjat)
    }
    sortBooks()
  }, [sortType, ratingAsc, titleAsc, authorAsc])

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
    <Container>
      <h1 className="pt-3 pb-5 text-center">My Library</h1>
      <Table bordered hover >
        <thead>
          <tr>
            <th>Cover</th>
            <th>
              <Row>
                <Col xs={10}>
                  Title
                </Col>
                <Col xs={2}>
                  {titleAsc ?
                    <FaSortAlphaDown 
                      className="sortIcon"
                      onClick={() => handleSortType('title')}
                    />
                    :
                    <FaSortAlphaUpAlt 
                      className="sortIcon"
                      onClick={() => handleSortType('title')}
                    />
                }
                </Col>
              </Row>   
            </th>
            <th>
              <Row>
                <Col xs={10}>
                  Author
                </Col>
                <Col xs={2}>
                  {authorAsc ?
                    <FaSortAlphaDown 
                      className="sortIcon"
                      onClick={() => handleSortType('author')}
                    />
                    :
                    <FaSortAlphaUpAlt 
                      className="sortIcon"
                      onClick={() => handleSortType('author')}
                    />
                  }
                </Col>
              </Row>  
            </th>
            <th>
              <Row>
                <Col xs={9}>
                  Stars
                </Col>
                <Col xs={1}>
                  {ratingAsc ? 
                    <FaSortNumericDown 
                      className="sortIcon" 
                      onClick={() => handleSortType('rating')}
                    />
                    :
                    <FaSortNumericUpAlt 
                      className="sortIcon" 
                      onClick={() => handleSortType('rating')}
                    />
                  }
                </Col>
              </Row>
            </th>
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