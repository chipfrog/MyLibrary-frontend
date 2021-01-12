import axios from 'axios'
const baseUrl = 'http://localhost:3001'

export const getBooks = async (filter) => {
  const result = await axios.get(`${baseUrl}/api/googlebooks/${filter}`)
  console.log(result.data)
  return result.data
}

export const addBook = async ( bookInfo, token ) => {
  const bearerToken = `bearer ${token}`

  const config = {
    headers: { Authorization: bearerToken }
  }

  const bookData = {
    title: bookInfo.volumeInfo.title,
    author: bookInfo.volumeInfo.authors[0],
    linkToCoverImage: bookInfo.volumeInfo.imageLinks.thumbnail,
    review: bookInfo.review,
    rating: bookInfo.rating,
    read: bookInfo.read,
    quotes: bookInfo.quotes

  }

  const response = await axios.post(`${baseUrl}/api/googlebooks`, bookData, config)
  console.log(response)
}




