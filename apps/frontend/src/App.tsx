
import MainPage from './pages/main-page'
import ListPage from './pages/list-page'
import NotFound from './pages/not-found'

import {  Routes, Route } from 'react-router-dom'
import { Layout } from './components/layouts/layout'


function App() {
  return (
    <>
      <div className='h-dvh w-screen'>
      <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path='main' element={<MainPage/>}/>
          <Route path='list' element={<ListPage/>}/>
          <Route path='*' element={<NotFound/>}/>
          </Route>
      </Routes>
      </div>
    </>
  )
}

export default App
