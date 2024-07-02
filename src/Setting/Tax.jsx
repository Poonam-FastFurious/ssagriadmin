/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "./Setting.css";
import { Link } from "react-router-dom";
import { Baseurl } from "../confige";

function Tax() {
  const [alltax, setAlltax] = useState([]);
  const [taxtitle, setTaxtitle] = useState("");
  const [taxpercentage, setTaxpercentage] = useState("");
  const [status, setStatus] = useState("active"); // Default to 'active'
  const [fetching, setFetching] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditmodal, setShowEditmodal] = useState(false);
  const [taxToEdit, setTaxToEdit] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://ssagriculturebackend.onrender.com/api/v1/tax/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taxTitle: taxtitle,
            taxPercentage: taxpercentage,
            status: status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add tax");
      }
      toast.success("Tax added successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          // Clear the form
          setTaxtitle("");
          setTaxpercentage("");
          setStatus("active");
          // Close the modal
          setShowModal(false);
        },
      });

      // Refetch the tax list
      fetchtax();
    } catch (error) {
      toast.error("Error adding tax: " + error.message);
      console.log("Error fetching taxes: " + error.message);
    }
  };
  const delettax = (taxId) => {
    Swal.fire({
      title: "Delete tax?",
      text: "Are you sure you want to Delete tax?!",
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
        fetch("https://ssagriculturebackend.onrender.com/api/v1/tax/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: taxId }), // Send the tax ID in the request body
        })
          .then((response) => {
            if (response.ok) {
              toast.success("tax delete successfully", {
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
  const fetchtax = async () => {
    try {
      setFetching(true);
      const response = await fetch(
        "https://ssagriculturebackend.onrender.com/api/v1/tax/alltax"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAlltax(data.data);
    } catch (err) {
      console.log("Error fetching taxes: " + "err.message");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchtax();
  }, []); // Empty dependency array ensures this runs once on mount
  const handleEdit = (taxId) => {
    // Find the tax to edit using its ID from the alltax array
    const taxToEdit = alltax.find((tax) => tax._id === taxId);
    if (taxToEdit) {
      setTaxToEdit(taxToEdit);
      setShowEditmodal(true);
    } else {
      // Handle error if tax not found
      console.error("Tax not found");
      toast.error("Tax not found");
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to update tax
      const response = await fetch(
        "https://ssagriculturebackend.onrender.com/api/v1/tax/update",
        {
          method: "PATCH", // Use PUT method for update
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: taxToEdit._id, // Pass the ID of the tax being edited
            taxTitle: taxToEdit.taxTitle,
            taxPercentage: taxToEdit.taxPercentage,
            status: taxToEdit.status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update tax");
      }
      toast.success("Tax updated successfully");
      setShowEditmodal(false); // Close the edit modal after successful update

      // Refetch the tax list
      fetchtax();
    } catch (error) {
      toast.error("Error updating tax: " + error.message);
      console.log("Error updating tax: " + error.message);
    }
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Tax</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">SS agriculture</Link>
                      </li>
                      <li className="breadcrumb-item active">Tax</li>
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
                          <h5 className="card-title mb-0">Tax List</h5>
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
                            onClick={() => setShowModal(true)}
                          >
                            <i className="ri-add-line align-bottom me-1"></i>
                            Add Taxes
                          </button>
                          <button type="button" className="btn btn-info">
                            <i className="ri-file-download-line align-bottom me-1"></i>
                            Import
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
                              placeholder="Search for customer, email, phone, status or something..."
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
                                  <option>Status</option>
                                  <option>All</option>
                                  <option>Active</option>
                                  <option>Block</option>
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
                                  />
                                </div>
                              </th>

                              <th className="sort">Title</th>
                              <th className="sort">Tax</th>
                              <th className="sort">Status</th>
                              <th className="sort">Action</th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {alltax.map((Tax, index) => (
                              <tr key={index}>
                                <th scope="row">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      name="chk_child"
                                    />
                                  </div>
                                </th>
                                <td className="customer_name">
                                  {Tax.taxTitle}
                                </td>
                                <td className="email">{Tax.taxPercentage}%</td>
                                <td className="phone">{Tax.status}</td>

                                <td>
                                  <ul className="list-inline hstack gap-2 mb-0">
                                    <li
                                      className="list-inline-item edit"
                                      title="Edit"
                                    >
                                      <Link
                                        to="#showModal"
                                        className="text-primary d-inline-block edit-item-btn"
                                        onClick={() => handleEdit(Tax._id)}
                                      >
                                        <i className="ri-pencil-fill fs-16"></i>
                                      </Link>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      title="Remove"
                                    >
                                      <Link
                                        className="text-danger d-inline-block remove-item-btn"
                                        to="#deleteRecordModal"
                                        onClick={() => delettax(Tax._id)}
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
                        {alltax.length === 0 && !fetching && (
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
                    {showModal && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
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
                                aria-label="Close"
                                id="close-modal"
                                onClick={() => setShowModal(false)}
                              ></button>
                            </div>
                            <form
                              className="tablelist-form"
                              onSubmit={handleSubmit}
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
                                    value={taxtitle}
                                    onChange={(e) =>
                                      setTaxtitle(e.target.value)
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a tax name.
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Tax Percentage
                                  </label>
                                  <input
                                    type="number"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Tax"
                                    required=""
                                    value={taxpercentage}
                                    onChange={(e) =>
                                      setTaxpercentage(e.target.value)
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a tax.
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
                                    onClick={() => setShowModal(false)}
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="add-btn"
                                  >
                                    Add Tax
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
                    {showEditmodal && (
                      <div
                        className="modal fade show"
                        style={{
                          display: "block",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
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
                                aria-label="Close"
                                id="close-modal"
                                onClick={() => setShowEditmodal(false)}
                              ></button>
                            </div>
                            <form
                              className="tablelist-form"
                              onSubmit={handleUpdate}
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
                                    value={taxToEdit.taxTitle}
                                    onChange={(e) =>
                                      setTaxToEdit({
                                        ...taxToEdit,
                                        taxTitle: e.target.value,
                                      })
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a tax name.
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label
                                    htmlFor="email-field"
                                    className="form-label"
                                  >
                                    Tax Percentage
                                  </label>
                                  <input
                                    type="number"
                                    id="email-field"
                                    className="form-control"
                                    placeholder="Enter Tax"
                                    required=""
                                    value={taxToEdit.taxPercentage}
                                    onChange={(e) =>
                                      setTaxToEdit({
                                        ...taxToEdit,
                                        taxPercentage: e.target.value,
                                      })
                                    }
                                  />
                                  <div className="invalid-feedback">
                                    Please enter a tax.
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
                                    value={taxToEdit.status}
                                    onChange={(e) =>
                                      setTaxToEdit({
                                        ...taxToEdit,
                                        status: e.target.value,
                                      })
                                    }
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
                                    onClick={() => setShowEditmodal(false)}
                                  >
                                    Close
                                  </button>
                                  {/* <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="add-btn"
                                  >
                                    Add Tax
                                  </button> */}
                                  <button
                                    type="submit"
                                    className="btn btn-success"
                                    id="edit-btn"
                                  >
                                    Update
                                  </button>
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

export default Tax;
