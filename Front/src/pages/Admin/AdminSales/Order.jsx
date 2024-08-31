import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./popup.css";
//import './Button.css';

const MySwal = withReactContent(Swal);

export default function Order() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/order/view");
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleAdd = async () => {
    const { value: formValues } = await MySwal.fire({
      title: "Add New Order",
      html: `
                <input id="swal-input1" class="swal2-input" placeholder="Order ID">
                <input id="swal-input2" class="swal2-input" placeholder="Customer ID">
                <input id="swal-input3" class="swal2-input" placeholder="Product ID">
                <input id="swal-input4" class="swal2-input" placeholder="Order Date" type="date">
                <input id="swal-input5" class="swal2-input" placeholder="Quantity" type="number">
                <input id="swal-input6" class="swal2-input" placeholder="Unit Price">
                <input id="swal-input7" class="swal2-input" placeholder="Status">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Add",
      preConfirm: () => {
        const orderId = document.getElementById("swal-input1").value;
        const customerId = document.getElementById("swal-input2").value;
        const productId = document.getElementById("swal-input3").value;
        const orderDate = document.getElementById("swal-input4").value;
        const quantity = document.getElementById("swal-input5").value;
        const unitPrice = document.getElementById("swal-input6").value;
        const status = document.getElementById("swal-input7").value;

        // Basic field validation
        if (
          !orderId ||
          !customerId ||
          !productId ||
          !orderDate ||
          !quantity ||
          !unitPrice ||
          !status
        ) {
          MySwal.showValidationMessage("All fields are required");
          return;
        }

        // Date format validation
        if (!/^\d{4}-\d{2}-\d{2}$/.test(orderDate)) {
          MySwal.showValidationMessage("Invalid date format");
          return;
        }

        // Quantity and unit price validation
        if (
          isNaN(quantity) ||
          isNaN(unitPrice) ||
          quantity <= 0 ||
          unitPrice <= 0
        ) {
          MySwal.showValidationMessage(
            "Quantity and unit price must be positive numbers"
          );
          return;
        }

        return [
          orderId,
          customerId,
          productId,
          orderDate,
          quantity,
          unitPrice,
          status,
        ];
      },
    });

    // Handle form submission
    if (formValues) {
      try {
        // Send request to add order
        await fetch(`http://localhost:3000/order/save`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: formValues[0],
            customerId: formValues[1],
            productId: formValues[2],
            orderDate: formValues[3],
            quantity: parseFloat(formValues[4]),
            unitPrice: parseFloat(formValues[5]),
            status: formValues[6],
          }),
        });
        MySwal.fire({
          icon: "success",
          title: "Added!",
          text: "New order has been added.",
        });
        fetchOrders();
      } catch (error) {
        console.error("Failed to add order:", error);
        MySwal.fire({
          icon: "error",
          title: "Failed to add!",
          text: "Adding new order failed.",
        });
      }
    }
  };

  const handleEdit = async (id, currentData) => {
    const currentDate = new Date(currentData.orderDate)
      .toISOString()
      .split("T")[0]; // Get current date from the order data

    const { value: formValues } = await MySwal.fire({
      title: "Edit Order",
      html: `
                <div class="swal-input-container">
                    <label for="swal-input1">Order ID:</label>
                    <input id="swal-input1" class="swal2-input" value="${
                      currentData.orderId
                    }">
                    <label for="swal-input2">Customer ID:</label>
                    <input id="swal-input2" class="swal2-input" value="${
                      currentData.customerId
                    }">
                    <label for="swal-input3">Product ID:</label>
                    <input id="swal-input3" class="swal2-input" value="${
                      currentData.productId
                    }">
                    <label for="swal-input4">Order Date:</label>
                    <input id="swal-input4" class="swal2-input" value="${currentDate}" type="date"> <!-- Set current date -->
                    <label for="swal-input5">Quantity:</label>
                    <input id="swal-input5" class="swal2-input" value="${
                      currentData.quantity
                    }" type="number">
                    <label for="swal-input6">Unit Price:</label>
                    <input id="swal-input6" class="swal2-input" value="${currentData.unitPrice.toFixed(
                      2
                    )}" type="number">
                    <label for="swal-input7">Status:</label>
                    <input id="swal-input7" class="swal2-input" value="${
                      currentData.status
                    }">
                </div>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save Changes",
      preConfirm: () => {
        const orderId = document.getElementById("swal-input1").value;
        const customerId = document.getElementById("swal-input2").value;
        const productId = document.getElementById("swal-input3").value;
        const orderDate = document.getElementById("swal-input4").value;
        const quantity = document.getElementById("swal-input5").value;
        const unitPrice = document.getElementById("swal-input6").value;
        const status = document.getElementById("swal-input7").value;

        // Basic field validation
        if (
          !orderId ||
          !customerId ||
          !productId ||
          !orderDate ||
          !quantity ||
          !unitPrice ||
          !status
        ) {
          MySwal.showValidationMessage("All fields are required");
          return;
        }

        // Date format validation
        if (!/^\d{4}-\d{2}-\d{2}$/.test(orderDate)) {
          MySwal.showValidationMessage("Invalid date format");
          return;
        }

        // Quantity and unit price validation
        if (
          isNaN(quantity) ||
          isNaN(unitPrice) ||
          quantity <= 0 ||
          unitPrice <= 0
        ) {
          MySwal.showValidationMessage(
            "Quantity and unit price must be positive numbers"
          );
          return;
        }

        return [
          orderId,
          customerId,
          productId,
          orderDate,
          quantity,
          unitPrice,
          status,
        ];
      },
    });

    // Handle form submission
    if (formValues) {
      try {
        // Send request to update order
        await fetch(`http://localhost:3000/order/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: formValues[0],
            customerId: formValues[1],
            productId: formValues[2],
            orderDate: formValues[3],
            quantity: parseFloat(formValues[4]),
            unitPrice: parseFloat(formValues[5]),
            status: formValues[6],
          }),
        });
        MySwal.fire({
          icon: "success",
          title: "Updated!",
          text: "Order has been updated.",
        });
        fetchOrders();
      } catch (error) {
        console.error("Failed to update order:", error);
        MySwal.fire({
          icon: "error",
          title: "Failed to update!",
          text: "Order update failed.",
        });
      }
    }
  };

  const handleRemove = async (id) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/order/delete/${id}`, {
          method: "DELETE",
        });
        MySwal.fire({
          title: "Deleted!",
          text: "Order has been deleted.",
          icon: "success",
        });
        fetchOrders();
      } catch (error) {
        console.error("Failed to delete order:", error);
        MySwal.fire({
          title: "Failed!",
          text: "Failed to delete order.",
          icon: "error",
        });
      }
    }
  };

  const filteredOrders = searchTerm
    ? orders.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.productId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : orders;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredOrders.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);

  const handlePrevPage = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const handleNextPage = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="shadow-lg p-6 bg-white rounded-lg">
      <div className="relative overflow-x-auto l:rounded-lg">
        <h2 className="text-3xl text-black pl-1 pt-2 ">Orders Detail</h2>

        <div className="mb-2 mt-5 flex items-center">
          <button
            onClick={handleAdd}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Order
          </button>
          <div className="relative ml-4">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8 a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="w-80 h-10 pl-10 pr-3 py-2 border border-blue-400 rounded-lg text-blue-500 focus:ring-blue-500 focus:border-red-500"
              placeholder="Search by Order ID, Customer ID, or Product ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-blue-100 dark:text-blue-100">
          <thead className="text-xs text-white uppercase bg-green-600 border-b border-blue-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Customer ID
              </th>
              <th scope="col" className="px-6 py-3">
                Product ID
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Unit Price
              </th>
              <th scope="col" className="px-6 py-3">
                Total Price
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                kg
              </th>
              <th scope="col" className="px-6 py-3">
                Rs.
              </th>
              <th scope="col" className="px-6 py-3">
                Rs.
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((order) => (
              <tr
                key={order.id}
                className="bg-[#cdf8da] text-black border-b border-[#4bf885] hover:bg-[#a1f0c6]"
              >
                <td className="px-6 py-3">{order.orderId}</td>
                <td className="px-6 py-3">{order.customerId}</td>
                <td className="px-6 py-3">{order.productId}</td>
                <td className="px-6 py-3">{formatDate(order.orderDate)}</td>
                <td className="px-6 py-3">{order.quantity}</td>
                <td className="px-6 py-3">{order.unitPrice.toFixed(2)}</td>
                <td className="px-6 py-3">
                  {(order.quantity * order.unitPrice).toFixed(2)}
                </td>
                <td className="px-6 py-3">{order.status}</td>
                <td className="px-6 py-3">
                  <button
                    className="font-medium text-white bg-yellow-500 hover:bg-yellow-600 py-1 px-3 rounded mr-2"
                    onClick={() => handleEdit(order.id, order)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-medium text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded"
                    onClick={() => handleRemove(order.id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        <nav
          className="flex items-center justify-between pt-2"
          aria-label="Table navigation"
        >
          <span className="pl-10 text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-black">
              {indexOfFirstRow + 1}-
              {indexOfLastRow > filteredOrders.length
                ? filteredOrders.length
                : indexOfLastRow}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-black">
              {filteredOrders.length}
            </span>{" "}
            orders out of{" "}
            <span className="font-semibold text-gray-900 dark:text-black">
              {orders.length}
            </span>
          </span>

          <ul className="pr-10 inline-flex -space-x-px rtl:space-x-reverse text-sm h-10">
            <li>
              <button
                onClick={handlePrevPage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => setCurrentPage(index + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 ${
                    currentPage === index + 1 ? "bg-gray-200" : ""
                  } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={handleNextPage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
