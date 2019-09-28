import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Headers = props => <h1>{props.heading}</h1>

const Button = ({ onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const Statistics = ({all, allRatings, average, positive, good, neutral, bad}) => {
    
    if (allRatings.length === 0){
        return (
            <div>No feedback given</div>
        )
    }

    let sum = 0
    for(let i = 0; i< allRatings.length; i++){
        sum += allRatings[i]
    }
    let ave = sum/allRatings.length

    return (
        <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>{all} {allRatings.length}</div>
        <div>{average} {ave}</div>
        <div>{positive} {(good/allRatings.length)*100} %</div>    
        </div>
    )
}

const App = () => {
  const text = {h1: 'give feedback', 
                h2: 'statistics', 
                good: 'good', 
                neutral: 'neutral', 
                bad: 'bad',
                all: 'all',
                average: 'average',
                positive: 'positive'}

  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allRatings, setAll] = useState([])

  const handleGoodClick = () => {
      setAll(allRatings.concat(1))
      setGood(good + 1)
  }

  const handleNeutralClick = () => {
      setAll(allRatings.concat(0))
      setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
      setAll(allRatings.concat(-1))
      setBad(bad + 1)
  }

  return (
    <div>
        <Headers heading={text.h1}/>
        <Button onClick={handleGoodClick} text='good'/>
        <Button onClick={handleNeutralClick} text='neutral'/>
        <Button onClick={handleBadClick} text='bad'/>
        <Headers heading={text.h2}/>
        <Statistics all={text.all} allRatings={allRatings} 
        average={text.average} positive={text.positive} good={good} neutral={neutral}
        bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
