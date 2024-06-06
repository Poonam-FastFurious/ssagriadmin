import { Link } from "react-router-dom";
import useFetch from "../Customhooks/useFetch";

function Category() {
  const endpoint = "/api/v1/category/allcategory";
  const { data, loading, error } = useFetch(endpoint);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
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
                          to="/add-category"
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
                  <th scope="col"> Title</th>
                  <th scope="col"> Date</th>

                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((items, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={items.avatar}
                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                        alt=""
                      />
                    </td>
                    <td>{items.title}</td>
                    <td>{items.createdAt}</td>

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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Category;
