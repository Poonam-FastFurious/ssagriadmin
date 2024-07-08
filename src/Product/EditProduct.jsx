import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useState } from "react";
import { Baseurl } from "../confige";
import { toast } from "react-toastify";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("ID from useParams:", id);
  const [image, setImage] = useState(null);
  const [initialImage, setInitialImage] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const initialProductState = {
    id: id || "",
    productTitle: "",
    description: "",
    oneTimePrice: "",
    subscriptionPrice: "",
    category: "",
    productShortDescription: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    status: "",
    visibility: "",
    productTags: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
  };
  const [productData, setProductData] = useState(initialProductState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/Product/product?id=${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProductData(data.data); // Assuming response data contains product details
        setInitialImage(data.data.productImage);
        setThumbnail(data.data.thumbnail);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/category/allcategory");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.data); // Assuming response data contains category list
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchProduct();
    fetchCategories();
  }, [id]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Baseurl}/api/v1/Product/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
          id: id, // Include id in the request body
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      toast.success("Product Update  successfully ", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        onClose: () => {
          navigate("/Product");
        },
      }); // Assuming backend returns a success message or updated product data
      // Redirect or show success message
      // Redirect to products list page after successful update
    } catch (error) {
      console.error("Error updating product:", error);
      // Handle error, show error message to user
    }
  };

  if (loading) {
    return <p>Loading...</p>; // You can show a loading indicator while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Handle error state
  }

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
              id="createproduct-form"
              autoComplete="off"
              className="needs-validation"
              noValidate=""
              onSubmit={handleSubmit}
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
                          Product Id
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="product-title-input"
                          name="productTitle"
                          disabled
                          value={id}
                        />
                        <div className="invalid-feedback">
                          Please Enter a product title.
                        </div>
                      </div>
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
                          value={productData.productTitle}
                          onChange={handleInputChange}
                        />
                        <div className="invalid-feedback">
                          Please Enter a product title.
                        </div>
                      </div>
                      <div>
                        <label>Product Description</label>

                        <CKEditor
                          editor={ClassicEditor}
                          data={productData.description}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setProductData((prevData) => ({
                              ...prevData,
                              description: data,
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-body">
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product Image</h5>
                        <p className="text-muted">Add Product main Image.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-100 start-100 translate-middle">
                              {initialImage && (
                                <img
                                  src={initialImage}
                                  alt="Initial Product Image"
                                  className="avatar-md h-auto"
                                />
                              )}

                              {/* Display uploaded image if any */}
                              {image && (
                                <div className="avatar-lg">
                                  <div className="avatar-title bg-light rounded">
                                    <img
                                      src={URL.createObjectURL(image)}
                                      id="proimg"
                                      className="avatar-md h-auto"
                                      alt="Uploaded Product Image"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Placeholder or default image if none */}
                              {!initialImage && !image && (
                                <div className="avatar-lg">
                                  <div className="avatar-title bg-light rounded">
                                    <img
                                      src="/path/to/placeholder-image.jpg"
                                      id="proimg"
                                      className="avatar-md h-auto"
                                      alt="Placeholder Image"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Input for uploading image */}
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
                                onChange={(e) => setImage(e.target.files[0])}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Repeat similar logic for thumbnail */}
                      <div className="mb-4">
                        <h5 className="fs-14 mb-1">Product Thumbnail</h5>
                        <p className="text-muted">Add Product thumbnail.</p>
                        <div className="text-center">
                          <div className="position-relative d-inline-block">
                            <div className="position-absolute top-100 start-100 translate-middle">
                              {/* Display thumbnail if available */}
                              {thumbnail && (
                                <img
                                  src={thumbnail}
                                  alt="Initial Product Thumbnail"
                                  className="avatar-md h-auto"
                                />
                              )}

                              {/* Placeholder or default thumbnail if none */}
                              {!thumbnail && (
                                <div className="avatar-lg">
                                  <div className="avatar-title bg-light rounded">
                                    <img
                                      src="/path/to/placeholder-thumbnail.jpg"
                                      id="product-img"
                                      className="avatar-md h-auto"
                                      alt="Placeholder Thumbnail"
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Input for uploading thumbnail */}
                              <label
                                htmlFor="product-thumbnail-input"
                                className="mb-0"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                title="Select Thumbnail"
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
                              />
                            </div>
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
                                  type="number"
                                  className="form-control"
                                  id="product-stocks-input"
                                  name="stock"
                                  value={productData.stock}
                                  onChange={handleInputChange}
                                  required
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
                                    type="number"
                                    className="form-control"
                                    id="product-price-input"
                                    name="oneTimePrice"
                                    value={productData.oneTimePrice}
                                    onChange={handleInputChange}
                                    required
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
                                    name="discountPercentage"
                                    value={productData.discountPercentage}
                                    onChange={handleInputChange}
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
                                  name="subscriptionPrice"
                                  value={productData.subscriptionPrice}
                                  onChange={handleInputChange}
                                  required
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
                                  name="rating"
                                  value={productData.rating}
                                  onChange={handleInputChange}
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please Enter a product orders.
                                </div>
                              </div>
                            </div>
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
                          name="status"
                          value={productData.status}
                          onChange={handleInputChange}
                        >
                          <option>select options</option>
                          <option value="active">active</option>
                          <option value="inactive">inactive</option>
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
                          name="visibility"
                          value={productData.visibility}
                          onChange={handleInputChange}
                        >
                          <option>select options</option>
                          <option value="public">Public</option>
                          <option value="hidden">Hidden</option>
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
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.title}
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
                            name="productTags"
                            value={productData.productTags}
                            onChange={handleInputChange}
                            type="text"
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
                        name="productShortDescription"
                        value={productData.productShortDescription}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProduct;
