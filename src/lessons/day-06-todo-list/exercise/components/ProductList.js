import classNames from 'classnames';
import './ProductListStyle.scss';

function ProductList({ productsList, onProductClick }) {

    const handleProductClick = (product, index) => {
        if (!onProductClick) {
            return;
        }
        onProductClick(product, index);
    };

    return (
        <ul className="product-list">
            {productsList.map((product, index) => (
                <li key={product.id}
                    className={classNames({
                        'product-item': true,
                        'available': product.status === 'available',
                        'out_of_stock': product.status === 'out_of_stock'
                    })}
                    onClick={() => handleProductClick(product, index)}>
                    <h4>{product.name}</h4>
                    <p className="price">Price: ${product.price}</p>
                    <p className="status">Status: {product.status}</p>
                </li>
            ))}
        </ul>
    );
}

export default ProductList;
