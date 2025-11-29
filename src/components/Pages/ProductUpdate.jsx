import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductUpdate = () => {
  const { id } = useParams(); // URL에서 상품 ID를 가져옵니다.
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });
  const navigate = useNavigate();

  // 상품 데이터를 API에서 가져오는 함수
  useEffect(() => {
    const fetchProductDetail = async () => {
      const response = await fetch(`https://your-api-url/products/${id}`);
      const data = await response.json();
      setProduct(data);
    };

    fetchProductDetail();
  }, [id]);

  // 상품 정보를 수정하는 함수
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://your-api-url/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      alert("Product updated successfully!");
      navigate("/list"); // 수정 후 상품 목록으로 돌아감
    } else {
      alert("Failed to update product");
    }
  };

  // 상품 데이터가 없으면 로딩 중 메시지 표시
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
        </label>
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProductUpdate;
