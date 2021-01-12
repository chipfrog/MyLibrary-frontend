import { useSelector  } from 'react-redux'
import { Container, Media } from 'react-bootstrap'
import '../custom-css.css'

const MyBooks = () => {
  const books = useSelector(state => state.login.user_books)

  return (
    <Container >
      <h1 className="pt-3 pb-5 text-center">My Library</h1>
      {books.map(book => {
        return (
          <ul>
            <Media as="li" >
              <img src={book.linkToCoverImage} alt="book cover" />
              <Media.Body>
                <h5>{book.title}</h5>
                <h6>{book.author}</h6>
                <p>rating: {book.rating}/10</p>
              </Media.Body>
            </Media>
          </ul>
        )
      })}
    </Container>
  )
}

export default MyBooks