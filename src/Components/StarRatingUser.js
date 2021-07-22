import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaStar } from 'react-icons/fa'
import { tryBookUpdate } from '../Reducers/userReducer'
import '../custom-css.css'

const StarRatingUser = ({ book }) => {
  // const book = useSelector(state => state.ownedBook.bookInfo)
  const dispatch = useDispatch()
  const token = useSelector(state => state.login.token)
  const [score, setScore] = useState(book.rating)
  const [paintedStars, setPaintedStars] = useState(book.rating)
  const stars = 5

  // useEffect(() => {
  //   setPaintedStars(book.rating)
  //   setScore(book.rating)
  // }, [book])

  const handleScore = (value) => {
    setScore(value)
    book.rating = value
    dispatch(tryBookUpdate(book, token))
  }

  return (
    <div>
      {[...Array(stars)].map((value, i) => {
        const currentScore = i + 1
        return (
          <FaStar 
            className="pointer" 
            key={i} 
            size={30} 
            color={paintedStars >= currentScore  ? 'orange' : 'gray'} 
            onClick={() => handleScore(currentScore)} 
            onMouseEnter={() => setPaintedStars(currentScore)}
            onMouseLeave={() => setPaintedStars(score)}
          />
        )
      })}
    </div>
  )
}

export default StarRatingUser