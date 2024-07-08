/* eslint-disable react/no-unescaped-entities */

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import logo from "../assets/images/logonew.png";
import { Baseurl } from "../confige";
function Header() {
  const token = localStorage.getItem("accessToken");
  const adminId = localStorage.getItem("adminId");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/Admin/Login");
    }
  });
  const logout = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to Sign Out?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
      position: "top",
      customClass: {
        popup: "w-[30%] h-auto",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(Baseurl + "/api/v1/admin/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ adminId }),
        })
          .then((response) => {
            if (response.ok) {
              localStorage.removeItem("token");
              localStorage.removeItem("AdminId");
              navigate("/Admin/Login");
            } else {
              throw new Error("Logout  jjj request failed");
            }
          })
          .catch((error) => {
            console.error("Error logging out:", error);
          });
      }
    });
  };

  return (
    <>
      <header id="page-topbar">
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="40" />
                  </span>
                  <span className="logo-lg d-none">
                    <img src={logo} alt="" height="40" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="40" />
                  </span>
                  <span className="logo-lg">
                    <img src={logo} alt="" height="40" />
                  </span>
                </Link>
              </div>

              <button
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>

              <form className="app-search d-none d-md-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    autoComplete="off"
                    id="search-options"
                  />
                  <span className="mdi mdi-magnify search-widget-icon"></span>
                  <span
                    className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                    id="search-close-options"
                  ></span>
                </div>
                <div
                  className="dropdown-menu dropdown-menu-lg"
                  id="search-dropdown"
                ></div>
              </form>
            </div>

            <div className="d-flex align-items-center">
              <div
                className="dropdown topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              ></div>

              <div className="dropdown ms-sm-3 header-item topbar-user">
                <button
                  type="button"
                  className="btn"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="d-flex align-items-center">
                    <img
                      className="rounded-circle header-profile-user"
                      src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg"
                      alt="Header Avatar"
                    />
                    <span className="text-start ms-xl-2">
                      <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                        Admin
                      </span>
                      <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                        Admin
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Welcome Admin</h6>
                  <Link className="dropdown-item" to="/Profile">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Profile</span>
                  </Link>

                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">
                      Balance : <b>5971.67</b>
                    </span>
                  </Link>
                  <Link className="dropdown-item" to="/Profile">
                    <span className="badge bg-success-subtle text-success mt-1 float-end">
                      New
                    </span>
                    <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Settings</span>
                  </Link>

                  <Link className="dropdown-item" onClick={logout}>
                    <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle" data-key="t-logout">
                      Logout
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="app-menu navbar-menu" style={{ overflowY: "auto" }}>
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} alt="" height="40" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="40" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logo} alt="" height="50" />
            </span>
            <span className="logo-lg">
              <img src={logo} alt="" height="50" />
            </span>
          </Link>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>

        <div id="scrollbar">
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <div className="nav-link menu-link">
                  <i className="ri-dashboard-2-line"></i>

                  <Link to="/">Dashboards</Link>
                </div>
                <div
                  className="collapse menu-dropdown"
                  id="sidebarDashboards"
                ></div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/#sidebarApps"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarApps"
                >
                  <i className="ri-apps-2-line"></i>
                  <span data-key="t-apps">Manage Product</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarApps">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/Product"
                        className="nav-link"
                        data-key="t-chat"
                      >
                        All Product
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/AddProduct"
                        className="nav-link"
                        data-key="t-chat"
                      >
                        Add Product
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/Stockout"
                        className="nav-link"
                        data-key="t-chat"
                      >
                        Stock Out Products
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/#sidebarLayouts"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLayouts"
                >
                  <i className="ri-layout-3-line"></i>
                  <span data-key="t-layouts">Manage Categories</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarLayouts">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/Categories"
                        className="nav-link"
                        data-key="t-horizontal"
                      >
                        Categories
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        to="/Sub-Categories"
                        className="nav-link"
                        data-key="t-detached"
                      >
                        Sub Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <div
                        to="/Child-Categories"
                        className="nav-link"
                        data-key="t-two-column"
                      >
                        Child Categories
                      </div>
                    </li> */}
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link to="/Order" className="nav-link menu-link">
                  <i className="ri-layout-3-line"></i>
                  <span>Manage Order</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/transaction" className="nav-link menu-link">
                  <i className="ri-layout-3-line"></i>
                  <span>Transaction</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/customer" className="nav-link menu-link">
                  <i className="ri-layout-3-line"></i>
                  <span>Customer</span>
                </Link>
              </li>
              <li className="menu-title">
                <i className="ri-more-fill"></i>
                <span data-key="t-pages">Setting</span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/#sidebarAuth"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAuth"
                >
                  <i className="ri-account-circle-line"></i>
                  <span data-key="t-authentication">Setting</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarAuth">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link to="/tax" className="nav-link">
                        Taxes
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/Coupon" className="nav-link">
                        Coupons
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link to="/Shipping" className="nav-link">
                        Delivery Charge
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/#sidebarLanding"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarLanding"
                >
                  <i className="ri-rocket-line"></i>
                  <span data-key="t-landing">Banner</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarLanding">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/add-banner"
                        className="nav-link"
                        data-key="t-one-page"
                      >
                        Add Banner
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Banner"
                        className="nav-link"
                        data-key="t-nft-landing"
                      >
                        Banner
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="menu-title">
                <i className="ri-more-fill"></i>
                <span data-key="t-components">Components</span>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/#sidebarPages"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarPages"
                >
                  <i className="ri-pages-line"></i>
                  <span data-key="t-pages">Manage Site</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarPages">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/Profile"
                        className="nav-link"
                        data-key="t-team"
                      >
                        Profile
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/pages-faqs"
                        className="nav-link"
                        data-key="t-faqs"
                      >
                        FAQs
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/Profile"
                        className="nav-link"
                        data-key="t-sitemap"
                      >
                        Change Password
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to="/pages-privacy-policy"
                        className="nav-link"
                        data-key="t-privacy-policy"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/pages-term-conditions"
                        className="nav-link"
                        data-key="t-term-conditions"
                      >
                        Term & Conditions
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link menu-link"
                  to="/#sidebarAdvanceUI"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAdvanceUI"
                >
                  <i className="ri-stack-line"></i>
                  <span data-key="t-advance-ui">Manage Bloges</span>
                </Link>
                <div className="collapse menu-dropdown" id="sidebarAdvanceUI">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to="/Blogs"
                        className="nav-link"
                        data-key="t-sweet-alerts"
                      >
                        Add Bloges
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/Bloglist"
                        className="nav-link"
                        data-key="t-sweet-alerts"
                      >
                        Manage Blogs
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
