import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './Context/AuthContext'
import Show from './Routes/show'

function App() {
 
  return (
    <>
    <Router>
     <AuthProvider>
      <Show/>
     </AuthProvider>
    </Router>
    </>
  )
}

export default App
