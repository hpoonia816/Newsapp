import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

import React, {useState} from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
  
const App =()=> {
  const [progress, setProgress] = useState(0);
   const apiKey=process.env.REACT_APP_NEWS_API;
  
      return (
        <>
        <Router>
        <Navbar/>
        <LoadingBar
        height={2}
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route element={<News setProgress={setProgress} apiKey={apiKey} key={`general`} category='general' country='in'/>} exact path='/' ></Route>
          <Route element={<News setProgress={setProgress} apiKey={apiKey} key={`sports`} category='sports' country='in'/>} exact path='/sports' ></Route>
          <Route element={<News setProgress={setProgress} apiKey={apiKey} key={`entertainment`} category='entertainment' country='in'/>} exact path='/entertainment' ></Route>
          <Route element={<News setProgress={setProgress} apiKey={apiKey} key={`health`} category='health' country='in'/>} exact path='/health' ></Route>
          <Route element={<News setProgress={setProgress} apiKey={apiKey} key={`technology`} category='technology' country='in'/>} exact path='/technology' ></Route>
          <Route element={<News setProgress={setProgress} apiKey={apiKey} key={`science`} category='science' country='in'/>} exact path='/science' ></Route>
          <Route element={<News setProgress={setProgress} apiKey={apiKey} key={`business`} category='business' country='in'/>} exact path='/business' ></Route>
        </Routes>
        </Router>
        
        </>
      )
    
  }

  
export default App;