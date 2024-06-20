import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function AddCategories() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaKeywords, setMetakeywords] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const handleGoBack = () => {
    navigate(-1);
  };
  const handleImageChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  const handelsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("metaKeywords", metaKeywords);
    formData.append("metaDescription", metaDescription);
    formData.append("avatar", avatar);

    try {
      setLoading(true);
      const response = await fetch(
        "https://ssagricultureapi.brandbell.in/api/v1/category/add",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Category added successfully ", {
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
        throw new Error("category upload failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Banner upload failed", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false); // Set loading back to false after request completes
    }
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
              onSubmit={handelsubmit}
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                height: "100vh",
              }}
            >
              <div className="row" style={{ paddingTop: "10px" }}>
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0"> Set Image </h4>
                    </div>

                    <div className="card-body">
                      <input
                        type="file"
                        className="filepond filepond-input-multiple"
                        name="filepond"
                        data-allow-reorder="true"
                        data-max-file-size="3MB"
                        data-max-files="3"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter emploree name"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employeeName" className="form-label">
                  Slug
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="employeeName"
                  placeholder="Enter  slug"
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="StartleaveDate" className="form-label">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="StartleaveDate"
                  placeholder=" Enter meta"
                  onChange={(e) => setMetakeywords(e.target.value)}
                  value={metaKeywords}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="EndleaveDate" className="form-label">
                  Meta Description
                </label>
                <textarea
                  type="text-area"
                  className="form-control"
                  id="EndleaveDate"
                  rows="10"
                  cols="40"
                  placeholder="Enter  Meta Description "
                  onChange={(e) => setMetaDescription(e.target.value)}
                  value={metaDescription}
                />
              </div>

              <div className="">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </div>
              {loading && (
                <div className="loader">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddCategories;
