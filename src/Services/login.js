import axios from 'axios'
const baseUrl = 'http://localhost:3001'

export const login = async (credentials) => {
  const res = await axios.post(`${baseUrl}/api/login`, credentials)
  return res.data
}

