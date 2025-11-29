// src/components/Pages/ShowList.jsx
import React, { useEffect, useState } from "react";
import ProductTable from "../Products/ProductTable";
import ProductModal from "../Products/ProductModal";

const BASE_URL = "https://6918280021a96359486eeaad.mockapi.io/products";

const ShowList = () => {
  const [products, setProducts] = useState([]);      // 상품 목록
  const [loading, setLoading] = useState(false);     // 로딩 상태
  const [error, setError] = useState("");            // 에러 메시지
  const [showModal, setShowModal] = useState(false); // 모달 ON/OFF
  const [editingProduct, setEditingProduct] = useState(null); // 수정 중인 상품

  // 상품 목록 불러오기 (GET)
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(BASE_URL, {
        headers: { "content-type": "application/json" },
      });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("상품 목록을 불러오는 데 실패했어.");
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 처음 렌더링될 때 한번 실행
  useEffect(() => {
    loadProducts();
  }, []);

  // "상품 추가" 버튼 눌렀을 때
  const handleOpenCreate = () => {
    setEditingProduct(null); // 새로 추가
    setShowModal(true);
  };

  // "수정" 버튼 눌렀을 때
  const handleEdit = (product) => {
    setEditingProduct(product); // 이 상품 데이터로 모달 채우기
    setShowModal(true);
  };

  // "삭제" 버튼 눌렀을 때
  const handleDelete = async (id) => {
    if (!window.confirm(`ID ${id}번 상품을 삭제할까?`)) return;

    try {
      const res = await fetch(`${BASE_URL}/${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(res.statusText);
      alert("삭제되었어.");
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("상품 삭제에 실패했어.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  // 모달에서 "저장" / "수정 완료" 눌렀을 때
  const handleModalSubmit = async (formData) => {
    const payload = {
      name: formData.name.trim(),
      category: formData.category.trim(),
      price: Number(formData.price),
      quantity: Number(formData.quantity),
    };

    try {
      if (editingProduct?.id) {
        // 수정 (PUT)
        const res = await fetch(
          `${BASE_URL}/${encodeURIComponent(editingProduct.id)}`,
          {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        if (!res.ok) throw new Error(res.statusText);
        alert("수정이 완료되었어.");
      } else {
        // 추가 (POST)
        const res = await fetch(BASE_URL, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(res.statusText);
        alert("상품이 추가되었어.");
      }
      handleModalClose();
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("저장에 실패했어.");
    }
  };

  return (
    <div>
      <h1>상품 관리</h1>

      <div className="wrap">
        {/* 상단 툴바 */}
        <div className="toolbar">
          <div className="toolbar-left">
            <strong>API:</strong>
            <code style={{ marginLeft: 4 }}>{BASE_URL}</code>
            <span className="badge">mockapi</span>
          </div>
          <div>
            <button
              type="button"
              className="btn-custom"
              onClick={handleOpenCreate}
            >
              상품 추가
            </button>
            <button
              type="button"
              className="btn-custom btn-gray"
              style={{ marginLeft: 8 }}
              onClick={loadProducts}
            >
              목록 새로고침
            </button>
          </div>
        </div>

        {/* 상태 표시 */}
        {loading && <p>불러오는 중...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* 테이블 */}
        {!loading && !error && (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* 모달 */}
      {showModal && (
        <ProductModal
          show={showModal}
          initialData={editingProduct}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

export default ShowList;
