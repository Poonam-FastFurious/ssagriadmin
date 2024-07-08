import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Baseurl } from "../confige";

/* eslint-disable react/no-unescaped-entities */
function Order() {
  const [orders, setOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [shiped, setShiped] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Calculate indexes for slicing current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination control handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setFetching(true);
        const response = await fetch(Baseurl + "/api/v1/order/allorder");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(data.data);
        const filteredCanceledOrders = data.data.filter(
          (order) => order.status === "Cancelled"
        );
        setCanceledOrders(filteredCanceledOrders);
        const filterdeliverd = data.data.filter(
          (order) => order.status === "Delivered"
        );
        setDelivered(filterdeliverd);

        const filtershiped = data.data.filter(
          (order) => order.status === "Shipped"
        );
        setShiped(filtershiped);
      } catch (err) {
        throw (new Error("data not fetch "), err);
      } finally {
        setFetching(false);
      }
    };

    fetchProducts();
  }, []);
  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrder) return;
    try {
      const response = await fetch(Baseurl + "/api/v1/order/updateorder", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID: selectedOrder.orderID, // assuming _id is the unique identifier for the order
          status: newStatus,
        }),
      });
      if (!response.ok) {
        console.log("error");
      }
      // Update the local state to reflect the status change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: newStatus }
            : order
        )
      );
      setCanceledOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === selectedOrder._id
            ? { ...order, status: newStatus }
            : order
        )
      );
      setSelectedOrder(null); // Close the modal
      toast.success("Status updated successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => {
          const modalElement = document.getElementById("showModal");
          const modal = window.bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
        },
      });
      // Hide the modal programmatically
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(orders.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Orders</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">SSAGRICULTURE</Link>
                      </li>
                      <li className="breadcrumb-item active">Orders</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card" id="orderList">
                  <div className="card-header border-0">
                    <div className="row align-items-center gy-3">
                      <div className="col-sm">
                        <h5 className="card-title mb-0">Order History</h5>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex gap-1 flex-wrap">
                          <button
                            className="btn btn-soft-danger"
                            id="remove-actions"
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border border-dashed border-end-0 border-start-0">
                    <form>
                      <div className="row g-3">
                        <div className="col-xxl-5 col-sm-6">
                          <div className="search-box">
                            <input
                              type="text"
                              className="form-control search"
                              placeholder="Search for order ID, customer, order status or something..."
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xxl-2 col-sm-6">
                          <div>
                            <input
                              type="date"
                              data-provider="flatpickr"
                              data-date-format="d M, Y"
                              data-multiple-date="true"
                              className="form-control"
                              data-range-date="true"
                              id="demo-datepicker"
                              placeholder="Select date"
                            />
                          </div>
                        </div>

                        <div className="col-xxl-2 col-sm-4">
                          <div>
                            <select
                              className="form-control"
                              data-choices=""
                              data-choices-search-false=""
                              name="choices-single-default"
                              id="idStatus"
                            >
                              <option value="">Status</option>
                              <option value="all" selected="">
                                All
                              </option>
                              <option value="Pending">Pending</option>
                              <option value="Inprogress">Processing</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Pickups">Shipped</option>
                              <option value="Returns">Delivered</option>
                              <option value="Delivered">Cancelled</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xxl-2 col-sm-4">
                          <div>
                            <select
                              className="form-control"
                              data-choices=""
                              data-choices-search-false=""
                              name="choices-single-default"
                              id="idPayment"
                            >
                              <option value="">Select Payment</option>
                              <option value="all" selected="">
                                All
                              </option>
                              <option value="Mastercard">Credit Card</option>
                              <option value="Paypal">Paypal</option>
                              <option value="Visa">Bank Transfer</option>
                              <option value="COD">COD</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-xxl-1 col-sm-4">
                          <div>
                            <button
                              type="button"
                              className="btn btn-primary w-100"
                            >
                              <i className="ri-equalizer-fill me-1 align-bottom"></i>
                              Filters
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="card-body pt-0">
                    <div>
                      <ul
                        className="nav nav-tabs nav-tabs-custom nav-success mb-3"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <Link
                            className="nav-link active All py-3"
                            data-bs-toggle="tab"
                            id="All"
                            to="#home1"
                            role="tab"
                            aria-selected="true"
                          >
                            <i className="ri-store-2-fill me-1 align-bottom"></i>
                            All Orders
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link py-3 Delivered"
                            data-bs-toggle="tab"
                            id="Delivered"
                            to="#delivered"
                            role="tab"
                            aria-selected="false"
                          >
                            <i className="ri-checkbox-circle-line me-1 align-bottom"></i>
                            Delivered
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link py-3 Pickups"
                            data-bs-toggle="tab"
                            id="Pickups"
                            to="#pickups"
                            role="tab"
                            aria-selected="false"
                          >
                            <i className="ri-truck-line me-1 align-bottom"></i>
                            Pickups
                            <span className="badge bg-danger align-middle ms-1">
                              2
                            </span>
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link
                            className="nav-link py-3 Cancelled"
                            data-bs-toggle="tab"
                            id="Cancelled"
                            to="#cancelled"
                            role="tab"
                            aria-selected="false"
                          >
                            <i className="ri-close-circle-line me-1 align-bottom"></i>
                            Cancelled
                          </Link>
                        </li>
                      </ul>
                      <div className="tab-content">
                        <div
                          className="tab-pane fade show active"
                          id="home1"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="product_name">
                                    Product
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {currentItems.reverse().map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAll"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer}
                                    </td>
                                    <td className="product_name">
                                      {order.products.length}
                                    </td>
                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        <li
                                          className="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <Link
                                            to="#showModal"
                                            data-bs-toggle="modal"
                                            className="text-primary d-inline-block edit-item-btn"
                                            onClick={() =>
                                              handleEditClick(order)
                                            }
                                          >
                                            <i className="ri-pencil-fill fs-16"></i>
                                          </Link>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <ul className="pagination justify-content-end">
                              {pageNumbers.map((number) => (
                                <li key={number} className="page-item">
                                  <button
                                    onClick={() => paginate(number)}
                                    className="page-link"
                                  >
                                    {number}
                                  </button>
                                </li>
                              ))}
                            </ul>
                            {orders.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="delivered"
                          role="tabpanel"
                        >
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="product_name">
                                    Product
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {delivered.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAllCancelled"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer}
                                    </td>
                                    <td className="product_name">
                                      {order.products.length}
                                    </td>
                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        <li
                                          className="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <Link
                                            to="#showModal"
                                            data-bs-toggle="modal"
                                            className="text-primary d-inline-block edit-item-btn"
                                            onClick={() =>
                                              handleEditClick(order)
                                            }
                                          >
                                            <i className="ri-pencil-fill fs-16"></i>
                                          </Link>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {delivered.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="pickups"
                          role="tabpanel"
                        >
                          {/* Pickups Orders Content */}
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="product_name">
                                    Product
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {shiped.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAllCancelled"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer}
                                    </td>
                                    <td className="product_name">
                                      {order.products.length}
                                    </td>
                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        <li
                                          className="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <Link
                                            to="#showModal"
                                            data-bs-toggle="modal"
                                            className="text-primary d-inline-block edit-item-btn"
                                            onClick={() =>
                                              handleEditClick(order)
                                            }
                                          >
                                            <i className="ri-pencil-fill fs-16"></i>
                                          </Link>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {shiped.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="cancelled"
                          role="tabpanel"
                        >
                          {/* Cancelled Orders Content */}
                          <div className="table-responsive table-card mb-1">
                            <table className="table table-nowrap align-middle">
                              <thead className="text-muted table-light">
                                <tr className="text-uppercase">
                                  <th scope="col" style={{ width: "25px" }}>
                                    <div className="form-check">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="checkAll"
                                        value="option"
                                      />
                                    </div>
                                  </th>
                                  <th className="sort" data-sort="id">
                                    Order ID
                                  </th>
                                  <th
                                    className="sort"
                                    data-sort="customer_name"
                                  >
                                    Customer
                                  </th>
                                  <th className="sort" data-sort="product_name">
                                    Product
                                  </th>
                                  <th className="sort" data-sort="date">
                                    Order Date
                                  </th>
                                  <th className="sort" data-sort="amount">
                                    Amount
                                  </th>
                                  <th className="sort" data-sort="payment">
                                    Payment Method
                                  </th>
                                  <th className="sort" data-sort="status">
                                    Delivery Status
                                  </th>
                                  <th className="sort" data-sort="city">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="list form-check-all">
                                {canceledOrders.map((order, index) => (
                                  <tr key={index}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          name="checkAllCancelled"
                                          value="option1"
                                        />
                                      </div>
                                    </th>
                                    <td className="id">
                                      <Link
                                        to={`${order._id}`}
                                        className="fw-medium link-primary"
                                      >
                                        {order.orderID}
                                      </Link>
                                    </td>
                                    <td className="customer_name">
                                      {order.customer}
                                    </td>
                                    <td className="product_name">
                                      {order.products.length}
                                    </td>
                                    <td className="date">
                                      {new Date(
                                        order.createdAt
                                      ).toLocaleDateString()}
                                    </td>
                                    <td className="amount">
                                      {order.totalAmount}
                                    </td>
                                    <td className="payment">
                                      {order.paymentInfo.method}
                                    </td>
                                    <td className="status">
                                      <span className="badge bg-warning-subtle text-warning text-uppercase">
                                        {order.status}
                                      </span>
                                    </td>
                                    <td>
                                      <ul className="list-inline hstack gap-2 mb-0">
                                        <li
                                          className="list-inline-item"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="View"
                                        >
                                          <Link
                                            to={`${order._id}`}
                                            className="text-primary d-inline-block"
                                          >
                                            <i className="ri-eye-fill fs-16"></i>
                                          </Link>
                                        </li>
                                        <li
                                          className="list-inline-item edit"
                                          data-bs-toggle="tooltip"
                                          data-bs-trigger="hover"
                                          data-bs-placement="top"
                                          title="Edit"
                                        >
                                          <Link
                                            to="#showModal"
                                            data-bs-toggle="modal"
                                            className="text-primary d-inline-block edit-item-btn"
                                            onClick={() =>
                                              handleEditClick(order)
                                            }
                                          >
                                            <i className="ri-pencil-fill fs-16"></i>
                                          </Link>
                                        </li>
                                      </ul>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {canceledOrders.length === 0 && !fetching && (
                              <div className="noresult">
                                <div className="text-center">
                                  <lord-icon
                                    src="../../../msoeawqm.json"
                                    trigger="loop"
                                    colors="primary:#121331,secondary:#08a88a"
                                    style={{ width: "75px", height: "75px" }}
                                  ></lord-icon>
                                  <h5 className="mt-2">
                                    Sorry! No Result Found
                                  </h5>
                                  <p className="text-muted mb-0">
                                    We've searched more than 150+ customers. We
                                    did not find any customer for your search.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="modal fade"
                      id="showModal"
                      tabIndex="-1"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header bg-light p-3">
                            <h5 className="modal-title" id="exampleModalLabel">
                              &nbsp;
                            </h5>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              id="close-modal"
                            ></button>
                          </div>
                          <form className="tablelist-form" autoComplete="off">
                            <div className="modal-body">
                              <input type="hidden" id="id-field" />

                              <div>
                                <label
                                  htmlFor="delivered-status"
                                  className="form-label"
                                >
                                  Delivery Status
                                </label>
                                <select
                                  className="form-control"
                                  data-trigger=""
                                  name="delivered-status"
                                  required=""
                                  id="delivered-status"
                                  value={newStatus}
                                  onChange={(e) => setNewStatus(e.target.value)}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Processing">Processing</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="Shipped">Shipped</option>
                                  <option value="Delivered">Delivered</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
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
                                  type="button"
                                  className="btn btn-success"
                                  id="edit-btn"
                                  onClick={handleUpdateStatus}
                                >
                                  Update
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
