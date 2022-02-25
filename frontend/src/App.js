import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/home/Home'
import Product from './pages/products/Product'
import Cart from './pages/cart/Cart'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Profile from './pages/profile/Profile'
import Shipping from './pages/shipping/Shipping'
import Payment from './pages/payment/Payment'
import PlaceOrder from './pages/orders/PlaceOrder'
import Order from './pages/orders/Order'
import UserList from './pages/users/UsersList'
import UserEdit from './pages/users/UserEdit'
import ProductList from './pages/products/ProductList'
import ProductEdit from './pages/products/ProductEdit'
import OrderList from './pages/orders/OrderList'
import ProductCategoryList from './pages/products/category/ProductCategoryList'
import ProductCategoryEdit from './pages/products/category/ProductCategoryEdit'
import BrandList from './pages/brands/BrandsList'
import BrandEdit from './pages/brands/BrandEdit'


function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={Home} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/shipping' component={Shipping} />
          <Route path='/placeorder' component={PlaceOrder} />
          <Route path='/order/:id' component={Order} />
          <Route path='/payment' component={Payment} />
          <Route path='/product/:id' component={Product} />
          <Route path='/cart/:id?' component={Cart} />

          <Route path='/admin/userlist' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />

          <Route path='/admin/productlist' component={ProductList} />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />

          <Route path='/admin/categorylist' component={ProductCategoryList} />
          <Route path='/admin/category/:id/edit' component={ProductCategoryEdit} />

          <Route path='/admin/brandlist' component={BrandList} />
          <Route path='/admin/brand/:id/edit' component={BrandEdit} />

          <Route path='/admin/orderlist' component={OrderList} />
        </Container>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
