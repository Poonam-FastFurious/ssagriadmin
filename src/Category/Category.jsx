import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useFetch from "../Customhooks/useFetch";
import { useState } from "react";
import { Baseurl } from "../confige";

function Category() {
  const endpoint = Baseurl + "/api/v1/category/allcategory";
  const { data, loading, error } = useFetch(endpoint);
  const [modalData, setModalData] = useState({
    id: "",
    title: "",
    slug: "",
    metaKeywords: "",
    metaDescription: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleEditModalOpen = (item) => {
    setModalData({
      id: item._id,
      title: item.title,
      slug: item.slug,
      metaKeywords: item.metaKeywords,
      metaDescription: item.metaDescription,
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    // Optionally reset modalData state if needed
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Baseurl}/api/v1/category/update`, {
        method: "PATCH", // Adjust method based on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: modalData.id,
          title: modalData.title,
          slug: modalData.slug,
          metaKeywords: modalData.metaKeywords,
          metaDescription: modalData.metaDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Assuming success, show success message
      Swal.fire("Updated!", "Your category has been updated.", "success");

      // Close modal after successful update
      setShowModal(false);

      // Optionally: Fetch updated data or update state to reflect changes
    } catch (error) {
      console.error("Error updating category:", error);
      Swal.fire("Error!", "There was an error updating the category.", "error");
    }
  };
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
            `${Baseurl}/api/v1/category/delete?id=${id}`,
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
                        <Link
                          to="#"
                          className="link-success fs-15"
                          onClick={() => handleEditModalOpen(item)}
                        >
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
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="showModal"
        tabIndex="-1"
        aria-hidden="true"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-light p-3">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleModalClose}
              ></button>
            </div>
            <form
              className="tablelist-form"
              autoComplete="off"
              onSubmit={handleUpdateCategory}
            >
              <div className="modal-body">
                <input type="hidden" id="id-field" value={modalData.id} />

                <div className="mb-3">
                  <label htmlFor="title-field" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title-field"
                    className="form-control"
                    placeholder="Enter title"
                    value={modalData.title}
                    onChange={(e) =>
                      setModalData({ ...modalData, title: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="slug-field" className="form-label">
                    Slug
                  </label>
                  <input
                    type="text"
                    id="slug-field"
                    className="form-control"
                    placeholder="Enter slug"
                    value={modalData.slug}
                    onChange={(e) =>
                      setModalData({ ...modalData, slug: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="metaKeywords-field" className="form-label">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    id="metaKeywords-field"
                    className="form-control"
                    placeholder="Enter meta keywords"
                    value={modalData.metaKeywords}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        metaKeywords: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="metaDescription-field" className="form-label">
                    Meta Description
                  </label>
                  <input
                    type="text"
                    id="metaDescription-field"
                    className="form-control"
                    placeholder="Enter meta description"
                    value={modalData.metaDescription}
                    onChange={(e) =>
                      setModalData({
                        ...modalData,
                        metaDescription: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-dismiss="modal"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
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
    </>
  );
}

export default Category;
