import React, { useState, useEffect } from 'react'
import AllNames from './components/AllNames'
import Filter from './components/Filter'
import NewPerson from './components/NewPerson'
import personService from './services/personService'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notif, setNotif] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
    .getAll()
    .then(persons => {
      console.log(persons)
      setPersons(persons);
    })
   
  }, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    const name = {
      name: newName,
      number: newNumber,
    }
  for(let i=0;i<persons.length;i++){
    if(persons[i].name === newName){
      const personOld = persons[i];
      const newPerson = {...personOld, number : newNumber}
      console.log(personOld)
      if(window.confirm(`${newName} already added. Replace the old number with a new one?`)){
        personService
        .updatePerson(personOld.id, newPerson)
        .then(response => {
          console.log(response)
          setPersons(persons.map(person => person.id !== personOld.id ? person : response ))
        })
        .catch(error => {
          setError(`Information of ${newName} already deleted, refresh the page`)
          setTimeout(() => {
            setError(null)
          }, 5000)
        })
      }
      return;
    }
     if(persons[i].number === newNumber){
      alert(`${newNumber} already added to the phonebook`);
      return;
    }

  }

    console.log('button clicked', event.target)
    
    personService
    .create(name)
      .then(returnedName => {
      setPersons(persons.concat(returnedName))
      setNewName('')
      setNewNumber('')
      setNotif(`${returnedName.name} added succesfully`);
      setTimeout(() => {
        setNotif(null)
      }, 5000)
    })
    .catch(error => {
      console.log(error.response.data)
      setError(error.response.data.error)
      setTimeout(() => {
        setError(null)
      }, 5000)
    })
  
  }
  const handleSearch = (event) => {
     personService
     .getAll()
     .then(persons => {
     setPersons( persons.filter(function(person) {
        return person.name.includes(event.target.value) ||
               person.number.includes(event.target.value);
     }))
    })
    
   
  }
  const deletePerson = person => {
    if(window.confirm(`Delete ${person.name} ?`)){
    personService
    .deletePerson(person.id)
     .then(
       setPersons(persons.filter(p => p.id !== person.id))
       
     )
     setNotif(`${person.name} deleted succesfully`);
     setTimeout(() => {
      setNotif(null)
    }, 5000)
    }
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notif}/>
      <Error message={error} />
      <Filter handleSearch={handleSearch}/>
      <h2>Add person</h2>
      <NewPerson newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addName={addName} />
      <h2>Numbers</h2>
      <AllNames persons={persons} deletePerson={deletePerson}/>
    </div>
  )

}

export default App