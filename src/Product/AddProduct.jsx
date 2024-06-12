import { useState } from "react";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import useFetch from "../Customhooks/useFetch";

function AddProduct() {
  const endpoint =
    "https://ssagriculturebackend.onrender.com/api/v1/category/allcategory";
  const { data, loading, error } = useFetch(endpoint);

  const [image, setImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const [oneTimePrice, setOneTimePrice] = useState("");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [productShortDescription, setProductShortDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [productTags, setProductTags] = useState("");
  const [status, setStatus] = useState("active");
  const [uploadloading, setUploadloading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handelthumbnailchange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handelsubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("thumbnail", thumbnail);
    formData.append("productTitle", productTitle);
    formData.append("description", description);
    formData.append("oneTimePrice", oneTimePrice);
    formData.append("subscriptionPrice", subscriptionPrice);
    formData.append("categoryName", categoryName);

    formData.append("productShortDescription", productShortDescription);
    formData.append("discountPercentage", discountPercentage);
    formData.append("rating", rating);
    formData.append("stock", stock);
    formData.append("visibility", visibility);
    formData.append("productTags", productTags);
    formData.append("status", status);

    try {
      setUploadloading(true);
      const response = await fetch(
        "https://ssagriculturebackend.onrender.com/api/v1/Product/add",
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
        toast.success("Product added successfully ", {
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
        throw new Error("Product upload failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("all field  required", {
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
      setUploadloading(false); // Set loading back to false after request completes
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Create Product</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">SSAgriculture</Link>
                      </li>
                      <li className="breadcrumb-item active">Create Product</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handelsubmit}
              id="createproduct-form"
              autoComplete="off"
              className="needs-validation"
              noValidate=""
            >
              <div className="row">
                <div className="col-lg-8">
                  <div className="card">
                    <div className="card-body">
                      <div className="mb-3">
                        <label
                          className="form-label"
                          htmlFor="product-title-input"
                        >
                          Product Title
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          name="productTitle"
                          onChange={(e) => setProductTitle(e.target.value)}
                          value={productTitle}
                        />
                        <div className="invalid-feedback">
                          Please Enter a product title.
                        </div>
                      </div>
                      <div>
                        <label>Product Description</label>

                        <CKEditor
                          editor={ClassicEditor}
                          data={description}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Product Gallery</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product Image</h5>
                        <p className="text-muted">Add Product main Image.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-100 start-100 translate-middle">
                              <label
                                htmlFor="product-image-input"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Image"
                              >
                                <div className="avatar-xs">
                                  <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                    <i className="ri-image-fill"></i>
                                  </div>
                                </div>
                              </label>
                              <input
                                className="form-control d-none"
                                id="product-image-input"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handleImageChange}
                              />
                            </div>
                            {image && (
                              <div className="avatar-lg">
                                <div className="avatar-title bg-light rounded">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    id="proimg"
                                    className="avatar-md h-auto"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product thumbnail</h5>
                        <p className="text-muted">Add Product thumbnail.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-100 start-100 translate-middle">
                              <label
                                htmlFor="product-thumbnail-input"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Image"
                              >
                                <div className="avatar-xs">
                                  <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                    <i className="ri-image-fill"></i>
                                  </div>
                                </div>
                              </label>
                              <input
                                className="form-control d-none"
                                id="product-thumbnail-input"
                                type="file"
                                accept="image/png, image/gif, image/jpeg"
                                onChange={handelthumbnailchange}
                              />
                            </div>
                            {thumbnail && (
                              <div className="avatar-lg">
                                <div className="avatar-title bg-light rounded">
                                  <img
                                    src={URL.createObjectURL(thumbnail)}
                                    id="product-img"
                                    className="avatar-md h-auto"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <ul
                        className="nav nav-tabs-custom card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <Link
                            className="nav-link active"
                            data-bs-toggle="tab"
                            to="#addproduct-general-info"
                            role="tab"
                          >
                            General Info
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <div className="card-body">
                      <div className="tab-content">
                        <div
                          className="tab-pane active"
                          id="addproduct-general-info"
                          role="tabpanel"
                        >
                          <div className="row">
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="stocks-input"
                                >
                                  Stocks
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="stocks-input"
                                  placeholder="Stocks"
                                  required=""
                                  onChange={(e) => setStock(e.target.value)}
                                  value={stock}
                                />
                                <div className="invalid-feedback">
                                  Please Enter a product stocks.
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-price-input"
                                >
                                  Price
                                </label>
                                <div className="input-group has-validation mb-3">
                                  <span
                                    className="input-group-text"
                                    id="product-price-addon"
                                  >
                                    Rs
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter price"
                                    aria-label="Price"
                                    aria-describedby="product-price-addon"
                                    required=""
                                    onChange={(e) =>
                                      setOneTimePrice(e.target.value)
                                    }
                                    value={oneTimePrice}
                                  />
                                  <div className="invalid-feedback">
                                    Please Enter a product price.
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="product-discount-input"
                                >
                                  Discount
                                </label>
                                <div className="input-group mb-3">
                                  <span
                                    className="input-group-text"
                                    id="product-discount-addon"
                                  >
                                    %
                                  </span>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="product-discount-input"
                                    placeholder="Enter discount"
                                    aria-label="discount"
                                    aria-describedby="product-discount-addon"
                                    onChange={(e) =>
                                      setDiscountPercentage(e.target.value)
                                    }
                                    value={discountPercentage}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="orders-input"
                                >
                                  Subscription price
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="orders-input"
                                  placeholder="s-price"
                                  required=""
                                  onChange={(e) =>
                                    setSubscriptionPrice(e.target.value)
                                  }
                                  value={subscriptionPrice}
                                />
                                <div className="invalid-feedback">
                                  Please Enter a product orders.
                                </div>
                              </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="orders-input"
                                >
                                  Rating
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  id="orders-input"
                                  placeholder="rating"
                                  required=""
                                  onChange={(e) => setRating(e.target.value)}
                                  value={rating}
                                />
                                <div className="invalid-feedback">
                                  Please Enter a product orders.
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className="tab-pane"
                          id="addproduct-metadata"
                          role="tabpanel"
                        >
                          <div className="row">
                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="meta-title-input"
                                >
                                  Meta title
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter meta title"
                                  id="meta-title-input"
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="mb-3">
                                <label
                                  className="form-label"
                                  htmlFor="meta-keywords-input"
                                >
                                  Meta Keywords
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter meta keywords"
                                  id="meta-keywords-input"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label
                              className="form-label"
                              htmlFor="meta-description-input"
                            >
                              Meta Description
                            </label>
                            <textarea
                              className="form-control"
                              id="meta-description-input"
                              placeholder="Enter meta description"
                              rows="3"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-end mb-3">
                    <button type="submit" className="btn btn-success w-sm">
                      Submit
                    </button>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Publish</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <label
                          htmlFor="choices-publish-status-input"
                          className="form-label"
                        >
                          Status
                        </label>

                        <select
                          className="form-select"
                          id="choices-publish-status-input"
                          data-choices=""
                          data-choices-search-false=""
                          onChange={(e) => setStatus(e.target.value)}
                          value={status}
                        >
                          <option value="active">active</option>
                          <option>inactive</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="choices-publish-visibility-input"
                          className="form-label"
                        >
                          Visibility
                        </label>
                        <select
                          className="form-select"
                          id="choices-publish-visibility-input"
                          onChange={(e) => setVisibility(e.target.value)}
                          value={visibility}
                        >
                          <option value="public">Public</option>
                          <option>Hidden</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Product Categories</h5>
                    </div>
                    <div className="card-body">
                      <p className="text-muted mb-2">Select product category</p>

                      <select
                        className="form-select"
                        id="choices-category-input"
                        name="choices-category-input"
                        data-choices=""
                        data-choices-search-false=""
                        onChange={(e) => setCategoryName(e.target.value)}
                        value={categoryName}
                      >
                        {data.data.map((cat, index) => (
                          <option key={index} value={cat.title}>
                            {cat.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Product Tags</h5>
                    </div>
                    <div className="card-body">
                      <div className="hstack gap-3 align-items-start">
                        <div className="flex-grow-1">
                          <input
                            className="form-control"
                            data-choices=""
                            data-choices-multiple-remove="true"
                            placeholder="Enter tags"
                            type="text"
                            onChange={(e) => setProductTags(e.target.value)}
                            value={productTags}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">
                        Product Short Description
                      </h5>
                    </div>
                    <div className="card-body">
                      <p className="text-muted mb-2">
                        Add short description for product
                      </p>
                      <textarea
                        className="form-control"
                        placeholder="Must enter minimum of a 100 characters"
                        rows="3"
                        onChange={(e) =>
                          setProductShortDescription(e.target.value)
                        }
                        value={productShortDescription}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              {uploadloading && (
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

export default AddProduct;
