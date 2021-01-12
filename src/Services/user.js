import axios from 'axios'
const baseUrl = 'http://localhost:3001'

export const getUser = async (token) => {
  const bearerToken = `bearer ${token}`
  console.log(`token: ${bearerToken}`)

  const config = {
    headers: { Authorization: bearerToken }
  }
  const user = await axios.get(`${baseUrl}/api/user`, config)
  // console.log(`requested user: ${user.data}`)
  return user.data
}

export const createUser = async (userInfo) => {
  const user = await axios.post(`${baseUrl}/api/user`, userInfo)
  console.log(`User creation: ${user.data}`)
  return user.data
}