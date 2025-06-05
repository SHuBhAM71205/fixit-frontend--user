import React from 'react'
import './App.css'
import { Route, Routes, BrowserRouter as Router }
  from 'react-router-dom'
import Home from './components/Home'
import Request from './components/Request'
import TrackRequest from './components/TrackRequest'
import Feedback from './components/Feedback'
import Hystory from './components/Hystory'
import Navbar from './components/Navbar'
import HeaderCom from './components/HeaderCom'
import Currpgcontextprovider from './context/currpgcontextprovider'
import Requestcontextprovider from './context/requestContextProvider'
function App() {

  return (
    <Currpgcontextprovider>
    <Requestcontextprovider>
      <div className='flex-row homepg-body'>
        <Router>
          <Navbar />
          <div className="homepg-main-content flex-col">
            <HeaderCom/>
            <div className="content">
              <Routes>
                <Route path="/" element={
                  <Home />
                } />
                <Route path="/request" element={
                  <Request />
                } />
                <Route path="/track-request" element={
                  <TrackRequest />
                } />
                <Route path="/feedback" element={
                  <Feedback />
                } />
                <Route path="/history" element={
                  <Hystory />
                } />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
      </Requestcontextprovider>
      </Currpgcontextprovider>

      )
}

      export default App
