import {Routes, Route} from "react-router-dom";
import "./app.css"
import Background from './components/Background'
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
 

  return (
    <>
      <div className="main-container w-screen h-screen relative overflow-hidden ">
      <Background/>
        <div className="w-screen h-screen z-10 bg-[rgb(2,8,20)]/95 backdrop-blur absolute top-0 left-0 flex flex-col justify-between ">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
