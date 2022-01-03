const Total = ({ course }) => {
    const exerc = course.parts.map(part => part.exercises)
    
    const sum = exerc.reduce( (s, p) => {
      return s + p;
    })
    
    return(
      <p>Number of exercises {sum}</p>
    ) 
    
  }



  export default Total;
   