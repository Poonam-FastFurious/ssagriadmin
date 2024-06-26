import { useEffect, useState } from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";
function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `https://ssagricultureapi.brandbell.in/api/v1/order/singleorder/${id}`
        );
        const data = await response.json();
        setOrder(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Order Details</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="#">SS agriculture</Link>
                      </li>
                      <li className="breadcrumb-item active">Order Details</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-9">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex align-items-center">
                      <h5 className="card-title flex-grow-1 mb-0">
                        Order #{order.orderID}
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="apps-invoices-details"
                          className="btn btn-success btn-sm"
                        >
                          <i className="ri-download-2-fill align-middle me-1"></i>{" "}
                          Invoice
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive table-card">
                      <table className="table table-nowrap align-middle table-borderless mb-0">
                        <thead className="table-light text-muted">
                          <tr>
                            <th scope="col">Product Details</th>
                            <th scope="col">Item Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Rating</th>
                            <th scope="col" className="text-end">
                              Total Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.products.map((product, index) => (
                            <tr key={index}>
                              <td>
                                <div className="d-flex">
                                  <div className="flex-shrink-0 avatar-md bg-light rounded p-1">
                                    <img
                                      src="https://themesbrand.com/velzon/html/master/assets/images/products/img-8.png"
                                      alt=""
                                      className="img-fluid d-block"
                                    />
                                  </div>
                                  <div className="flex-grow-1 ms-3">
                                    <h5 className="fs-15">
                                      <Link
                                        to="apps-ecommerce-product-details"
                                        className="link-primary"
                                      >
                                        {product.product}
                                      </Link>
                                    </h5>
                                    <p className="text-muted mb-0">
                                      Color:
                                      <span className="fw-medium">Pink</span>
                                    </p>
                                    <p className="text-muted mb-0">
                                      Size: <span className="fw-medium">M</span>
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td>{product.price}</td>
                              <td>{product.quantity}</td>
                              <td>
                                <div className="text-warning fs-15">
                                  <i className="ri-star-fill"></i>
                                  <i className="ri-star-fill"></i>
                                  <i className="ri-star-fill"></i>
                                  <i className="ri-star-fill"></i>
                                  <i className="ri-star-half-fill"></i>
                                </div>
                              </td>
                              <td className="fw-medium text-end">$239.98</td>
                            </tr>
                          ))}

                          <tr className="border-top border-top-dashed">
                            <td colSpan="3"></td>
                            <td colSpan="2" className="fw-medium p-0">
                              <table className="table table-borderless mb-0">
                                <tbody>
                                  <tr>
                                    <td>Sub Total :</td>
                                    <td className="text-end">$359.96</td>
                                  </tr>
                                  <tr>
                                    <td>
                                      Discount{" "}
                                      <span className="text-muted">
                                        (VELZON15)
                                      </span>{" "}
                                      : :
                                    </td>
                                    <td className="text-end">-$53.99</td>
                                  </tr>
                                  <tr>
                                    <td>Shipping Charge :</td>
                                    <td className="text-end">$65.00</td>
                                  </tr>
                                  <tr>
                                    <td>Estimated Tax :</td>
                                    <td className="text-end">$44.99</td>
                                  </tr>
                                  <tr className="border-top border-top-dashed">
                                    <th scope="row">Total:</th>
                                    <th className="text-end">
                                      {order.totalAmount}
                                    </th>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="d-sm-flex align-items-center">
                      <h5 className="card-title flex-grow-1 mb-0">
                        Order Status
                      </h5>
                      <div className="flex-shrink-0 mt-2 mt-sm-0">
                        <Link
                          to="#"
                          className="btn btn-soft-info btn-sm mt-2 mt-sm-0"
                        >
                          <i className="ri-map-pin-line align-middle me-1"></i>{" "}
                          Change Address
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-soft-danger btn-sm mt-2 mt-sm-0"
                        >
                          <i className="mdi mdi-archive-remove-outline align-middle me-1"></i>{" "}
                          Cancel Order
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="profile-timeline">
                      <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample"
                      >
                        <div className="accordion-item border-0">
                          <div className="accordion-header" id="headingOne">
                            <Link
                              className="accordion-button p-2 shadow-none"
                              data-bs-toggle="collapse"
                              to="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 avatar-xs">
                                  <div className="avatar-title bg-success rounded-circle">
                                    <i className="ri-shopping-bag-line"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="fs-15 mb-0 fw-semibold">
                                    Order Placed -{" "}
                                    <span className="fw-normal">
                                      Wed, 15 Dec 2021
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div
                            id="collapseOne"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body ms-2 ps-5 pt-0">
                              <h6 className="mb-1">
                                An order has been placed.
                              </h6>
                              <p className="text-muted">
                                Wed, 15 Dec 2021 - 05:34PM
                              </p>

                              <h6 className="mb-1">
                                Seller has processed your order.
                              </h6>
                              <p className="text-muted mb-0">
                                Thu, 16 Dec 2021 - 5:48AM
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item border-0">
                          <div className="accordion-header" id="headingTwo">
                            <Link
                              className="accordion-button p-2 shadow-none"
                              data-bs-toggle="collapse"
                              to="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 avatar-xs">
                                  <div className="avatar-title bg-success rounded-circle">
                                    <i className="mdi mdi-gift-outline"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="fs-15 mb-1 fw-semibold">
                                    Packed -{" "}
                                    <span className="fw-normal">
                                      Thu, 16 Dec 2021
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body ms-2 ps-5 pt-0">
                              <h6 className="mb-1">
                                Your Item has been picked up by courier partner
                              </h6>
                              <p className="text-muted mb-0">
                                Fri, 17 Dec 2021 - 9:45AM
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item border-0">
                          <div className="accordion-header" id="headingThree">
                            <Link
                              className="accordion-button p-2 shadow-none"
                              data-bs-toggle="collapse"
                              to="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 avatar-xs">
                                  <div className="avatar-title bg-success rounded-circle">
                                    <i className="ri-truck-line"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="fs-15 mb-1 fw-semibold">
                                    Shipping -{" "}
                                    <span className="fw-normal">
                                      Thu, 16 Dec 2021
                                    </span>
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div
                            id="collapseThree"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body ms-2 ps-5 pt-0">
                              <h6 className="fs-14">
                                RQK Logistics - MFDS1400457854
                              </h6>
                              <h6 className="mb-1">
                                Your item has been shipped.
                              </h6>
                              <p className="text-muted mb-0">
                                Sat, 18 Dec 2021 - 4.54PM
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="accordion-item border-0">
                          <div className="accordion-header" id="headingFour">
                            <Link
                              className="accordion-button p-2 shadow-none"
                              data-bs-toggle="collapse"
                              to="#collapseFour"
                              aria-expanded="false"
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 avatar-xs">
                                  <div className="avatar-title bg-light text-success rounded-circle">
                                    <i className="ri-takeaway-fill"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="fs-14 mb-0 fw-semibold">
                                    Out For Delivery
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                        <div className="accordion-item border-0">
                          <div className="accordion-header" id="headingFive">
                            <Link
                              className="accordion-button p-2 shadow-none"
                              data-bs-toggle="collapse"
                              to="#collapseFile"
                              aria-expanded="false"
                            >
                              <div className="d-flex align-items-center">
                                <div className="flex-shrink-0 avatar-xs">
                                  <div className="avatar-title bg-light text-success rounded-circle">
                                    <i className="mdi mdi-package-variant"></i>
                                  </div>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6 className="fs-14 mb-0 fw-semibold">
                                    Delivered
                                  </h6>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <h5 className="card-title flex-grow-1 mb-0">
                        <i className="mdi mdi-truck-fast-outline align-middle me-1 text-muted"></i>
                        Logistics Details
                      </h5>
                      <div className="flex-shrink-0">
                        <Link
                          to="#"
                          className="badge bg-primary-subtle text-primary fs-11"
                        >
                          Track Order
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="text-center">
                      <TbTruckDelivery fontSize={"150px"} />
                      <h5 className="fs-16 mt-2">RQK Logistics</h5>
                      <p className="text-muted mb-0">ID: MFDS1400457854</p>
                      <p className="text-muted mb-0">
                        Payment Mode : Debit Card
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="d-flex">
                      <h5 className="card-title flex-grow-1 mb-0">
                        Customer Details
                      </h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled mb-0 vstack gap-3">
                      <li>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <img
                              src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-3.jpg"
                              alt=""
                              className="avatar-sm rounded"
                            />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h6 className="fs-14 mb-1">Joseph Parkers</h6>
                            <p className="text-muted mb-0">Customer</p>
                          </div>
                        </div>
                      </li>
                      <li>
                        <i className="ri-mail-line me-2 align-middle text-muted fs-16"></i>
                        josephparker@gmail.com
                      </li>
                      <li>
                        <i className="ri-phone-line me-2 align-middle text-muted fs-16"></i>
                        +(256) 245451 441
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">
                      <i className="ri-map-pin-line align-middle me-1 text-muted"></i>{" "}
                      Shipping Address
                    </h5>
                  </div>
                  <div className="card-body">
                    <ul className="list-unstyled vstack gap-2 fs-13 mb-0">
                      <li className="fw-medium fs-14">Joseph Parker</li>
                      <li>+(256) 245451 451</li>
                      <li>{order.shippingInfo.address}</li>
                      <li>
                        {order.shippingInfo.city} -{" "}
                        {order.shippingInfo.postalCode}
                      </li>
                      <li>{order.shippingInfo.country}</li>
                    </ul>
                  </div>
                </div>

                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">
                      <i className="ri-secure-payment-line align-bottom me-1 text-muted"></i>{" "}
                      Payment Details
                    </h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0">Transactions:</p>
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <h6 className="mb-0">#VLZ124561278124</h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0">Payment Method:</p>
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <h6 className="mb-0">{order.paymentInfo.method}</h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0">user Name:</p>
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <h6 className="mb-0">
                          {order.shippingInfo.phoneNumber}
                        </h6>
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-2"></div>
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0">
                        <p className="text-muted mb-0">Total Amount:</p>
                      </div>
                      <div className="flex-grow-1 ms-2">
                        <h6 className="mb-0">{order.totalAmount}</h6>
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

export default OrderDetails;
