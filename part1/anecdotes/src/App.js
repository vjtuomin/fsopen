import React, { useState } from 'react'
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
   
  const [selected, setSelected] = useState(0)
  const [most, setMost] = useState(0);
  const[votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNext = () => {
    const max = anecdotes.length - 1;
    const x = Math.floor(Math.random() * max);
    setSelected(x);
  }


  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
    handleMost();
    console.log(most);
    if(selected < anecdotes.length){
    setSelected(selected + 1);
    }
    else{
      setSelected(0);
    }
  }


  const handleMost = () => {

  var max = votes[0];
  var maxIndex = 0;

  for (var i = 1; i < votes.length; i++) {
      if (votes[i] > max) {
          maxIndex = i;
          max = votes[i];
      }
  }
  

  setMost(maxIndex); 
  }
  

  return (
    <div>
      {anecdotes[selected]}
      <Button
        handleClick={handleVote}
        text='vote'
      />
       <Button
        handleClick={handleNext}
        text='next anecdote'
      />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[most]} </p>
     <p>Has {votes[most]}  votes</p>
    </div>
  )
}

export default App