import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>


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

      <h1>statistics</h1>
      <div>good {good}</div> 
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}

export default App