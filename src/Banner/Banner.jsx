import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

function Banner() {
  const [allbanner, setAllbanner] = useState([]);
  const fetchbanner = async () => {
    try {
      const response = await fetch(
        "https://ssagricultureapi.brandbell.in/api/v1/Banner/allabnner"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllbanner(data.data);
    } catch (err) {
      console.log("Error fetching taxes: " + err.message);
    }
  };
  useEffect(() => {
    fetchbanner();
  }, []);
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
        fetch(
          "https://ssagricultureapi.brandbell.in/api/v1/Banner/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: bannerId }), // Send the tax ID in the request body
          }
        )
          .then((response) => {
            if (response.ok) {
              toast.success("Banner delete successfully", {
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
                  <th scope="col">Image</th>
                  <th scope="col"> Title</th>
                  <th scope="col"> Details</th>
                  <th scope="col"> Link</th>

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
                        <Link to="#" className="link-success fs-15">
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
        </div>
      </div>
    </>
  );
}

export default Banner;
