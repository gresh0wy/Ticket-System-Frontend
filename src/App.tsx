import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login'
import Register from './pages/Register'
import CreateTickets from './pages/CreateTickets'
import CheckStatusTickets from './pages/CheckStatusTickets'
import AllTickets from './pages/Tickets'
import DetailsTickets from './pages/DetailsTickets'
import Error403 from './pages/Error403'
import Error404 from './pages/Error404'
import { Navbar } from './components/Navbar'







export function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* ogólnodostępne ścieżki */}
        <Route path='/'></Route>
        <Route path='/tickets/create' element={<CreateTickets />}></Route>
        <Route path='/tickets/status' element={<CheckStatusTickets />}></Route>
        <Route path='/users/me'></Route>
        <Route path='/users/me/settings'></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>


        {/* dostępne dla admina */}
        <Route path='/admin/users'></Route>
        <Route path='/admin/users/:username'></Route>
        <Route path='/admin/tickets' element={<AllTickets />}></Route>
        <Route path='/admin/tickets/:id' element={<DetailsTickets />}></Route>



        {/* handle error  */}
        <Route path='/forbidden' element={<Error403 />}></Route>
        <Route path='*' element={<Error404 />}></Route>

      </Routes >

    </BrowserRouter >
  )
}