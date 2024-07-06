import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { Baseurl } from "../confige";

function Banner() {
  const [allbanner, setAllbanner] = useState([]);
  const [editBanner, setEditBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
    link: "",
    image: "",
  });

  const fetchbanner = async () => {
    try {
      const response = await fetch(Baseurl + "/api/v1/Banner/allabnner");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllbanner(data.data);
    } catch (err) {
      console.log("Error fetching banners: " + err.message);
    }
  };

  useEffect(() => {
    fetchbanner();
  }, []);

  const handleEdit = (banner) => {
    setEditBanner(banner._id);
    setFormData({
      title: banner.title,
      details: banner.details,
      link: banner.link,
      image: banner.image,
    });
    // Show modal
    const modal = document.getElementById("showModal");
    if (modal) {
      modal.classList.add("show");
      modal.style.display = "block";
      document.body.classList.add("modal-open");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(Baseurl + "/api/v1/Banner/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, id: editBanner }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success("Banner updated successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          fetchbanner();
          setEditBanner(null);
        },
      });
      // Close modal
      document.getElementById("close-modal").click();
    } catch (err) {
      console.log("Error updating banner: " + err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handeldelete = (bannerId) => {
    Swal.fire({
      title: "Delete Banner?",
      text: "Are you sure you want to Delete Banner?!",
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
        fetch(Baseurl + "/api/v1/Banner/delete", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: bannerId }),
        })
          .then((response) => {
            if (response.ok) {
              toast.success("Banner deleted successfully", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  fetchbanner();
                },
              });
            } else {
              throw new Error("Delete request failed");
            }
          })
          .catch((error) => {
            console.error("Error deleting banner:", error);
          });
      }
    });
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
                          to="/add-banner"
                          className="btn btn-success"
                          id="addproduct-btn"
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Banner
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
                            placeholder="Search Banners..."
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
            <table className="table table-striped align-middle table-nowrap mb-0">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Title</th>
                  <th scope="col">Details</th>
                  <th scope="col">Link</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {allbanner.map((banner, index) => (
                  <tr key={index}>
                    <th scope="row">
                      <img
                        style={{ maxWidth: "70px", maxHeight: "70px" }}
                        src={banner.image}
                        alt=""
                      />
                    </th>
                    <td>{banner.title}</td>
                    <td>{banner.details}</td>
                    <td>{banner.link}</td>
                    <td>
                      <div className="hstack gap-3 flex-wrap">
                        <Link
                          to="#"
                          className="link-success fs-15"
                          onClick={() => handleEdit(banner)}
                          data-bs-toggle="modal"
                          data-bs-target="#showModal"
                        >
                          <i className="ri-edit-2-line"></i>
                        </Link>
                        <Link
                          to="#"
                          className="link-danger fs-15"
                          onClick={() => {
                            handeldelete(banner._id);
                          }}
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

          {/* Edit Modal */}
          <div
            className="modal fade"
            id="showModal"
            tabIndex="-1"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header bg-light p-3">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Edit Banner
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="close-modal"
                  ></button>
                </div>
                <form
                  className="tablelist-form"
                  autoComplete="off"
                  onSubmit={handleUpdate}
                >
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="title-field" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title-field"
                        className="form-control"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="details-field" className="form-label">
                        Details
                      </label>
                      <input
                        type="text"
                        id="details-field"
                        className="form-control"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="link-field" className="form-label">
                        Link
                      </label>
                      <input
                        type="text"
                        id="link-field"
                        className="form-control"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="image-field" className="form-label">
                        Image
                      </label>
                      <input
                        type="text"
                        id="image-field"
                        className="form-control"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
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
          {/* End Edit Modal */}
        </div>
      </div>
    </>
  );
}

export default Banner;
