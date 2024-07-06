/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../Customhooks/useFetch";
import { Baseurl } from "../confige";

function Customerlist() {
  const endpoint = Baseurl + "/api/v1/user/alluser";
  const { data, loading, error } = useFetch(endpoint);

  const [searchTerm, setSearchTerm] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = data.data.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Customers</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">SS agriculture</Link>
                      </li>
                      <li className="breadcrumb-item active">Customers</li>
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
                          <h5 className="card-title mb-0">Customer List</h5>
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
                              value={searchTerm}
                              onChange={handleSearch}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xl-6">
                          <div className="row g-3">
                            <div className="col-sm-4">
                              <div>
                                <select
                                  className="form-control"
                                  data-plugin="choices"
                                  data-choices=""
                                  data-choices-search-false=""
                                  name="choices-single-default"
                                  id="idStatus"
                                >
                                  <option value="">Status</option>
                                  <option value="all" selected="">
                                    All
                                  </option>
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
                              <th scope="col" style={{ width: "50px;" }}>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="checkAll"
                                    value="option"
                                  />
                                </div>
                              </th>

                              <th className="sort" data-sort="customer_name">
                                Customer
                              </th>
                              <th className="sort" data-sort="email">
                                Email
                              </th>
                              <th className="sort" data-sort="phone">
                                Phone
                              </th>
                              <th className="sort" data-sort="date">
                                Joining Date
                              </th>
                              <th className="sort" data-sort="status">
                                Status
                              </th>
                              <th className="sort" data-sort="action">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody className="list form-check-all">
                            {filteredUsers.map((user, index) => (
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

                                <td className="customer_name">
                                  {user.fullName}
                                </td>
                                <td className="email">{user.email}</td>
                                <td className="phone">{user.mobile}</td>
                                <td className="date">06 Apr, 2021</td>
                                <td className="status">
                                  <span className="badge bg-success-subtle text-success text-uppercase">
                                    Active
                                  </span>
                                </td>
                                <td>
                                  <ul className="list-inline hstack gap-2 mb-0">
                                    <li
                                      className="list-inline-item edit"
                                      data-bs-toggle="tooltip"
                                      data-bs-trigger="hover"
                                      data-bs-placement="top"
                                      title="Edit"
                                    >
                                      <Link
                                        to="#showModal"
                                        data-bs-toggle="modal"
                                        className="text-primary d-inline-block edit-item-btn"
                                      >
                                        <i className="ri-pencil-fill fs-16"></i>
                                      </Link>
                                    </li>
                                    <li
                                      className="list-inline-item"
                                      data-bs-toggle="tooltip"
                                      data-bs-trigger="hover"
                                      data-bs-placement="top"
                                      title="Remove"
                                    >
                                      <Link
                                        className="text-danger d-inline-block remove-item-btn"
                                        data-bs-toggle="modal"
                                        to="#deleteRecordModal"
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
                        <div className="noresult" style={{ display: "none" }}>
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
                              not find any customers for your search.
                            </p>
                          </div>
                        </div>
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

                    <div
                      className="modal fade zoomIn"
                      id="deleteRecordModal"
                      tabIndex="-1"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <button
                              type="button"
                              className="btn-close"
                              id="deleteRecord-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div className="modal-body">
                            <div className="mt-2 text-center">
                              <lord-icon
                                src="../../../gsqxdxog.json"
                                trigger="loop"
                                colors="primary:#f7b84b,secondary:#f06548"
                                style={{ width: "100px", height: "100px" }}
                              ></lord-icon>
                              <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                                <h4>Are you sure ?</h4>
                                <p className="text-muted mx-4 mb-0">
                                  Are you sure you want to remove this record ?
                                </p>
                              </div>
                            </div>
                            <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                              <button
                                type="button"
                                className="btn w-sm btn-light"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn w-sm btn-danger"
                                id="delete-record"
                              >
                                Yes, Delete It!
                              </button>
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
        </div>
      </div>
    </>
  );
}

export default Customerlist;
