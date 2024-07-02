import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../Banner/Loader.css";
import { Baseurl } from "../confige";

function Addblogs() {
  const [thumbnail, setThumbnail] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleGalleryChange = (e) => {
    setGallery([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", author);

    for (let i = 0; i < gallery.length; i++) {
      formData.append("gallery", gallery[i]);
    }

    setLoading(true); // Start loader

    try {
      const response = await fetch(Baseurl + "/api/v1/blog/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.success) {
        toast.success("Blog post added successfully", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          onClose: () => {
            // Clear the form
            setTitle("");
            setThumbnail(null);
            setGallery([]);
            setContent("");
            setAuthor("");
            // Optionally navigate to another page after success
            navigate("/blogs");
          },
        });
      } else {
        throw new Error("Blog post creation failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Blog post creation failed", {
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
      setLoading(false); // Stop loader
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
                        <Link to="/add-blog" className="btn" id="addblog-btn">
                          Add Blog
                        </Link>
                      </div>
                    </div>
                    <div className="col-sm">
                      <div className="d-flex justify-content-sm-end">
                        <div className="search-box ms-2">
                          <Link
                            onClick={handleGoBack}
                            to="/blogs"
                            className="btn btn-success"
                            id="back-btn"
                          >
                            <i className="align-bottom me-1"></i> Back
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: "white" }}>
            <form
              onSubmit={handleSubmit}
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
                      <h4 className="card-title mb-0">Blog Thumbnail</h4>
                    </div>

                    <div className="card-body">
                      <input
                        type="file"
                        className="form-control"
                        name="thumbnail"
                        onChange={handleThumbnailChange}
                      />
                    </div>
                  </div>
                  {thumbnail && (
                    <ul className="list-unstyled mb-0" id="thumbnail-preview">
                      <li className="mt-2" id="thumbnail-preview-list">
                        <div className="border rounded">
                          <div className="d-flex p-2">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar-sm bg-light rounded">
                                <img
                                  src={URL.createObjectURL(thumbnail)}
                                  alt="Selected"
                                  style={{
                                    width: "300px",
                                    height: "auto",
                                  }}
                                  className="img-fluid rounded d-block"
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <div className="pt-1">
                                <h5 className="fs-14 mb-1" data-dz-name="">
                                  &nbsp;
                                </h5>
                                <p
                                  className="fs-13 text-muted mb-0"
                                  data-dz-size=""
                                ></p>
                                <strong
                                  className="error text-danger"
                                  data-dz-errormessage=""
                                ></strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title mb-0">Gallery Images</h4>
                    </div>
                    <div className="card-body">
                      <input
                        type="file"
                        className="form-control"
                        name="gallery"
                        multiple
                        onChange={handleGalleryChange}
                      />
                    </div>
                  </div>
                  {gallery.length > 0 && (
                    <ul className="list-unstyled mb-0" id="gallery-preview">
                      {gallery.map((image, index) => (
                        <li
                          key={index}
                          className="mt-2"
                          id="gallery-preview-list"
                        >
                          <div className="border rounded">
                            <div className="d-flex p-2">
                              <div className="flex-shrink-0 me-3">
                                <div className="avatar-sm bg-light rounded">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt="Selected"
                                    style={{
                                      width: "300px",
                                      height: "auto",
                                    }}
                                    className="img-fluid rounded d-block"
                                  />
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <div className="pt-1">
                                  <h5 className="fs-14 mb-1" data-dz-name="">
                                    &nbsp;
                                  </h5>
                                  <p
                                    className="fs-13 text-muted mb-0"
                                    data-dz-size=""
                                  ></p>
                                  <strong
                                    className="error text-danger"
                                    data-dz-errormessage=""
                                  ></strong>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mb-3 mt-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Content
                </label>
                <textarea
                  className="form-control"
                  id="content"
                  rows="8"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                )}
                {loading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addblogs;
