import axios from 'axios'

export const getUser = async (token) => {
  const bearerToken = `bearer ${token}`
  console.log(`token: ${bearerToken}`)

  const config = {
    headers: { Authorization: bearerToken }
  }
  const user = await axios.get(`/api/user`, config)
  return user.data
}

export const createUser = async (userInfo) => {
  const user = await axios.post(`/api/user`, userInfo)
  console.log(`User creation: ${user.data}`)
  return user.data
}

export const deleteUser = async (token) => {
  const bearerToken = `bearer ${token}`
  console.log('poisto frontissa')
  console.log(bearerToken)

  const config = {
    headers: { Authorization: bearerToken }
  }
  const response = await axios.delete(`/api/user/delete`, { data: { config } })
  console.log(response)
}