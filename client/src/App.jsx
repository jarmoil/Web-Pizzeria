import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import Menu from './components/Menu'
import ManagementPage from './components/ManagementPage'
import Location from './components/Location'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/managementPage" element={<ManagementPage />} />
            <Route path="/location" element={<Location />} />

          </Route>
        </Routes>
    </div>
  )
}

export default App
