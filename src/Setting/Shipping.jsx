/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Baseurl } from "../confige";

function Shipping() {
  const [delivery, setDelivery] = useState([]);
  const [addmodal, setAddmodal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("");
  const [fetching, setFetching] = useState(false);
  const fetchdeliverycharg = async () => {
    try {
      setFetching(true);
      const response = await fetch(
        "https://ssagriculturebackend.onrender.com/api/v1/deliverycharg/all"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDelivery(data.data);
    } catch (err) {
      console.log("Error fetching taxes: " + err.messag);
    } finally {
      setFetching(false);
    }
  };
  useEffect(() => {
    fetchdeliverycharg();
  }, []);
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://ssagriculturebackend.onrender.com/api/v1/deliverycharg/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Title: title, Price: price, Status: status }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      toast.success("Coupon added successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          setAddmodal(false);
        },
      });

      // Refetch the tax list
      fetchdeliverycharg();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handeldelete = (deliveyId) => {
    Swal.fire({
      title: "Delete deliverycharg?",
      text: "Are you sure you want to Delete Charg?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete!",
      position: "top",
      customClass: {
        popup: "w-[30%] h-auto",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          "https://ssagriculturebackend.onrender.com/api/v1/deliverycharg/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: deliveyId }), // Send the tax ID in the request body
          }
        )
          .then((response) => {
            if (response.ok) {
              toast.success("deliverycharg delete successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  window.location.reload();
                },
              });
            } else {
              throw new Error("Delete request failed");
            }
          })
          .catch((error) => {
            console.error("Error deleting tax:", error);
            // Handle error, show notification, etc.
          });
      }
    });
  };
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Delivery Charge</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">SS Agriculture</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        Delivery Charge
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="customerList">
                  <div className="card-header border-bottom-dashed">
                    <div className="row g-4 align-items-center">
                      <div className="col-sm">
                        <div>
                          <h5 className="card-title mb-0">
                            Delivery Charge List
                          </h5>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex flex-wrap align-items-start gap-2">
                          <button
                            className="btn btn-soft-danger"
                            id="remove-actions "
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success add-btn"
                            id="create-btn"
                            onClick={() => setAddmodal(true)}
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add Delivery Charge
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border-bottom-dashed border-bottom">
                    <form>
                      <div className="row g-3">
                        <div className="col-xl-6">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search  something..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="row g-3">
                            <div className="col-sm-4">
                              <div className="">
                                <input
                                  type="date"
                                  className="form-control"
                                  id="datepicker-range"
                                  placeholder="Select date"
                                />
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div>
                                <select
                                  className="form-control"
                                  name="choices-single-default"
                                  id="idStatus"
                                >
                                  <option value="">Status</option>
                                  <option>All</option>
                                  <option value="Active">Active</option>
                                  <option value="Block">Block</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-sm-4">
                              <div>
                                <button
                                  type="button"
                                  className="btn btn-primary w-100"
                                >
                                  <i className="ri-equalizer-fill me-2 align-bottom"></i>
                                  Filters
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body">
                    <div>
                      <div className="table-responsive table-card mb-1">
                        <table
                          className="table align-middle"
                          id="customerTable"
                        >
                          <thead className="table-light text-muted">
                            <tr>
                              <th scope="col" style={{ width: "50px" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>
                              <th className="sort">Title</th>
                              <th className="sort">Price</th>

                              <th className="sort">Status</th>
                              <th className="sort">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {delivery.map((charg, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                      value="option1"
                                    />
                                  </div>
                                </th>
                                <td className="customer_name">{charg.Title}</td>
                                <td className="email">{charg.Price}</td>
                                <td className="phone">{charg.Status}</td>

                                <td>
                                  <ul className="list-inline hstack gap-2 mb-0">
                                    <li
                                      className="list-inline-item edit"
                                      title="Edit"
                                      onClick={() => seteditmodal(true)}
                                    >
                                      <Link
                                        to="#"
                                        className="text-primary d-inline-block edit-item-btn"
                                      >
                                        <i className="ri-pencil-fill fs-16"></i>
                                      </Link>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      title="Remove"
                                      onClick={() => {
                                        handeldelete(charg._id);
                                      }}
                                    >
                                      <Link
                                        className="text-danger d-inline-block remove-item-btn"
                                        to="#"
                                      >
                                        <i className="ri-delete-bin-5-fill fs-16"></i>
                                      </Link>
                                    </li>
                                  </ul>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {delivery.length === 0 && !fetching && (
                          <div className="noresult">
                            <div className="text-center">
                              <lord-icon
                                src="../../../msoeawqm.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "75px", height: "75px" }}
                              ></lord-icon>
                              <h5 className="mt-2">Sorry! No Result Found</h5>
                              <p className="text-muted mb-0">
                                We've searched more than 150+ customers. We did
                                not find any customer for your search.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="pagination-wrap hstack gap-2">
                          <Link
                            className="page-item pagination-prev disabled"
                            to="#"
                          >
                            Previous
                          </Link>
                          <ul className="pagination listjs-pagination mb-0"></ul>
                          <Link className="page-item pagination-next" to="#">
                            Next
                          </Link>
                        </div>
                      </div>
                    </div>
                    {addmodal && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        id="showModal"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered ">
                          <div className="modal-content">
                            <div className="modal-header bg-light p-3">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              ></h5>
                              <button
                                type="button"
                                className="btn-close"
                                id="close-modal"
                                onClick={() => setAddmodal(false)}
                              ></button>
                            </div>
                            <form
                              className="tablelist-form"
                              onSubmit={handelsubmit}
                            >
                              <div className="modal-body">
                                <input type="hidden" id="id-field" />
                                <div
                                  className="mb-3"
                                  id="modal-id"
                                  style={{ display: "none" }}
                                >
                                  <label
                                    htmlFor="id-field1"
                                    className="form-label"
                                  >
                                    ID
                                  </label>
                                  <input
                                    type="text"
                                    id="id-field1"
                                    className="form-control"
                                    placeholder="ID"
                                    readOnly=""
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="customername-field"
                                    className="form-label"
                                  >
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    id="customername-field"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    required=""
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a customer name.
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Price"
                                    required=""
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                  />
                                  <div className="invalid-feedback">
                                    Please enter an email.
                                  </div>
                                </div>

                                <div>
                                  <label
                                    htmlFor="status-field"
                                    className="form-label"
                                  >
                                    Status
                                  </label>
                                  <select
                                    className="form-control"
                                    name="status-field"
                                    id="status-field"
                                    required=""
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">inactive</option>
                                  </select>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => setAddmodal(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="add-btn"
                                  >
                                    Add Delivery Charge
                                  </button>
                                  {/* <button
                                    type="button"
                                    className="btn btn-success"
                                    id="edit-btn"
                                  >
                                    Update
                                  </button> */}
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                    {editmodal && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        id="showModal"
                        tabIndex="-1"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered ">
                          <div className="modal-content">
                            <div className="modal-header bg-light p-3">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              ></h5>
                              <button
                                type="button"
                                className="btn-close"
                                id="close-modal"
                                onClick={() => seteditmodal(false)}
                              ></button>
                            </div>
                            <form
                              className="tablelist-form"
                              onSubmit={handelsubmit}
                            >
                              <div className="modal-body">
                                <input type="hidden" id="id-field" />
                                <div
                                  className="mb-3"
                                  id="modal-id"
                                  style={{ display: "none" }}
                                >
                                  <label
                                    htmlFor="id-field1"
                                    className="form-label"
                                  >
                                    ID
                                  </label>
                                  <input
                                    type="text"
                                    id="id-field1"
                                    className="form-control"
                                    placeholder="ID"
                                    readOnly=""
                                  />
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="customername-field"
                                    className="form-label"
                                  >
                                    Title
                                  </label>
                                  <input
                                    type="text"
                                    id="customername-field"
                                    className="form-control"
                                    placeholder="Enter Title"
                                    required=""
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a customer name.
                                  </div>
                                </div>
                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Price
                                  </label>
                                  <input
                                    type="text"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Price"
                                    required=""
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                  />
                                  <div className="invalid-feedback">
                                    Please enter an email.
                                  </div>
                                </div>

                                <div>
                                  <label
                                    htmlFor="status-field"
                                    className="form-label"
                                  >
                                    Status
                                  </label>
                                  <select
                                    className="form-control"
                                    name="status-field"
                                    id="status-field"
                                    required=""
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                  >
                                    <option value="active">Active</option>
                                    <option value="inactive">inactive</option>
                                  </select>
                                </div>
                              </div>
                              <div className="modal-footer">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => setAddmodal(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="add-btn"
                                  >
                                    Add Delivery Charge
                                  </button>
                                  {/* <button
                                    type="button"
                                    className="btn btn-success"
                                    id="edit-btn"
                                  >
                                    Update
                                  </button> */}
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shipping;
