import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({text, value}) => <div>{text} {value}</div>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = ((1 * good + 0 * neutral + -1 * bad) / all) || 0
  const positive = (good / all) || 0

  if (all > 0) {
    return (
      <div id="stats">
        <h1>statistics</h1>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={(positive*100) + '%'} />
      </div>
    )
  } else {
    return(<div>No feedback given</div>)
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' onClick={handleGoodClick}/>
      <Button text='neutral' onClick={handleNeutralClick}/>
      <Button text='bad' onClick={handleBadClick}/>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App