import { useState } from 'react'
import './App.css'

import QuestionAndAnswer from './components/Form/index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div><QuestionAndAnswer /></div>
    </>
  )
}

export default App
