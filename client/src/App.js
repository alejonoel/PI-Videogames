import './App.css'
import { Routes , Route , BrowserRouter } from 'react-router-dom'
import Home from './Views/Home/Home'
import Details from './Views/Details/Details'
import Form from './Views/Form/Form'
import Landing from './Views/Landing/Landing'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route exact path={"/"} element={<Landing/>}/>
            <Route path={"/home"} element={<Home/>}/>
            <Route path={"/form"} element={<Form/>}/>
            <Route path={"/videogames/:id"} element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
