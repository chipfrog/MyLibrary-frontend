import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import Book from './Book'

const BookGrid = () => {
  const bookSearch = useSelector(state => state.bookSearch)

  let size = Object.keys(bookSearch.books).length
  let rows = []
  let rowCounter = 0
  let itemCounter = 0
  let rowKey = 0

  for (let i = 0; i < size; i ++) {
    if (!(itemCounter % 6)) {
      rowCounter ++
      rows[rowCounter] = []
    }

    if (bookSearch.books[i].volumeInfo.imageLinks !== undefined) {
      rows[rowCounter].push(bookSearch.books[i])
      itemCounter ++
    }
  }
  
  return (
    <Container fluid className="pt-3">
      {bookSearch.searching ?
        <div 
          style={{ 
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
          <Spinner animation="border" variant="info"  />
        </div>
        :
        <div>
          <h3 className="text-center pb-5">Search results for <i>"{bookSearch.filter}"</i></h3>
          {rows.map(row => {
            return (
              <Row className='text-center' key={rowKey ++}>
                {row.map(book => {
                  return (
                    <Col sm={6} md={4} lg={2} key={book.etag}>
                      <Book info={book} key={book.etag}/>
                    </Col>
                  )
                })}
              </Row>
            )
          })}
        </div>
      }
      {/* <h3 className="text-center pb-5">Search results for <i>"{bookSearch.filter}"</i></h3>
      {rows.map(row => {
        return (
        <Row className='text-center' key={rowKey ++}>
          {row.map(book => {
            return (
              <Col sm={6} md={4} lg={2} key={book.etag}>
                <Book info={book} key={book.etag}/>
              </Col>
            )
          })}
        </Row>
        )
      })} */}
    </Container>
  )
}

export default BookGrid