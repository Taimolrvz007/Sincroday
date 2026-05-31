import { Routes, Route } from 'react-router-dom'
import Login from './Auth/login'
import Register from './Auth/Register'
import { ScheduleMeeting } from './userCalendar/ScheduleMeeting'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/schedule"
        element={
          <ScheduleMeeting
            onSchedule={(payload) => alert(JSON.stringify(payload, null, 2))}
            onCancel={() => console.log('cancelado')}
          />
        }
      />
    </Routes>
  )
}

export default App