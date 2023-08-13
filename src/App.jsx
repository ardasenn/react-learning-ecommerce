import "./App.css";
import { Navbar } from "./components/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  NavLink,
} from "react-router-dom";
import { Signin } from "./pages/Auth/Signin";
import { Signup } from "./pages/Auth/Signup";
import { Products } from "./pages/Products";
import { ProductDetail } from "./pages/ProductDetail";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { Basket } from "./pages/Basket";
import { Error404 } from "./pages/Error404";
import { Admin } from "./pages/Admin";
import { AdminProducts } from "./pages/Admin/Products";
import { AdminOrders } from "./pages/Admin/Orders";
import { AdminProductDetail } from "./pages/Admin/ProductDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/" element={<Products />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/basket" element={<Basket />} />
            <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route element={<ProtectedRoute admin={true} />}>
              <Route path="/admin/*" element={<Admin />} />
            </Route>
            <Route path="*" element={<Error404 />} />
            {/* bununla beraber hata sayfasınıbelirtmis olduk */}
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route
              path="/admin/products/:product_id"
              element={<AdminProductDetail />}
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
