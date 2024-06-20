/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10 items per page
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "https://ssagricultureapi.brandbell.in/api/v1/payments/"
        );
        const data = await response.json();
        if (data.success) {
          setTransactions(data.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Transactions</h4>

                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <Link to="">SSAgriculture</Link>
                      </li>
                      <li className="breadcrumb-item active">Transactions</li>
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
                        <h5 className="card-title mb-0">Transactions</h5>
                      </div>
                      <div className="col-sm-auto">
                        <div className="d-flex gap-1 flex-wrap">
                          <button type="button" className="btn btn-info">
                            <i className="ri-file-download-line align-bottom me-1"></i>
                            Import
                          </button>
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
                              <option value="Inprogress">Inprogress</option>
                              <option value="Cancelled">Cancelled</option>
                              <option value="Pickups">Pickups</option>
                              <option value="Returns">Returns</option>
                              <option value="Delivered">Delivered</option>
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
                              <option value="Mastercard">Mastercard</option>
                              <option value="Paypal">Paypal</option>
                              <option value="Visa">Visa</option>
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
                  <div
                    className="mt-2"
                    style={{ marginTop: "25px", backgroundColor: "white" }}
                  >
                    <table className="table  table-striped align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Id</th>
                          <th scope="col">Customer Email</th>
                          <th scope="col">Transaction ID</th>
                          <th scope="col">Order Status</th>
                          <th scope="col">Payment Status</th>
                          <th scope="col">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTransactions.map((transaction, index) => (
                          <tr key={index}>
                            <th scope="row">{indexOfFirstItem + index + 1}</th>
                            <td>user@gmail.com</td>
                            <td>{transaction.paymentID}</td>
                            <td>Pending</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav className="mt-3">
                      <ul className="pagination">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {Array.from(
                          {
                            length: Math.ceil(
                              transactions.length / itemsPerPage
                            ),
                          },
                          (_, index) => (
                            <li
                              key={index}
                              className={`page-item ${
                                currentPage === index + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(index + 1)}
                              >
                                {index + 1}
                              </button>
                            </li>
                          )
                        )}
                        <li
                          className={`page-item ${
                            currentPage ===
                            Math.ceil(transactions.length / itemsPerPage)
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
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

export default Transaction;
