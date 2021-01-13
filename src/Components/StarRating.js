import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'
import '../custom-css.css'

const StarRating = ({ rating }) => {
  const [score, setScore] = useState(rating)

  const handleScore = (value) => {
    setScore(value)
  }

  return (
    <div>
      {[...Array(10)].map((value, i) => {
        const currentScore = i + 1
        return (
          <FaStar className="star" size={30} color={score >= currentScore ? 'orange' : 'gray'} onClick={() => handleScore(currentScore)} key={i} />
        )
      })}
    </div>
  )
}

export default StarRating