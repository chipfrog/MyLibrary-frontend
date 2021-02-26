import axios from 'axios'

export const getBooks = async (filter) => {
  const result = await axios.get(`/api/googlebooks/${filter}`)
  console.log(result.data)
  return result.data
}

export const updateBook = async (bookInfo, token) => {
  const bearerToken = `bearer ${token}`

  const config = {
    headers: { Authorization: bearerToken }
  }

  const bookData = {
    id: bookInfo.id,
    review: bookInfo.review,
    rating: bookInfo.rating,
    read: bookInfo.read,
    quotes: bookInfo.quotes
  }

  const response = await axios.put(`/api/googleBooks/edit`, bookData, config)
  console.log(response)

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

  const response = await axios.post(`/api/googlebooks`, bookData, config)
  console.log(`Lisätty kirja: ${response.data.title}`)
  return response
}




