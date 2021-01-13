import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import OwnedBook from '../Components/OwnedBook'
import '../custom-css.css'

const MyBooks = () => {
  const books = useSelector(state => state.login.user_books)

  return (
    <Container >
      <h1 className="pt-3 pb-5 text-center">My Library</h1>
      {books.map(book => {
        return (
          <ul>
            <OwnedBook info={book} key={book.id} />
          </ul>
        )
      })}
    </Container>
  )
}

export default MyBooks