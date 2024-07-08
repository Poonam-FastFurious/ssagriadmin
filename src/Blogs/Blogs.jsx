import { useState, useEffect } from "react";
import { Baseurl } from "../confige";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/blog/allblogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        const data = await response.json();
        setBlogPosts(data.data); // Assuming data.data contains the array of blog posts
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Optional: Replace with a loading spinner or component
  }

  if (error) {
    return <p>Error: {error}</p>; // Optional: Replace with an error message or component
  }

  return (
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
                    <li className="breadcrumb-item active">Blogs List </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="tab-pane active" id="productnav-all" role="tabpanel">
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
                    <th scope="col">content</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">author</th>
                    <th scope="col">gallery</th>
                  </tr>
                </thead>
                <tbody>
                  {blogPosts.map((post, index) => (
                    <tr key={index}>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id={`cardtableCheck${index}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`cardtableCheck${index}`}
                          ></label>
                        </div>
                      </td>
                      <td>
                        <div
                          dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                      </td>
                      <td>{post.title}</td>
                      <td>
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{post.author}</td>
                      <td>
                        <div className="gallery">
                          {post.gallery.map((image, idx) => (
                            <img
                              key={idx}
                              src={image}
                              alt={`Gallery Image ${idx}`}
                              style={{ width: "50px", marginRight: "5px" }}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
