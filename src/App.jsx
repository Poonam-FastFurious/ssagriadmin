import "./App.css";
import "../src/assets/libs/jsvectormap/css/jsvectormap.min.css";
import "../src/assets/libs/swiper/swiper-bundle.min.css";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/icons.min.css";
import "../src/assets/css/app.min.css";
import "../src/assets/css/custom.min.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Signin from "./Authentication/Signin";
import Header from "./Componnets/Header";
import ListProduct from "./Product/ListProduct";
import DashBoard from "./Componnets/DashBoard";
import AddProduct from "./Product/AddProduct";
import StockOut from "./Product/StockOut";
import Review from "./Product/Review";
import Category from "./Category/Category";
import AddCategories from "./Category/AddCategories";
import SubCategories from "./Category/SubCategories";
import Addsubcategory from "./Category/Addsubcategory";
import Order from "./Order/Order";
import OrderDetails from "./Order/OrderDetails";
import Transaction from "./Transaction/Transaction";
import Customerlist from "./Customer/Customerlist";
import Banner from "./Banner/Banner";
import Addbanner from "./Banner/Addbanner";
import Tax from "./Setting/Tax";
import Coupon from "./Setting/Coupon";
import Shipping from "./Setting/Shipping";
import ProductDetail from "./Product/ProductDetail";
import Profile from "./SiteSetting/Profile";

import Privacypolicy from "./SiteSetting/Privacypolicy";
import Termandcondition from "./SiteSetting/Termandcondition";
import Faq from "./SiteSetting/Faq";
import Addblogs from "./Blogs/Addblogs";
import Blogs from "./Blogs/Blogs";
import Testimonial from "./SiteSetting/Testimonial";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/Admin/login" element={<Signin />} />
          </Route>
          <Route
            element={
              <>
                <Header /> <Outlet />
              </>
            }
          >
            <Route path="/" element={<DashBoard />} />
            <Route path="/Product" element={<ListProduct />} />
            <Route path="/Product/:id" element={<ProductDetail />} />
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/Stockout" element={<StockOut />} />
            <Route path="/review" element={<Review />} />
            <Route path="/Categories" element={<Category />} />
            <Route path="/add-category" element={<AddCategories />} />
            <Route path="/add-subcategory" element={<Addsubcategory />} />
            <Route path="/Sub-Categories" element={<SubCategories />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/Order/:id" element={<OrderDetails />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/customer" element={<Customerlist />} />
            <Route path="/Banner" element={<Banner />} />
            <Route path="/add-banner" element={<Addbanner />} />
            <Route path="/Tax" element={<Tax />} />
            <Route path="/Coupon" element={<Coupon />} />
            <Route path="/Shipping" element={<Shipping />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/pages-privacy-policy" element={<Privacypolicy />} />
            <Route path="/pages-faqs" element={<Faq />} />
            <Route path="/Blogs" element={<Addblogs />} />
            <Route path="/Bloglist" element={<Blogs />} />
            <Route path="/Testimonial" element={<Testimonial />} />
            <Route
              path="/pages-term-conditions"
              element={<Termandcondition />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
