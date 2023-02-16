import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Forms, Home, Invitation, Game } from './Pages'
import { Nav, ProtectedRoute } from './components'

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>

        {/* index page */}
        <Route path='/' element={<Forms />} />

        {/* home page route */}
        <Route path='home' element={
          <ProtectedRoute >
            <Home />
          </ProtectedRoute>
        } />

        {/* invitation page */}
        <Route path='invitation' element={
          <ProtectedRoute >
            <Invitation />
          </ProtectedRoute>} />


        {/* game page */}
        <Route path='game' element={
          <ProtectedRoute >
            <Game />
          </ProtectedRoute>
        } />

      </Routes>
    </div>

  )
}

export default App

