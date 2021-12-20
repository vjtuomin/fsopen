import React from 'react'
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return(
    <div>
      <Part content={props.content1} exerc={props.exerc1}/>
      <Part content={props.content2} exerc={props.exerc2}/>
      <Part content={props.content3} exerc={props.exerc3}/>
    </div>
  )
}
const Total = (props) => {
  return(
    <div>
      <p>Number of exercises {props.count}</p>
    </div>
  )
}
const Part = (content) => {
  return(
    <div>
      <p>{content.content} {content.exerc} </p>
    </div>
  )
}


const App = () => {
  
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  

  return (
    <div>
      <Header course={course.name} />
      <Content content1={course.parts[0].name} exerc1={course.parts[0].exercises} content2={course.parts[1].name} exerc2={course.parts[1].exercises} content3={course.parts[2].name} exerc3={course.parts[2].exercises}/>
      <Total count={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
      </div>

     
  )
}

export default App