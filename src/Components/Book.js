import React from 'react'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setBookInfo } from '../Reducers/bookInfoReducer'

const Book = ({ info }) => {
  const dispatch = useDispatch()
  
  const setInfo = async () => {
    dispatch(setBookInfo(info))
  }

    return (
      <p>
        <Link to={`/search/${info.etag}`}>
          <Image src={info.volumeInfo.imageLinks.thumbnail} onClick={() => setInfo()} />
        </Link>
      </p>
    )
}

export default Book