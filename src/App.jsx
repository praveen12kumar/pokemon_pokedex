import {Routes, Route} from "react-router-dom";
import "./app.css"
import Background from './components/Background'
import Header from "./components/Header"
import Home from "./pages/Home";
import Search from "./pages/Search";
import Description from "./pages/pokemons/Description";
import Evolution from "./pages/pokemons/Evolution";
import Locations from "./pages/pokemons/Locations";
import CapableMoves from "./pages/pokemons/CapableMoves";
function App() {
 

  return (
    <>
      <div className="main-container w-screen h-screen  relative">
      <Background/>
        <div className="w-screen h-auto z-10 bg-[rgb(2,8,20)]/95 backdrop-blur-md absolute top-0 left-0 flex flex-col justify-between ">
          <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/pokemon/:name/description" element={<Description/>}/>
            <Route path="/pokemon/:name/evolution" element={<Evolution/>}/>
            <Route path="/pokemon/:name/locations" element={<Locations/>}/>
            <Route path="/pokemon/:name/moves" element={<CapableMoves/>}/>
          </Routes>
          
        </div>
      </div>
    </>
  )
}

export default App
