

const AllNames = ({persons, deletePerson}) => {
    return (
        persons.map(person =>
            <div key={person.id}>
           {person.name} {person.number}  <button onClick={() => deletePerson(person)}>Delete</button>  
            </div>
            )
    )
}


export default AllNames;