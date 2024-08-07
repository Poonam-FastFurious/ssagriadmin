/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaWhatsappSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/images/logonew.png";
import "react-toastify/dist/ReactToastify.css";
import { Baseurl } from "../confige";
function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const isEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const isEmailAddress = isEmail(usernameOrEmail);
      const payload = isEmailAddress
        ? { email: usernameOrEmail, password }
        : { username: usernameOrEmail, password };

      const response = await fetch(Baseurl + "/api/v1/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful login
        const { accessToken, refreshToken, user } = data.data;

        // Store in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("adminId", user._id);

        // Store in cookies
        Cookies.set("accessToken", accessToken, { expires: 1 }); // 1 day expiration
        Cookies.set("refreshToken", refreshToken, { expires: 7 }); // 7 days expiration
        Cookies.set("adminId", user._id, { expires: 7 });

        // Redirect to the dashboard or another page
        navigate("/");
      } else {
        // Handle errors
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <>
      <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
        <div className="bg-overlay"></div>

        <div className="auth-page-content overflow-hidden pt-lg-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="card overflow-hidden">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4 auth-one-bg h-100">
                        <div className="bg-overlay"></div>
                        <div className="position-relative h-100 d-flex flex-column">
                          <div className="mb-4">
                            <Link to="/" className="d-block">
                              <img src={logo} alt="" height="50" />
                            </Link>
                          </div>
                          <div className="mt-auto">
                            <div className="mb-3">
                              <i className="ri-double-quotes-l display-4 text-success"></i>
                            </div>

                            <div
                              id="qoutescarouselIndicators"
                              className="carousel slide"
                              data-bs-ride="carousel"
                            >
                              <div className="carousel-indicators">
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to="0"
                                  className="active"
                                  aria-current="true"
                                  aria-label="Slide 1"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to="1"
                                  aria-label="Slide 2"
                                ></button>
                                <button
                                  type="button"
                                  data-bs-target="#qoutescarouselIndicators"
                                  data-bs-slide-to="2"
                                  aria-label="Slide 3"
                                ></button>
                              </div>
                              <div className="carousel-inner text-center text-white-50 pb-5">
                                <div className="carousel-item active">
                                  <p className="fs-15 fst-italic">
                                    " Admin Dashboard Thanks very much! "
                                  </p>
                                </div>
                                <div className="carousel-item">
                                  <p className="fs-15 fst-italic">
                                    " SSagriculture is really great with an
                                    amazing customer support."
                                  </p>
                                </div>
                                <div className="carousel-item">
                                  <p className="fs-15 fst-italic">
                                    " SSagriculture is really great with an
                                    amazing customer support."
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Welcome Back !</h5>
                          <p className="text-muted">
                            Sign in to continue to SSAgriculture.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                              <label htmlFor="username" className="form-label">
                                Username
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                value={usernameOrEmail}
                                onChange={(e) =>
                                  setUsernameOrEmail(e.target.value)
                                }
                              />
                            </div>

                            <div className="mb-3">
                              <div className="float-end">
                                <Link to="#" className="text-muted">
                                  Forgot password?
                                </Link>
                              </div>
                              <label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password
                              </label>
                              <div className="position-relative auth-pass-inputgroup mb-3">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className="form-control pe-5 password-input"
                                  placeholder="Enter password"
                                  id="password-input"
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  id="password-addon"
                                  onClick={togglePasswordVisibility}
                                >
                                  <i
                                    className={`ri-${
                                      showPassword ? "eye-off" : "eye"
                                    }-fill align-middle`}
                                  ></i>
                                </button>
                              </div>
                            </div>
                            {error && (
                              <div className="alert alert-danger">{error}</div>
                            )}
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="auth-remember-check"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="auth-remember-check"
                              >
                                Remember me
                              </label>
                            </div>

                            <div className="mt-4">
                              <button
                                className="btn btn-success w-100"
                                type="submit"
                              >
                                Sign In
                              </button>
                            </div>

                            <div className="mt-4 text-center">
                              <div className="signin-other-title">
                                <h5 className="fs-13 mb-4 title">
                                  Admin Login dashboard
                                </h5>
                              </div>

                              <div
                                style={{
                                  visibility: "hidden",
                                  display: "flex",
                                  gap: "3px",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <button
                                  type="button"
                                  className="btn btn-primary btn-icon "
                                >
                                  <i className="ri-facebook-fill fs-16"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-danger btn-icon waves-effect waves-light text-xl"
                                >
                                  <FaWhatsappSquare />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-dark btn-icon waves-effect waves-light"
                                >
                                  <i className="ri-github-fill fs-16"></i>
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-info btn-icon waves-effect waves-light"
                                >
                                  <i className="ri-twitter-fill fs-16"></i>
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            <Link
                              to="#"
                              className="fw-semibold text-primary text-decoration-underline"
                            ></Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="text-center">
                  <p className="mb-0">
                    &copy; SS Agriqulture. Designe
                    <i className="mdi mdi-heart text-danger"></i> by Brandbell
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Signin;
