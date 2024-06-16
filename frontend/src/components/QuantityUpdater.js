const QuantityUpdater = ({ quantity, handleIncrease, handleDecrease }) => {

    return (
        <div className="quantity-btn my-5">
            <button className="quantity-button-minus" onClick={handleDecrease} aria-label="Decrease Quantity" disabled={quantity <= 1}>-</button>
            <input type="number" disabled id="quantity" name="quantity" title="Qty" className="quantity-selector-input" value={quantity} min="1" max="6"/>
            <label className="qty-label" htmlFor='quantity'>Qty</label>
            <button className="quantity-button-plus" onClick={handleIncrease} aria-label="Increase Quantity" disabled={quantity >= 6}>+</button>
        </div>
    )
}

export default QuantityUpdater