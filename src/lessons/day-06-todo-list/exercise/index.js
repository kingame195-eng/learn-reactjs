
// BƯỚC 1: IMPORTS
import React, { useState } from 'react';
import ProductList from './components/ProductList'; // ← IMPORT COMPONENT
import './components/ProductListStyle.scss'; // ← IMPORT CSS for filter buttons

export const ProductList_Status = {
    AVAILABLE: 'available',
    OUT_OF_STOCK: 'out_of_stock'
};

// BƯỚC 2: ĐỔI TÊN COMPONENT (ProductFeature thay vì ProductList)
function ProductFeature(props) {

    const initProductList = [
        {
            id: 1,
            name: 'iPhone 15',
            price: 999,
            status: ProductList_Status.AVAILABLE
        },
        {
            id: 2,
            name: 'MacBook Pro',
            price: 2499,
            status: ProductList_Status.OUT_OF_STOCK
        },
        {
            id: 3,
            name: 'AirPods',
            price: 249,
            status: ProductList_Status.AVAILABLE
        },
        {
            id: 4,
            name: 'Apple Watch',
            price: 399,
            status: ProductList_Status.AVAILABLE
        }
    ];

    const [productsList, setProductsList] = useState(initProductList);

    const [filterStatus, setFilterStatus] = useState('all');

    const handleProductClick = (product, index) => {
        const newProductsList = [...productsList];

        newProductsList[index] = {
            ...newProductsList[index],
            status: newProductsList[index].status === ProductList_Status.AVAILABLE
                ? ProductList_Status.OUT_OF_STOCK
                : ProductList_Status.AVAILABLE
        };

        setProductsList(newProductsList);
    };

    const handleShowAllClick = () => {
        setFilterStatus('all');
    };

    const handleShowAvailableClick = () => {
        setFilterStatus(ProductList_Status.AVAILABLE);
    };

    const handleShowOutOfStockClick = () => {
        setFilterStatus(ProductList_Status.OUT_OF_STOCK);
    };

    const renderProductList = productsList.filter(product =>
        filterStatus === 'all' ||           // Nếu filter = 'all' → hiển thị tất cả
        filterStatus === product.status     // Hoặc filter trùng với status của product
    );

    return (
        <div>
            <h3>🛒 Product List</h3>

            <div className="filter-buttons">
                <button
                    className={`filter-btn show-all ${filterStatus === 'all' ? 'active' : ''}`}
                    onClick={handleShowAllClick}
                >
                    Show All
                </button>
                <button
                    className={`filter-btn show-available ${filterStatus === ProductList_Status.AVAILABLE ? 'active' : ''}`}
                    onClick={handleShowAvailableClick}
                >
                    Available Only
                </button>
                <button
                    className={`filter-btn show-out-of-stock ${filterStatus === ProductList_Status.OUT_OF_STOCK ? 'active' : ''}`}
                    onClick={handleShowOutOfStockClick}
                >
                    Out of Stock
                </button>
            </div>

            <ProductList
                productsList={renderProductList}
                onProductClick={handleProductClick}
            />
        </div>
    );
}

export default ProductFeature;

