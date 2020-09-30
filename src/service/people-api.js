import axios from 'axios'

const PeopleApi = {
  get: async (page) => {
    const baseUrl = `https://swapi.dev/api/people/?page=${page}`
    const response = await fetch(baseUrl)
    return response.json()
  }
}

export default PeopleApi
