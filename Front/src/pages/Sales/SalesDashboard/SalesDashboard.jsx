import React from "react";
import { Bar, Line } from "react-chartjs-2";
import { useTable } from "react-table";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const customerData = [
  { name: "Customer 1", count: 5 },
  { name: "Customer 2", count: 10 },
  { name: "Customer 3", count: 15 },
  { name: "Customer 4", count: 20 },
  { name: "Customer 5", count: 25 },
  { name: "Customer 6", count: 30 },
  { name: "Customer 7", count: 35 },
];

const orderData = [
  { name: "Order 1", count: 3 },
  { name: "Order 2", count: 7 },
  { name: "Order 3", count: 8 },
  { name: "Order 4", count: 15 },
  { name: "Order 5", count: 22 },
  { name: "Order 6", count: 26 },
  { name: "Order 7", count: 30 },
];

const productData = [
  { name: "Product 1", count: 2 },
  { name: "Product 2", count: 5 },
  { name: "Product 3", count: 8 },
  { name: "Product 4", count: 12 },
  { name: "Product 5", count: 18 },
  { name: "Product 6", count: 20 },
  { name: "Product 7", count: 25 },
];

const wastageData = [
  { name: "Wastage 1", count: 1 },
  { name: "Wastage 2", count: 3 },
  { name: "Wastage 3", count: 2 },
  { name: "Wastage 4", count: 5 },
  { name: "Wastage 5", count: 4 },
  { name: "Wastage 6", count: 6 },
  { name: "Wastage 7", count: 7 },
];

const SalesDashboard = () => {
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Customers",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        data: customerData.map((customer) => customer.count),
      },
      {
        label: "Orders",
        backgroundColor: "rgba(153,102,255,0.4)",
        borderColor: "rgba(153,102,255,1)",
        data: orderData.map((order) => order.count),
      },
      {
        label: "Products",
        backgroundColor: "rgba(255,159,64,0.4)",
        borderColor: "rgba(255,159,64,1)",
        data: productData.map((product) => product.count),
      },
      {
        label: "Wastage",
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        data: wastageData.map((wastage) => wastage.count),
      },
    ],
  };

  const tableData = React.useMemo(
    () =>
      orderData.map((order, index) => ({
        col1: customerData[index] ? customerData[index].name : "N/A",
        col2: order.name,
        col3: productData[index] ? productData[index].name : "N/A",
        col4: wastageData[index] ? wastageData[index].name : "N/A",
      })),
    []
  );

  const columns = React.useMemo(
    () => [
      { Header: "Customer", accessor: "col1" },
      { Header: "Order", accessor: "col2" },
      { Header: "Product", accessor: "col3" },
      { Header: "Wastage", accessor: "col4" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: tableData });

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header>Sales Dashboard</Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <img
                    src="/pic.JPG"
                    alt="Profile"
                    className="img-fluid rounded-circle mb-3"
                  />
                </Col>
                <Col md={8}>
                  <h5>User Profile</h5>
                  <p>Name: Prageeth Madhushan</p>
                  <p>Role: Sales Manager</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Customers and Orders</Card.Header>
            <Card.Body>
              <Bar data={chartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Header>Products and Wastage</Card.Header>
            <Card.Body>
              <Line data={chartData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <Card className="mb-4">
            <Card.Header>Details Table</Card.Header>
            <Card.Body>
              <Table {...getTableProps()} striped bordered hover>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SalesDashboard;
