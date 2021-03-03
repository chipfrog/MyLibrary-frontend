import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table, Row, Col } from 'react-bootstrap'
import { FaSortNumericDown, FaSortNumericUpAlt, FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'
import '../custom-css.css'

const MyBooks = () => {
  const books = useSelector(state => state.login.user_books)
  const [sortType, setSortType] = useState('rating')
  const [asc, setAsc] = useState('rating')

  const [ratingAsc, setRatingAsc] = useState(true)
  const [titleAsc, setTitleAsc] = useState(true)
  const [authorAsc, setAuthorAsc] = useState(true)

  const dispatch = useDispatch()
  
  const setInfo = async (info) => {
    dispatch(setOwnedBookInfo(info))
  }

  useEffect(() => {
    const sortBooks = () => {
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
        books.sort((bookA, bookB) => {
          if (bookA[test] > bookB[test]) {
            return -1
          } else if (bookA[test] < bookB[test]) {
            return 1
          }
          return 0
        })
      } else {
        books.sort((bookA, bookB) => {
          if (bookB[test] > bookA[test]) {
            return -1
          } else if (bookB[test] < bookA[test]) {
            return 1
          }
          return 0
        })
      }
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
    <Container fluid className="bookshelf" >
      <Row >
        <Col xs={2} md={6}>
        <Table bordered hover className="taulukko">
        <thead bgcolor="#d1975c">
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
        <tbody bgcolor= "#edc9a4">
          {books.map(book => {
            return (
              <tr key={book.id}>
                <td>
                  <Link to={`/${book.title}`} onClick={() => setInfo(book)} >
                    <img src={book.linkToCoverImage} alt="book cover"/>
                  </Link>
                </td>
                <td className="align-middle"><b>{book.title}</b></td>
                <td className="align-middle"><b>{book.author}</b></td>
                <td className="align-middle"><b>{book.rating}</b></td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      </Col>
      </Row>
    </Container>
  )
}

export default MyBooks