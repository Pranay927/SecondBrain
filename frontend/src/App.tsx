import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Signin from './pages/signin';
import Dashboard from './pages/dashboard';

function App() {
  return (
   < BrowserRouter >
      <Routes>
          <Route path='/up' element={<Signup/>}></Route>
          <Route path='/in' element={<Signin/>}></Route>
          <Route path= '/dashboard' element = {<Dashboard/>}/>
          <Route></Route>
      </Routes>
   </ BrowserRouter >
  )
}

export default App
