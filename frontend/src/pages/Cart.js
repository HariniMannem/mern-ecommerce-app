function Cart({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
})  {
    const totalPrice = cartItems.reduce(
  (total, item) =>
    total +
    Number(item.price) * item.quantity,
  0
);
    return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Cart Page</h1>
<h2>Total: ₹{totalPrice}</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}
          >
            {item.image && (
  <img
    src={item.image}
    alt={item.name}
    style={{
      width: "200px",
      height: "150px",
      objectFit: "cover",
      borderRadius: "10px"
    }}
  />
)}
            <h2>{item.name}</h2>
           <div
  style={{
    display: "flex",
    gap: "10px",
    alignItems: "center"
  }}
>

  <button
    onClick={() =>
      decreaseQuantity(item._id)
    }
  >
    -
  </button>

  <p>Quantity: {item.quantity}</p>

  <button
    onClick={() =>
      increaseQuantity(item._id)
    }
  >
    +
  </button>

</div>
            <p>{item.description}</p>
            <h3>₹{item.price}</h3>
            <button
  onClick={() => removeFromCart(index)}
>
  Remove
</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;