import { Link } from "react-router-dom";

function Index() {
  return (
    <>
      {" "}
      <div className="main-content">
        <div className="page-content">
          <div className="col-xl-12 col-lg-8">
            <div>
              <div className="card">
                <div className="card-header border-0">
                  <div className="row g-4">
                    <div className="col-sm-auto">
                      <div>
                        <Link
                          to="/add-product"
                          className="btn btn-success"
                          id="addproduct-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Categories
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <input
                            type="text"
                            className="form-control"
                            id="searchProductList"
                            placeholder="Search Categories..."
                          />
                          <i className="ri-search-line search-icon"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="mt-2"
            style={{ marginTop: "25px", backgroundColor: "white" }}
          >
            <table className="table  table-striped align-middle table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Image</th>
                  <th scope="col"> Name</th>
                  <th scope="col"> Status</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Basic Plan</td>
                  <td>$860</td>
                  <td>Nov 22, 2021</td>

                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <Link
                        to="javascript:void(0);"
                        className="link-success fs-15"
                      >
                        <i className="ri-edit-2-line"></i>
                      </Link>
                      <Link
                        to="javascript:void(0);"
                        className="link-danger fs-15"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Premium Plan</td>
                  <td>$1200</td>
                  <td>Nov 10, 2021</td>

                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <Link
                        to="javascript:void(0);"
                        className="link-success fs-15"
                      >
                        <i className="ri-edit-2-line"></i>
                      </Link>
                      <Link
                        to="javascript:void(0);"
                        className="link-danger fs-15"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Basic Plan</td>
                  <td>$860</td>
                  <td>Nov 19, 2021</td>

                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <Link
                        to="javascript:void(0);"
                        className="link-success fs-15"
                      >
                        <i className="ri-edit-2-line"></i>
                      </Link>
                      <Link
                        to="javascript:void(0);"
                        className="link-danger fs-15"
                      >
                        <i className="ri-delete-bin-line"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">4</th>
                  <td>Corporate Plan</td>
                  <td>$1599</td>
                  <td>Nov 22, 2021</td>

                  <td>
                    <div className="hstack gap-3 flex-wrap">
                      <Link
                        to="javascript:void(0);"
                        className="link-success fs-15"
                      >
                        <i className="ri-edit-2-line"></i>
                      </Link>
                      <Link
                        to="javascript:void(0);"
                        className="link-danger fs-15"
                      >
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
    </>
  );
}

export default Index;
