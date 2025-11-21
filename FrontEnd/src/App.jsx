import React from 'react'
import '@ant-design/v5-patch-for-react-19';
import {Routes,Route} from 'react-router-dom'
import Pricing from './pages/Pricing'
import ToDoListLanding from './pages/Home'
import AboutUs from './pages/AboutUs'
import TodoEditor from './pages/TodoEditor'
import NotFound from './components/NotFound'
import Login from './pages/login'
import 'antd/dist/reset.css'
import Register from './pages/register'
const App = () => {
  return (
    <div> 
      <Routes>
        <Route path='/' element={<ToDoListLanding/>}/>
        <Route path='/to_do_list' element={<ToDoListLanding/>}/>
        <Route path='/Pricing' element = {<Pricing/>}/>
        <Route path='/AboutUs' element = {<AboutUs/>}/>
        <Route path='/TodoEditor' element = {<TodoEditor/>}/>
        <Route path='/Login' element = {<Login/>}/>
        <Route path='/Register' element = {<Register/>}/> 
        <Route path='*' element = {<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App