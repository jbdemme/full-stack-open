const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>{props.part} {props.exercise}</p>
)

const Content = (props) => (
  <>
    <Part exercise={props.exercises[0]} part={props.parts[0]}/>
    <Part exercise={props.exercises[1]} part={props.parts[1]}/>
    <Part exercise={props.exercises[2]} part={props.parts[2]}/>
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