import 'antd/dist/reset.css';
// import { useState } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BillsPage from './pages/BillsPage';
import CustomerPage from './pages/CustomerPage';


function App() {
  return (
    <>
      {
        // login ?
         <BrowserRouter>
          <Routes>      
              <Route path='/' element={<ProtectedRoute><Homepage /></ProtectedRoute>}/> 
              <Route path='/items' element={<ProtectedRoute><ItemPage/></ProtectedRoute>} />              
              <Route path='/cart' element={<ProtectedRoute><CartPage/></ProtectedRoute>} />
              <Route path='/bills' element={<ProtectedRoute><BillsPage/></ProtectedRoute>} />    
              <Route path='/customers' element={<ProtectedRoute><CustomerPage/></ProtectedRoute>} />  
              <Route path='/register' element={<RegisterPage />}></Route>
              <Route path='/login' element={<LoginPage />}></Route>
          </Routes>
        
      </BrowserRouter>    
      }
      
    </>
  )
}

export default App;

export function ProtectedRoute({children}){
  if(localStorage.getItem('auth')){
    return children
  }else{
    return <Navigate to='/login'/>
  }
}
