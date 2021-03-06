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
    owned: bookInfo.owned,
    quotes: bookInfo.quotes
  }
  const response = await axios.put(`/api/googleBooks/edit`, bookData, config)
  return response
}

export const addQuote = async (id, quote, token) => {
  const bearerToken = `bearer ${token}`
  const config = {
    headers: { Authorization: bearerToken }
  }
  const data = {
    book_id: id,
    quote: quote
  }

  const response = await axios.post(`/api/googleBooks/addquote`, data, config)
  return response

}

export const addBook = async (bookInfo, token) => {
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

export const deleteBook = async (id, token) => {
  const bearerToken = `bearer ${token}`

  const config = {
    headers: { Authorization: bearerToken }
  }
  const response = await axios.delete(`/api/googlebooks/delete`, { data: { config, id } })
  console.log(response)
}




