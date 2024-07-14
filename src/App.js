import React,{useState} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import News from './Components/News';
import Footer from './Components/Footer';
import LoadingBar from 'react-top-loading-bar'
import Home from './Components/Home';
import {BrowserRouter,Routes,Route} from "react-router-dom"

const App =()=> {
  const pageSize=20;
   const apiKey=process.env.REACT_APP_NEWS_API;


   const [progress,setProgress]=useState(0)
  
    return (
      <div>

        <Navbar /> 
        <LoadingBar
        color='#f11946'
        height={3}
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />
        <BrowserRouter> 
        <Routes> 
          {/* <Route path="/" element={<Navbar/>}/>  */}
         {/* <Navbar/> */}
         {/* <Route path="/about" element={<News setProgress={ setProgress}  apiKey={ apiKey} pageSize={ pageSize} country="in" category="about"/>}/>  */}
         <Route exact path="/home" element={<Home/>}  pageSize={pageSize}  /> 

          <Route exact path="/entertainment" element={<News setProgress={setProgress}  apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/> 
          <Route exact path="/general" element={<News setProgress={setProgress}  apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}/> 
          <Route exact path="/health" element={<News setProgress={setProgress}  apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}/> 
          <Route exact path="/science" element={<News setProgress={setProgress}  apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}/> 
          <Route exact path="/sports" element={<News setProgress={setProgress}  apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}/> 
          <Route exact path="/technology" element={<News setProgress={setProgress}  apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}/> 






         </Routes>
         </BrowserRouter>
        <Footer/>
      </div>
    )
  }

export default App;