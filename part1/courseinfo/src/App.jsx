const Header = (props) => (
  <h1>{props.course}</h1>
)

const Content = (props) => (
  <>
    <p>{props.parts[0]} {props.exercises[0]}</p>
    <p>{props.parts[1]} {props.exercises[1]}</p>
    <p>{props.parts[2]} {props.exercises[2]}</p>
  </>
)



const Total = (props) => (
  <p>Number of exercises {props.total_num}</p>
)



const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [part1, part2, part3]
  const exercises = [exercises1, exercises2, exercises3]

  return (
    <div>
      <Header course={course}/>
      <Content exercises={exercises} parts={parts}/>
      <Total total_num={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App