import { Link } from "react-router-dom";

function StockOut() {
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Stock Out Products </h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">SSAgriculture</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        StockOut Product
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="tab-pane active"
              id="productnav-all"
              role="tabpanel"
            >
              <div className="table-responsive table-card">
                <table
                  className="table table-nowrap table-striped-columns mb-0"
                  style={{ backgroundColor: "white" }}
                >
                  <thead className="table-light">
                    <tr>
                      <th scope="col">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="cardtableCheck"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="cardtableCheck"
                          ></label>
                        </div>
                      </th>
                      <th scope="col">Product</th>
                      <th scope="col">Image</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                      <th scope="col">Type</th>
                      <th scope="col">Item Type</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="cardtableCheck04"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="cardtableCheck04"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <Link to="#" className="fw-semibold">
                          Half Sleeve Round Neck T-Shirts
                          <br />
                          Category : Fashion
                        </Link>
                      </td>
                      <td>50</td>
                      <td> $215.00</td>
                      <td>48</td>
                      <td>4.2</td>
                      <td>
                        <span className="badge bg-success">
                          12 Oct, 202110:05 AM
                        </span>
                      </td>
                      <td>
                        <div className="hstack gap-3 flex-wrap">
                          <Link to="#" className="link-success fs-15">
                            <i className="ri-edit-2-line"></i>
                          </Link>
                          <Link to="#" className="link-danger fs-15">
                            <i className="ri-delete-bin-line"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="cardtableCheck04"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="cardtableCheck04"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <Link to="#" className="fw-semibold">
                          Half Sleeve Round Neck T-Shirts
                          <br />
                          Category : Fashion
                        </Link>
                      </td>
                      <td>50</td>
                      <td> $215.00</td>
                      <td>48</td>
                      <td>4.2</td>
                      <td>
                        <span className="badge bg-success">
                          12 Oct, 202110:05 AM
                        </span>
                      </td>
                      <td>
                        <div className="hstack gap-3 flex-wrap">
                          <Link to="#" className="link-success fs-15">
                            <i className="ri-edit-2-line"></i>
                          </Link>
                          <Link to="#" className="link-danger fs-15">
                            <i className="ri-delete-bin-line"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>{" "}
                    <tr>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="cardtableCheck04"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="cardtableCheck04"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <Link to="#" className="fw-semibold">
                          Half Sleeve Round Neck T-Shirts
                          <br />
                          Category : Fashion
                        </Link>
                      </td>
                      <td>50</td>
                      <td> $215.00</td>
                      <td>48</td>
                      <td>4.2</td>
                      <td>
                        <span className="badge bg-success">
                          12 Oct, 202110:05 AM
                        </span>
                      </td>
                      <td>
                        <div className="hstack gap-3 flex-wrap">
                          <Link to="#" className="link-success fs-15">
                            <i className="ri-edit-2-line"></i>
                          </Link>
                          <Link to="#" className="link-danger fs-15">
                            <i className="ri-delete-bin-line"></i>
                          </Link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="cardtableCheck04"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="cardtableCheck04"
                          ></label>
                        </div>
                      </td>
                      <td>
                        <Link to="#" className="fw-semibold">
                          Half Sleeve Round Neck T-Shirts
                          <br />
                          Category : Fashion
                        </Link>
                      </td>
                      <td>50</td>
                      <td> $215.00</td>
                      <td>48</td>
                      <td>4.2</td>
                      <td>
                        <span className="badge bg-success">
                          12 Oct, 202110:05 AM
                        </span>
                      </td>
                      <td>
                        <div className="hstack gap-3 flex-wrap">
                          <Link to="#" className="link-success fs-15">
                            <i className="ri-edit-2-line"></i>
                          </Link>
                          <Link to="#" className="link-danger fs-15">
                            <i className="ri-delete-bin-line"></i>
                          </Link>
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
    </>
  );
}

export default StockOut;
