import React from 'react'
import { Media } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOwnedBookInfo } from '../Reducers/ownedBookReducer'

const OwnedBook = ({ info }) => {
  const dispatch = useDispatch()
  
  const setInfo = async () => {
    dispatch(setOwnedBookInfo(info))
  }
  
  return (
    <Media as="li" >
      <Link to={`/${info.title}`} onClick={setInfo} >
        <img src={info.linkToCoverImage} alt="info cover" />
      </Link>
      <Media.Body>
        <h5>{info.title}</h5>
        <h6>{info.author}</h6>
        <p>rating: {info.rating}/10</p>
      </Media.Body>
    </Media>
  )
}

export default OwnedBook