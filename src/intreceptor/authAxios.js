import axios from 'axios'

const AuthAxios = axios.create({
  baseURL: 'https://test.drprabhakarht.com/api/api/',
})

export default AuthAxios
