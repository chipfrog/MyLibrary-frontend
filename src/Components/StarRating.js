import { FaStar } from 'react-icons/fa'
import { FaStarHalfAlt } from 'react-icons/fa' 


const StarRating = ({ avgRating }) => {
  console.log(`saatu rating: ${avgRating}`)
  const isOddNumber = (number) => {
    if (number % 2 === 1) {
      return true
    }
    return false
  }
  let rating = avgRating
  
  if (isOddNumber(rating / 0.5 )) {
    const halfStarIndex = rating - 0.5

    return (
      <div>
        {[...Array(5)].map((value, i) => {
          if (i === halfStarIndex ) {
            console.log(`tässä puolikas: ${i} `)
            return (
              <FaStarHalfAlt 
              key={i}
              size={30}
              color={'orange'}
            />
            )
          }
          return (
            <FaStar 
              key={i} 
              size={30}
              color={halfStarIndex > i ? 'orange' : 'gray'}
            />
          )
        })}
      </div>
    )
  }
  return (
    <div>
      {[...Array(5)].map((value, i) => {
        return (
          <FaStar 
            key={i} 
            size={30}
            color={i < rating ? 'orange' : 'gray'}
          />
        )
      })}
    </div>
  )
}

export default StarRating