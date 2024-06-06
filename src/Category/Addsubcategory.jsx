import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
function Addsubcategory() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
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
                          className="btn "
                          id="addproduct-btn"
                        >
                          Create Categories
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <Link
                            onClick={handleGoBack}
                            to="/add-product"
                            className="btn btn-success"
                            id="addproduct-btn"
                          >
                            <i className=" align-bottom me-1"></i> Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "white",
            }}
          >
            <form
              action=""
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                height: "100vh",
              }}
            >
              <div
                className="mb-4"
                style={{
                  paddingTop: "50px",
                }}
              >
                <label htmlFor="employeeName" className="form-label">
                  Select Category
                </label>
                <select
                  className="form-select mb-3"
                  aria-label="Default select example"
                >
                  <option selected>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">
                  Name
                </label>
                <input
                  style={{ padding: "15px" }}
                  type="text"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter  Name"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">
                  Slug
                </label>
                <input
                  style={{ padding: "15px" }}
                  type="text"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter  slug"
                />
              </div>
              <div className="" style={{ marginBottom: "2005px" }}>
                <button
                  type="submit"
                  className="btn btn-success"
                  style={{ marginTop: "15px" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addsubcategory;
