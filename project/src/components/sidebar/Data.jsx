import React, { useState, useEffect } from 'react';

const Data = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        fetch('http://localhost:3000/products/showProduct')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(productsData => {
                setProducts(productsData);
            })
            .catch(error => {
                console.error('There was a problem fetching the products:', error);
            });
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Available Product</th>
                        <th>Product Name</th>
                        <th>PID</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map over products array and display product information */}
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.available_product}</td>
                            <td>{product.product_name}</td>
                            <td>{product.pid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Data;
