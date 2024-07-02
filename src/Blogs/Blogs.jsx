import { useState, useEffect } from "react";
import { Baseurl } from "../confige";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          "https://ssagriculturebackend.onrender.com/api/v1/blog/allblogs"
        );
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
        <div className="row">
          <div className="col-12">
            <div className="justify-content-between d-flex align-items-center mt-3 mb-4">
              <h5 className="mb-0 pb-1 text-decoration-underline">Blog list</h5>
            </div>
            <div className="row">
              {blogPosts.map((blogPost) => (
                <div key={blogPost._id} className="col-xxl-6 mb-4">
                  <div className="card">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img
                          className="rounded-start img-fluid h-100 object-fit-cover"
                          src={blogPost.thumbnail}
                          alt="Card image"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-header">
                          <h5 className="card-title mb-0">{blogPost.title}</h5>
                        </div>
                        <div className="card-body">
                          <p className="card-text mb-2">{blogPost.content}</p>
                          <p className="card-text">
                            <small className="text-muted">
                              Last updated 3 mins ago
                            </small>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
