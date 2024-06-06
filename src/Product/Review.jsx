import { Link } from "react-router-dom";

function Review() {
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Review Product</h5>
                </div>
                <div className="card-body">
                  <table
                    id="scroll-horizontal"
                    className="table nowrap align-middle"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "10px" }}>
                          <div className="form-check">
                            <input
                              className="form-check-input fs-15"
                              type="checkbox"
                              id="checkAll"
                              value="option"
                            />
                          </div>
                        </th>
                        <th>SR No.</th>
                        <th>Name</th>
                        <th>Product</th>
                        <th>Rating</th>
                        <th>Status</th>

                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          <div className="form-check">
                            <input
                              className="form-check-input fs-15"
                              type="checkbox"
                              name="checkAll"
                              value="option1"
                            />
                          </div>
                        </th>
                        <td>01</td>
                        <td>VLZ-452</td>
                        <td>VLZ1400087402</td>
                        <td>
                          <Link to="#!">Post launch reminder/ post list</Link>
                        </td>

                        <td>
                          <span className="badge bg-info-subtle text-info">
                            Re-open
                          </span>
                        </td>

                        <td>
                          <div className="dropdown d-inline-block">
                            <button
                              className="btn btn-soft-secondary btn-sm dropdown"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="ri-more-fill align-middle"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <Link to="#!" className="dropdown-item">
                                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                                  View
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item edit-item-btn">
                                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                  Edit
                                </Link>
                              </li>
                              <li>
                                <Link className="dropdown-item remove-item-btn">
                                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                  Delete
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Review;
