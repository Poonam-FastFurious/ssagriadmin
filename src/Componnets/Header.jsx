/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
function Header() {
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("AdminId");
  const [adminProfile, setAdminProfile] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/Admin/Login");
    } else {
      fetchAdminProfile();
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
        fetch("api/v1/admin/logout", {
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
  const fetchAdminProfile = () => {
    fetch(`/api/v1/admin/Profile?adminId=${adminId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch admin profile");
        }
        return response.json();
      })
      .then((data) => {
        setAdminProfile(data.data);
      })
      .catch((error) => {
        console.error("Error fetching admin profile:", error);
        // Handle error (e.g., show error message)
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
                    <img
                      src="https://themesbrand.com/velzon/html/default/assets/images/logo-sm.png"
                      alt=""
                      height="22"
                    />
                  </span>
                  <span className="logo-lg d-none">
                    <img
                      src="https://themesbrand.com/velzon/html/default/assets/images/logo-dark.png"
                      alt=""
                      height="17"
                    />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img
                      src="https://themesbrand.com/velzon/html/default/assets/images/logo-sm.png"
                      alt=""
                      height="22"
                    />
                  </span>
                  <span className="logo-lg">
                    <img
                      src="https://themesbrand.com/velzon/html/default/assets/images/logo-light.png"
                      alt=""
                      height="17"
                    />
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
                >
                  <div data-simplebar="" style={{ maxHeight: "320px" }}>
                    <div className="dropdown-header">
                      <h6 className="text-overflow text-muted mb-0 text-uppercase">
                        Recent Searches
                      </h6>
                    </div>

                    <div className="dropdown-item bg-transparent text-wrap">
                      <Link
                        to="/"
                        className="btn btn-soft-secondary btn-sm rounded-pill"
                      >
                        how to setup <i className="mdi mdi-magnify ms-1"></i>
                      </Link>
                      <Link
                        to="/"
                        className="btn btn-soft-secondary btn-sm rounded-pill"
                      >
                        buttons <i className="mdi mdi-magnify ms-1"></i>
                      </Link>
                    </div>

                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-1 text-uppercase">
                        Pages
                      </h6>
                    </div>

                    <Link to="#" className="dropdown-item notify-item">
                      <i className="ri-bubble-chart-line align-middle fs-18 text-muted me-2"></i>
                      <span>Analytics Dashboard</span>
                    </Link>

                    <Link to="#" className="dropdown-item notify-item">
                      <i className="ri-lifebuoy-line align-middle fs-18 text-muted me-2"></i>
                      <span>Help Center</span>
                    </Link>

                    <Link to="#" className="dropdown-item notify-item">
                      <i className="ri-user-settings-line align-middle fs-18 text-muted me-2"></i>
                      <span>My account settings</span>
                    </Link>

                    <div className="dropdown-header mt-2">
                      <h6 className="text-overflow text-muted mb-2 text-uppercase">
                        Members
                      </h6>
                    </div>

                    <div className="notification-list">
                      <Link to="#" className="dropdown-item notify-item py-2">
                        <div className="d-flex">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-2.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="m-0">Angela Bernier</h6>
                            <span className="fs-11 mb-0 text-muted">
                              Manager
                            </span>
                          </div>
                        </div>
                      </Link>

                      <Link to="#" className="dropdown-item notify-item py-2">
                        <div className="d-flex">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="m-0">David Grasso</h6>
                            <span className="fs-11 mb-0 text-muted">
                              Web Designer
                            </span>
                          </div>
                        </div>
                      </Link>

                      <Link to="#" className="dropdown-item notify-item py-2">
                        <div className="d-flex">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-5.jpg"
                            className="me-3 rounded-circle avatar-xs"
                            alt="user-pic"
                          />
                          <div className="flex-grow-1">
                            <h6 className="m-0">Mike Bunch</h6>
                            <span className="fs-11 mb-0 text-muted">
                              React Developer
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="text-center pt-3 pb-1">
                    <Link
                      to="/pages-search-results"
                      className="btn btn-primary btn-sm"
                    >
                      View All Results
                      <i className="ri-arrow-right-line ms-1"></i>
                    </Link>
                  </div>
                </div>
              </form>
            </div>

            <div className="d-flex align-items-center">
              <div className="dropdown d-md-none topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-search-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-search fs-22"></i>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search ..."
                          aria-label="Recipient's username"
                        />
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <div className="dropdown ms-1 topbar-head-dropdown header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    id="header-lang-img"
                    src="https://themesbrand.com/velzon/html/default/assets/images/flags/us.svg"
                    alt="Header Language"
                    height="20"
                    className="rounded"
                  />
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link
                    to="#"
                    className="dropdown-item notify-item language py-2"
                    data-lang="en"
                    title="English"
                  >
                    <img
                      src="https://themesbrand.com/velzon/html/default/assets/images/flags/us.svg"
                      alt="user-image"
                      className="me-2 rounded"
                      height="18"
                    />
                    <span className="align-middle">English</span>
                  </Link>
                </div>
              </div>

              <div className="dropdown topbar-head-dropdown ms-1 header-item">
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-category-alt fs-22"></i>
                </button>
                <div className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
                  <div className="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                    <div className="row align-items-center">
                      <div className="col">
                        <h6 className="m-0 fw-semibold fs-15"> Web Apps </h6>
                      </div>
                      <div className="col-auto">
                        <Link to="/#!" className="btn btn-sm btn-soft-info">
                          View All Apps
                          <i className="ri-arrow-right-s-line align-middle"></i>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <div className="row g-0">
                      <div className="col">
                        <Link className="dropdown-icon-item" to="/#!">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/brands/github.png"
                            alt="Github"
                          />
                          <span>GitHub</span>
                        </Link>
                      </div>
                      <div className="col">
                        <Link className="dropdown-icon-item" to="/#!">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/brands/bitbucket.png"
                            alt="bitbucket"
                          />
                          <span>Bitbucket</span>
                        </Link>
                      </div>
                      <div className="col">
                        <Link className="dropdown-icon-item" to="/#!">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/brands/dribbble.png"
                            alt="dribbble"
                          />
                          <span>Dribbble</span>
                        </Link>
                      </div>
                    </div>

                    <div className="row g-0">
                      <div className="col">
                        <Link className="dropdown-icon-item" to="/#!">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/brands/dropbox.png"
                            alt="dropbox"
                          />
                          <span>Dropbox</span>
                        </Link>
                      </div>
                      <div className="col">
                        <Link className="dropdown-icon-item" to="/#!">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/brands/mail_chimp.png"
                            alt="mail_chimp"
                          />
                          <span>Mail Chimp</span>
                        </Link>
                      </div>
                      <div className="col">
                        <Link className="dropdown-icon-item" to="/#!">
                          <img
                            src="https://themesbrand.com/velzon/html/default/assets/images/brands/slack.png"
                            alt="slack"
                          />
                          <span>Slack</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="dropdown topbar-head-dropdown ms-1 header-item"
                id="notificationDropdown"
              >
                <button
                  type="button"
                  className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle"
                  id="page-header-notifications-dropdown"
                  data-bs-toggle="dropdown"
                  data-bs-auto-close="outside"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="bx bx-bell fs-22"></i>
                  <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">
                    3<span className="visually-hidden">unread messages</span>
                  </span>
                </button>
                <div
                  className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                  aria-labelledby="page-header-notifications-dropdown"
                >
                  <div className="dropdown-head bg-primary bg-pattern rounded-top">
                    <div className="p-3">
                      <div className="row align-items-center">
                        <div className="col">
                          <h6 className="m-0 fs-16 fw-semibold text-white">
                            Notifications
                          </h6>
                        </div>
                        <div className="col-auto dropdown-tabs">
                          <span className="badge bg-light-subtle text-body fs-13">
                            4 New
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 pt-2">
                      <ul
                        className="nav nav-tabs dropdown-tabs nav-tabs-custom"
                        data-dropdown-tabs="true"
                        id="notificationItemsTab"
                        role="tablist"
                      >
                        <li className="nav-item waves-effect waves-light">
                          <Link
                            className="nav-link active"
                            data-bs-toggle="tab"
                            to="/#all-noti-tab"
                            role="tab"
                            aria-selected="true"
                          >
                            All (4)
                          </Link>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <Link
                            className="nav-link"
                            data-bs-toggle="tab"
                            to="/#messages-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Messages
                          </Link>
                        </li>
                        <li className="nav-item waves-effect waves-light">
                          <Link
                            className="nav-link"
                            data-bs-toggle="tab"
                            to="/#alerts-tab"
                            role="tab"
                            aria-selected="false"
                          >
                            Alerts
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="tab-content position-relative"
                    id="notificationItemsTabContent"
                  >
                    <div
                      className="tab-pane fade show active py-2 ps-2"
                      id="all-noti-tab"
                      role="tabpanel"
                    >
                      <div
                        data-simplebar=""
                        style={{ maxHeight: "300px" }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                <i className="bx bx-badge-check"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 lh-base">
                                  Your <b>Elite</b> author Graphic Optimization
                                  <span className="text-secondary">reward</span>
                                  is ready!
                                </h6>
                              </Link>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> Just
                                  30 sec ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check01"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </Link>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 48
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check02"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <div className="avatar-xs me-3 flex-shrink-0">
                              <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                <i className="bx bx-message-square-dots"></i>
                              </span>
                            </div>
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-2 fs-13 lh-base">
                                  You have received
                                  <b className="text-success">20</b> new
                                  messages in the conversation
                                </h6>
                              </Link>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check03"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item position-relative">
                          <div className="d-flex">
                            <img
                              src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs flex-shrink-0"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </Link>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 4
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="all-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="all-notification-check04"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 text-center view-all">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Notifications
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade py-2 ps-2"
                      id="messages-tab"
                      role="tabpanel"
                      aria-labelledby="messages-tab"
                    >
                      <div
                        data-simplebar=""
                        style={{ maxHeight: "300px" }}
                        className="pe-2"
                      >
                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-3.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  James Lemire
                                </h6>
                              </Link>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 30
                                  min ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check01"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check01"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-2.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Angela Bernier
                                </h6>
                              </Link>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Answered to your comment on the cash flow
                                  forecast's graph 🔔.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 2
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check02"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check02"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-6.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Kenneth Brown
                                </h6>
                              </Link>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  Mentionned you in his comment on 📃 invoice
                                  #12501.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 10
                                  hrs ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check03"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check03"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-reset notification-item d-block dropdown-item">
                          <div className="d-flex">
                            <img
                              src="https://themesbrand.com/velzon/html/default/assets/images/users/avatar-8.jpg"
                              className="me-3 rounded-circle avatar-xs"
                              alt="user-pic"
                            />
                            <div className="flex-grow-1">
                              <Link to="/#!" className="stretched-link">
                                <h6 className="mt-0 mb-1 fs-13 fw-semibold">
                                  Maureen Gibson
                                </h6>
                              </Link>
                              <div className="fs-13 text-muted">
                                <p className="mb-1">
                                  We talked about a project on linkedin.
                                </p>
                              </div>
                              <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                <span>
                                  <i className="mdi mdi-clock-outline"></i> 3
                                  days ago
                                </span>
                              </p>
                            </div>
                            <div className="px-2 fs-15">
                              <div className="form-check notification-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="messages-notification-check04"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="messages-notification-check04"
                                ></label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="my-3 text-center view-all">
                          <button
                            type="button"
                            className="btn btn-soft-success waves-effect waves-light"
                          >
                            View All Messages
                            <i className="ri-arrow-right-line align-middle"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="tab-pane fade p-4"
                      id="alerts-tab"
                      role="tabpanel"
                      aria-labelledby="alerts-tab"
                    ></div>

                    <div
                      className="notification-actions"
                      id="notification-actions"
                    >
                      <div className="d-flex text-muted justify-content-center">
                        Select
                        <div
                          id="select-content"
                          className="text-body fw-semibold px-1"
                        >
                          0
                        </div>
                        Result
                        <button
                          type="button"
                          className="btn btn-link link-danger p-0 ms-3"
                          data-bs-toggle="modal"
                          data-bs-target="#removeNotificationModal"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

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
                        {adminProfile.username}
                      </span>
                      <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                        Admin
                      </span>
                    </span>
                  </span>
                </button>
                <div className="dropdown-menu dropdown-menu-end">
                  <h6 className="dropdown-header">Welcome Anna!</h6>
                  <Link className="dropdown-item" to="/Profile">
                    <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Profile</span>
                  </Link>
                  <Link className="dropdown-item" to="/Chat">
                    <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Messages</span>
                  </Link>

                  <Link className="dropdown-item" to="/pages-faqs">
                    <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Help</span>
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/pages-profile">
                    <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">
                      Balance : <b>$5971.67</b>
                    </span>
                  </Link>
                  <Link className="dropdown-item" to="/pages-profile-settings">
                    <span className="badge bg-success-subtle text-success mt-1 float-end">
                      New
                    </span>
                    <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Settings</span>
                  </Link>
                  <Link className="dropdown-item" to="/auth-lockscreen-basic">
                    <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>
                    <span className="align-middle">Lock screen</span>
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
              <img
                src="https://themesbrand.com/velzon/html/default/assets/images/logo-light.png"
                alt=""
                height="22"
              />
            </span>
            <span className="logo-lg">
              <img
                src="https://themesbrand.com/velzon/html/default/assets/images/logo-dark.png"
                alt=""
                height="17"
              />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img
                src="https://themesbrand.com/velzon/html/default/assets/images/logo-sm.png"
                alt=""
                height="22"
              />
            </span>
            <span className="logo-lg">
              <img
                src="https://themesbrand.com/velzon/html/default/assets/images/logo-light.png"
                alt=""
                height="17"
              />
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
                    <li className="nav-item">
                      <Link to="/review" className="nav-link" data-key="t-chat">
                        Products Reviews
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

                    <li className="nav-item">
                      <div to="#" className="nav-link">
                        Payment
                      </div>
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
                      <div to="#" className="nav-link" data-key="t-maintenance">
                        Maintenance
                      </div>
                    </li>
                    <li className="nav-item">
                      <div to="#" className="nav-link" data-key="t-coming-soon">
                        Coming Soon
                      </div>
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
                        to="/advance-ui-sweetalerts"
                        className="nav-link"
                        data-key="t-sweet-alerts"
                      >
                        Bloges
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
