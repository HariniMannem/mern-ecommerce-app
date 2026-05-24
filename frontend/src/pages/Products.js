import axios from "axios";
import { useEffect, useState } from "react";

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:4000/api/products", {
        name,
        price,
        description,
        image
      });

      fetchProducts();

      setName("");
      setPrice("");
      setDescription("");
      setImage("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image || "");
    setEditingId(product._id);
  };

  const updateProduct = async () => {
    try {
      await axios.put(`http://localhost:4000/api/products/${editingId}`, {
        name,
        price,
        description,
        image
      });

      fetchProducts();

      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setEditingId(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>E-Commerce Store</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <br />
      <br />

      <button onClick={editingId ? updateProduct : addProduct}>
        {editingId ? "Update Product" : "Add Product"}
      </button>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px"
        }}
      >
        {products.map((product) => (
          <div key={product._id} className="product-card">
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px"
                }}
              />
            )}

            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h3>₹{product.price}</h3>

            <button onClick={() => addToCart(product)}>
              Add To Cart
            </button>

            <button onClick={() => editProduct(product)}>
              Edit
            </button>

            <button onClick={() => deleteProduct(product._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;