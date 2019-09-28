import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const text = {h1: 'Anecdote of the day', 
                h2: 'Anecdote with most votes'}

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0])

  const handleClick = () => {
    setSelected(generateRandom(props.anecdotes))
  }

  const handleVote = () => {
      const newPoints = [...points]
      newPoints[selected] += 1
      setPoints(newPoints)
  }

  return (
    <div>
      <Headers heading={text.h1}/>
      {props.anecdotes[selected]}
      <Display points={points[selected]}/>
      <div>
          <Button onClick={handleVote} text='vote'/>
          <Button onClick={handleClick} text='next anecdote'/>
      </div>
      <Headers heading={text.h2}/>
      <TopVotes anecdotes={props.anecdotes} points={points}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({ onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Display = (props) => {
    return (
        <div>has {props.points} votes</div>
    )
}

const Headers = props => <h1>{props.heading}</h1>

const TopVotes = ({anecdotes, points}) => {
    if (points.every(item => item === 0)){
        return (
            <div>No votes yet</div>
        )
    }

    let max = findMax(points)
    let index = points.indexOf(max)

    return (
        <div>
        <div>{anecdotes[index]}</div>
        <div>has {max} votes</div>  
        </div>
    )
}

// random number generator function
function generateRandom(anecdotes){
    return Math.floor((Math.random()*anecdotes.length))
}

function findMax(points){
    let max = 0
    for(let i = 0; i< points.length; i++){
        if (points[i] >= max){
            max = points[i]
        }
    }
    return max
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
