import React, { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const Statistics = (props) => {
  if(props.all === 0){
    return(
      <div>
        <h1>Statistics</h1>
       <p> No feedback given </p>
      </div>

    )
  }

  return(
   
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
          <tr>
        <StatisticsLine text="good" value={props.good}/>
        </tr>
        <tr>
        <StatisticsLine text="bad" value={props.bad}/>
        </tr>
        <tr>
        <StatisticsLine text="neutral" value={props.neutral}/>
        </tr>
        <tr>
        <StatisticsLine text="all" value={props.all}/>
        </tr>
        <tr>
        <StatisticsLine text="avg" value={props.avg}/>
        </tr>
        <tr>
        <StatisticsLine text="positive" value={props.positive}/>
        </tr>
        </tbody>
        </table>
        </div>
    
  )
  
}
const StatisticsLine = (props) => {
  return(
    
     <th>{props.text} {props.value}</th>
   
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  const handleNeutral = () => {
     setNeutral(neutral + 1);
    
  } 
  const handleGood = () => {
    setGood(good + 1);
 } 
 const handleBad = () => {
  setBad(bad + 1);
} 

const all = () => {
 return good + bad + neutral;
}
const avg = () => {
  let x = good -bad
  return x/all();
}
const positive = () => {
  return good/all(); 
}

  return (
    <div>
      <h1>Give feedback </h1>
      <Button
        handleClick={handleGood}
        text='good'
      />
     <Button
        handleClick={handleNeutral}
        text='neutral'
      />
      <Button
        handleClick={handleBad}
        text='bad'
      />
      <Statistics
       good={good}
       bad={bad}
       neutral={neutral}
       all={all()}
       avg={avg()}
       positive={positive()}
       />
     
    </div>
  )
}

export default App