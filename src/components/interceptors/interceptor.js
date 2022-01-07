import axios from 'axios'

// const baseURL = process.env.NODE_ENV
// ? ''
// : 'http://localhost:4000/';

const baseURL = 'http://18.222.213.104:5000/'

const authAxios = axios.create({
  baseURL,
})

export default authAxios