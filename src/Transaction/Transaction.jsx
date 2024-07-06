/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Baseurl } from "../confige";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // 10 items per page
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [statusFilter, setStatusFilter] = useState(""); // State for payment status filter

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(Baseurl + "/api/v1/payments");
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const userName = transaction.user?.fullName?.toLowerCase() || "";
    const userEmail = transaction.user?.email?.toLowerCase() || "";
    const transactionStatus = transaction.status?.toLowerCase() || "";

    const matchesSearchTerm =
      userName.includes(searchTerm.toLowerCase()) ||
      userEmail.includes(searchTerm.toLowerCase());
    const matchesStatus =
      !statusFilter || transactionStatus === statusFilter.toLowerCase();
    return matchesSearchTerm && matchesStatus;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
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
                              placeholder="Search for username or email..."
                              value={searchTerm}
                              onChange={handleSearchChange}
                            />
                            <i className="ri-search-line search-icon"></i>
                          </div>
                        </div>

                        <div className="col-xxl-2 col-sm-6">
                          <div>
                            <select
                              className="form-control"
                              value={statusFilter}
                              onChange={handleStatusChange}
                            >
                              <option value="">All Statuses</option>
                              <option value="paid">Paid</option>
                              <option value="pending">Pending</option>
                              <option value="failed">Failed</option>
                            </select>
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
                          <th scope="col">Customer Name</th>
                          <th scope="col">Transaction ID</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment Status</th>
                          <th scope="col">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTransactions.map((transaction, index) => (
                          <tr key={index}>
                            <th scope="row">{indexOfFirstItem + index + 1}</th>
                            <td>{transaction.user?.email}</td>
                            <td>{transaction.user?.fullName}</td>
                            <td>{transaction.paymentID}</td>
                            <td>
                              {new Date(
                                transaction.createdAt
                              ).toLocaleDateString()}
                            </td>
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
                              filteredTransactions.length / itemsPerPage
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
                            Math.ceil(
                              filteredTransactions.length / itemsPerPage
                            )
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
