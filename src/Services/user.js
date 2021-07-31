import axios from 'axios'

export const getUser = async (token) => {
  const bearerToken = `bearer ${token}`

  const config = {
    headers: { Authorization: bearerToken }
  }
  const user = await axios.get(`/api/user`, config)
  return user.data
}

export const createUser = async (userInfo) => {
  const user = await axios.post(`/api/user`, userInfo)
  return user.data
}

export const deleteUser = async (token) => {
  const bearerToken = `bearer ${token}`

  const config = {
    headers: { Authorization: bearerToken }
  }
  const response = await axios.delete(`/api/user/delete`, { data: { config } })
  console.log(response)
}