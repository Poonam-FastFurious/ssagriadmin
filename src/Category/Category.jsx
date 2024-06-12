import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useFetch from "../Customhooks/useFetch";

function Category() {
  const endpoint =
    "https://ssagriculturebackend.onrender.com/api/v1/category/allcategory";
  const { data, loading, error } = useFetch(endpoint);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://ssagriculturebackend.onrender.com/api/v1/category/delete?id=${id}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          Swal.fire("Deleted!", "Your category has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting category:", error);
          Swal.fire(
            "Error!",
            "There was an error deleting the category.",
            "error"
          );
        }
      }
    });
  };

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
                {data.data.map((item, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      <img
                        src={item.avatar}
                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                        alt=""
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.createdAt}</td>
                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <Link to="#" className="link-success fs-15">
                          <i className="ri-edit-2-line"></i>
                        </Link>
                        <Link
                          to="#"
                          className="link-danger fs-15"
                          onClick={() => handleDelete(item._id)}
                        >
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
