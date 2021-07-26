import { React, useEffect, useState } from 'react'
import { Container, Jumbotron, Row, Col, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBookFromLibrary, tryBookUpdate } from '../Reducers/userReducer'
import { Redirect } from 'react-router-dom'
import { TwitterPicker } from 'react-color'
import StarRatingUser from '../Components/StarRatingUser'
import Review from '../Components/Review'
import DeleteConfirmation from '../Components/DeleteConfirmation'
import '../custom-css.css'

const OwnedBookView = () => {
  const book = useSelector(state => state.ownedBook.bookInfo)
  const token = useSelector(state => state.login.token)
  const [bookRead, setBookRead] = useState(() => book === null ? null : book.read)
  const [bookOwned, setBookOwned] = useState(() => book === null ? null : book.owned)
  const [show, setShow] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [color, setColor] = useState('yellow')
  const dispatch = useDispatch()

  useEffect(() => {
    if (book !== null) {
      setBookRead(book.read)
      setBookOwned(book.owned)
    }
  }, [book])

  const handleDelete = async () => {
    dispatch(deleteBookFromLibrary(book.id, token))
    setShow(false)
  }

  const handleRead = () => {
    const updatedBook = {
      ...book,
      read: !book.read
    }
    setBookRead(!book.read)
    dispatch(tryBookUpdate(updatedBook, token))
  }

  const handleOwned = () => {
    const updatedBook = {
      ...book,
      owned: !book.owned
    }
    setBookOwned(!book.owned)
    dispatch(tryBookUpdate(updatedBook, token))
  }

  if (book === null) {
    return (
      <Redirect to='/' />
    )
  }

  const handleColorOpen = () => {
    setOpenColor(!openColor)
  }

  const jumboColor = {
    'background-color': color,
    'transition': 'ease all 300ms'
  }
 
  return (
    <>
    <Jumbotron fluid style={jumboColor} >
      <Container className="jumbo">
        <Row>
          <Col xs={7}>
            <h1>{book.title}</h1>
            <h5><i>{book.author}</i></h5>
            <StarRatingUser book={book} />
            <Form className="pt-3">
              <Form.Check
                inline 
                type="checkbox"
                id="read"
                label="Read"
                checked={bookRead}
                onChange={handleRead}
              />
              <Form.Check
                inline 
                type="checkbox"
                id="owned"
                label="Owned"
                checked={bookOwned}
                onChange={handleOwned}
              />
            </Form>
          </Col>
          <Col xs={5} >
            <img src={book.linkToCoverImage} alt="cover"/>
          </Col>
        </Row>
        <span className="float-right" >
          {openColor && 
            <TwitterPicker 
              color={color}
              onChangeComplete={(color) => setColor(color.hex)}
            />
          }
        </span>
      </Container>
    </Jumbotron>
    <Container>
      <DeleteConfirmation show={show} setShow={setShow} book={book} handleDelete={handleDelete} />
      <Row>
        <Col xs={9} >
          <Review setShow={setShow} handleColorOpen={handleColorOpen} />
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default OwnedBookView