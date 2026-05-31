import { Routes, Route } from 'react-router-dom'
import Login from './Auth/login'
import Register from './Auth/register'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App