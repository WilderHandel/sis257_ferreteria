import Axios from 'axios'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ENDPOINT,
  headers: {
    'Content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTc0OTY2MDA0MiwiZXhwIjoxNzQ5NjYwMTAyfQ.m8t8wWZ6ulS7kbNWFvU2InLFQmduTurMlam8AdukaDc',
  },
})

export default axios
