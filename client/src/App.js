import './App.css'
import { Routes, Route } from 'react-router-dom'
import Username from './components/Username'
import Register from './components/Register'
import Password from './components/Password'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import Reset from './components/Reset'
import PageNotFound from './components/PageNotFound'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
