/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../confige";
import avtarimage from "../../src/assets/img/Avtar.jpg";
/* eslint-disable react/no-unescaped-entities */
function Profile() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editable, setEditable] = useState(false);
  const adminId = localStorage.getItem("adminId");
  const token = localStorage.getItem("accessToken");
  const [adminProfile, setAdminProfile] = useState("");
  const fetchAdminProfile = () => {
    fetch(`${Baseurl}/api/v1/admin/Profile?adminId=${adminId}`, {
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
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  // Function to toggle the editable state
  const toggleEditable = () => {
    setEditable(!editable);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    setError("");
    setSuccess("");

    // API request to change password
    fetch(Baseurl + "/api/v1/admin/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to change password");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess("Password changed successfully");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        console.error("Error changing password:", error);
        setError("Error changing password. Please try again.");
      });
  };
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="position-relative mx-n4 mt-n4">
              <div className="profile-wid-bg profile-setting-img">
                <img
                  src="https://themesbrand.com/velzon/html/master/assets/images/profile-bg.jpg"
                  className="profile-wid-img"
                  alt=""
                />
                <div className="overlay-content">
                  <div className="text-end p-3">
                    <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                      <input
                        id="profile-foreground-img-file-input"
                        type="file"
                        className="profile-foreground-img-file-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xxl-3">
                <div className="card">
                  <div className="card-body p-4">
                    <div className="text-center">
                      <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                        <img
                          src={avtarimage}
                          className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                          alt="user-profile-image"
                        />
                      </div>
                      <h5 className="fs-16 mb-1">{adminProfile.username}</h5>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-5">
                      <div className="flex-grow-1">
                        <h5 className="card-title mb-0">
                          Complete Your Profile
                        </h5>
                      </div>
                      <button
                        className="flex-shrink-0"
                        onClick={toggleEditable}
                      >
                        <Link className="badge bg-light text-primary fs-12">
                          <i className="ri-edit-box-line align-bottom me-1"></i>
                          Edit
                        </Link>
                      </button>
                    </div>
                    <div className="progress animated-progress custom-progress progress-label">
                      <div
                        className="progress-bar bg-danger"
                        role="progressbar"
                        style={{ width: "40%" }}
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div className="label">40%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-9">
                <div className="card ">
                  <div className="card-header">
                    <ul
                      className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <Link
                          className="nav-link active"
                          data-bs-toggle="tab"
                          to="#personalDetails"
                          role="tab"
                        >
                          <i className="fas fa-home"></i> Personal Details
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link"
                          data-bs-toggle="tab"
                          to="#changePassword"
                          role="tab"
                        >
                          <i className="far fa-user"></i> Change Password
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body p-4">
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="personalDetails"
                        role="tabpanel"
                      >
                        <form>
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="firstnameInput"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstnameInput"
                                  placeholder="Enter your firstname"
                                  value={adminProfile.firstName}
                                  disabled={!editable}
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="lastnameInput"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastnameInput"
                                  placeholder="Enter your lastname"
                                  value={adminProfile.lastName}
                                  disabled={!editable}
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="phonenumberInput"
                                  className="form-label"
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phonenumberInput"
                                  placeholder="Enter your phone number"
                                  disabled={!editable}
                                  value={adminProfile.phoneNumber}
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="emailInput"
                                  className="form-label"
                                >
                                  Email Address
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="emailInput"
                                  placeholder="Enter your email"
                                  disabled={!editable}
                                  value={adminProfile.email}
                                />
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="mb-3">
                                <label
                                  htmlFor="JoiningdatInput"
                                  className="form-label"
                                >
                                  Today Login time
                                </label>
                                <p>
                                  {new Date(
                                    adminProfile.loginTime
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>

                            <div className="col-lg-12"></div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="designationInput"
                                  className="form-label"
                                >
                                  Designation
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="designationInput"
                                  placeholder="Designation"
                                  disabled={!editable}
                                  value={adminProfile.designation}
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="websiteInput1"
                                  className="form-label"
                                >
                                  Website
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="websiteInput1"
                                  placeholder="www.example.com"
                                  disabled={!editable}
                                  value={adminProfile.website}
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label
                                  htmlFor="cityInput"
                                  className="form-label"
                                >
                                  City
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="cityInput"
                                  placeholder="City"
                                  disabled={!editable}
                                  value={adminProfile.city}
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label
                                  htmlFor="countryInput"
                                  className="form-label"
                                >
                                  Country
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="countryInput"
                                  placeholder="Country"
                                  disabled={!editable}
                                  value={adminProfile.country}
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div className="mb-3">
                                <label
                                  htmlFor="zipcodeInput"
                                  className="form-label"
                                >
                                  Zip Code
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  minLength="5"
                                  maxLength="6"
                                  id="zipcodeInput"
                                  placeholder="Enter zipcode"
                                  disabled={!editable}
                                  value={adminProfile.zipCode}
                                />
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="mb-3 pb-2">
                                <label
                                  htmlFor="exampleFormControlTextarea"
                                  className="form-label"
                                >
                                  Description
                                </label>
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea"
                                  placeholder="Enter your description"
                                  rows="3"
                                  disabled
                                >
                                  Hi I'm Anna Adame,It will be as simple as
                                  Occidental; in fact, it will be Occidental. To
                                  an English person, it will seem like
                                  simplified English, as a skeptical Cambridge
                                  friend of mine told me what Occidental is
                                  European languages are members of the same
                                  family.
                                </textarea>
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  Updates
                                </button>
                                <button
                                  onClick={toggleEditable}
                                  type="button"
                                  className="btn btn-soft-success"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div
                        className="tab-pane"
                        id="changePassword"
                        role="tabpanel"
                      >
                        <form onSubmit={handleSubmit}>
                          <div className="row g-2">
                            <div className="col-lg-4">
                              <div>
                                <label
                                  htmlFor="oldpasswordInput"
                                  className="form-label"
                                >
                                  Old Password*
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="oldpasswordInput"
                                  placeholder="Enter current password"
                                  value={oldPassword}
                                  onChange={(e) =>
                                    setOldPassword(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div>
                                <label
                                  htmlFor="newpasswordInput"
                                  className="form-label"
                                >
                                  New Password*
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="newpasswordInput"
                                  placeholder="Enter new password"
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-4">
                              <div>
                                <label
                                  htmlFor="confirmpasswordInput"
                                  className="form-label"
                                >
                                  Confirm Password*
                                </label>
                                <input
                                  type="password"
                                  className="form-control"
                                  id="confirmpasswordInput"
                                  placeholder="Confirm password"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-12"></div>

                            <div className="col-lg-12">
                              <div className="text-end">
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Change Password
                                </button>
                              </div>
                            </div>

                            {error && (
                              <div className="col-lg-12">
                                <div
                                  className="alert alert-danger"
                                  role="alert"
                                >
                                  {error}
                                </div>
                              </div>
                            )}

                            {success && (
                              <div className="col-lg-12">
                                <div
                                  className="alert alert-success"
                                  role="alert"
                                >
                                  {success}
                                </div>
                              </div>
                            )}
                          </div>
                        </form>
                        <div className="mt-4 mb-3 border-bottom pb-2">
                          <div className="float-end">
                            <Link to="#" className="link-primary">
                              All Logout
                            </Link>
                          </div>
                          <h5 className="card-title">Login History</h5>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-shrink-0 avatar-sm">
                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                              <i className="ri-smartphone-line"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>iPhone 12 Pro</h6>
                            <p className="text-muted mb-0">
                              Los Angeles, United States - March 16 at 2:47PM
                            </p>
                          </div>
                          <div>
                            <Link to="#">Logout</Link>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-shrink-0 avatar-sm">
                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                              <i className="ri-tablet-line"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>Apple iPad Pro</h6>
                            <p className="text-muted mb-0">
                              Washington, United States - November 06 at 10:43AM
                            </p>
                          </div>
                          <div>
                            <Link to="#">Logout</Link>
                          </div>
                        </div>
                        <div className="d-flex align-items-center mb-3">
                          <div className="flex-shrink-0 avatar-sm">
                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                              <i className="ri-smartphone-line"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>Galaxy S21 Ultra 5G</h6>
                            <p className="text-muted mb-0">
                              Conneticut, United States - June 12 at 3:24PM
                            </p>
                          </div>
                          <div>
                            <Link to="#">Logout</Link>
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 avatar-sm">
                            <div className="avatar-title bg-light text-primary rounded-3 fs-18">
                              <i className="ri-macbook-line"></i>
                            </div>
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6>Dell Inspiron 14</h6>
                            <p className="text-muted mb-0">
                              Phoenix, United States - July 26 at 8:10AM
                            </p>
                          </div>
                          <div>
                            <Link to="#">Logout</Link>
                          </div>
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
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">© SS Agriculture</div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design & Develop by Brandbell
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Profile;
