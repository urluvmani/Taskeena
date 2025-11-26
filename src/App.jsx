import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Footer from './components/More/Footer.jsx'
import Register from './pages/auth/Register.jsx'
import Header from './components/More/Header.jsx'
import Login from './pages/auth/Login.jsx'
import CartPage from './pages/CartPage.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import { ToastContainer } from 'react-toastify'
import About from './pages/About.jsx'
import Dashboard from './pages/user/Dashboard.jsx'
import PrivateRoute from './routes/Private.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import AdminPrivateRoute from './routes/AdminPrivate.jsx'
import AdminDashboard from './pages/admin/Dashboard.jsx'
import MyProducts from './pages/admin/MyProducts.jsx'
import Orders from './pages/admin/Orders.jsx'
import AdminCategory from './pages/admin/Category.jsx'
import Users from './pages/admin/Users.jsx'
import CreateProduct from './pages/admin/CreateProduct.jsx'
import Profile from './pages/user/Profile.jsx'
import MyOrders from './pages/user/MyOrders.jsx'
import UpdateProduct from './pages/admin/UpdateProduct.jsx'
import Search from './pages/Search.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import AllCategory from './pages/AllCategory.jsx'
import CategoryProduct from './pages/CategoryProduct.jsx'
import UpdateProfile from './pages/user/UpdateProfile.jsx'
import Collections from './pages/Collections.jsx'

const App = () => {


  return (<>
      <Header/>
    <div  className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collections/all' element={<Collections/>} />
        <Route path='/Category/latest-products' element={<Collections/>} />
        <Route path='/collections/latest-products' element={<Collections/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/details/:slug' element={<ProductDetail/>} />
        <Route path='/allCategories' element={<AllCategory/>} />
        <Route path='/category/:slug' element={<CategoryProduct/>} />
        <Route path='/collections/:slug' element={<CategoryProduct/>} />

        {/* User Protected Routes */}
        <Route path='/dashboard/user' element={<PrivateRoute/>} >
        <Route path='' element={<Dashboard/>}>
        <Route path='profile' element={<Profile/>} />
        <Route path='orders' element={<MyOrders/>} />
        <Route path='update-profile' element={<UpdateProfile/>} />
        </Route>
        </Route>
        {/* Admin Protected Routes */}
      <Route path="/dashboard/admin" element={<AdminPrivateRoute />}>
  <Route path='' element={<AdminDashboard />}>
    <Route path="create-products" element={<CreateProduct />} />
    <Route path="products" element={<MyProducts />} />
    <Route path="product/:slug" element={<UpdateProduct />} />
    <Route path="orders" element={<Orders />} />
    <Route path="category" element={<AdminCategory />} />
    <Route path="users" element={<Users />} />
  </Route>
</Route>

        <Route path='/dashboard' element={<PrivateRoute/>} >
        <Route path='' element={<Dashboard/>} />
        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/pages/contact' element={<About/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </div>
      <Footer/>
      <ToastContainer/>
  </>
  )
}

export default App
