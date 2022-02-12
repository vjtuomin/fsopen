import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
 return axios.delete(`${baseUrl}/${id}`)
 
  
}

const updatePerson = (id,person) => {
  console.log(id)
  const request = axios.put(`${baseUrl}/${id}`, person)
  return request.then(response => response.data)
}



export default { 
  getAll: getAll, 
  create: create,
  deletePerson: deletePerson, 
  updatePerson: updatePerson,
}