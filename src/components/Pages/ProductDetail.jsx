import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // URL에서 상품 ID를 가져옵니다.
  const [product, setProduct] = useState(null);
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

  // 상품 데이터가 없으면 로딩 중 메시지를 표시
  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button onClick={() => navigate("/list")}>Back to List</button>
      <button onClick={() => navigate(`/update/${product.id}`)}>Edit Product</button>
    </div>
  );
};

export default ProductDetail;
