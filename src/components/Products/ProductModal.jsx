import React, { useEffect, useState } from "react";

const ProductModal = ({ show, initialData, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Modal data 설정
  useEffect(() => {
    if (initialData) {
      setName(initialData.name ?? "");
      setCategory(initialData.category ?? "");
      setPrice(initialData.price ?? "");
      setQuantity(initialData.quantity ?? "");
    } else {
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
    }
  }, [initialData, show]);

  // Modal이 닫혔을 때 아무것도 렌더링하지 않음
  if (!show) return null;

  // 유효성 검사
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedCategory = category.trim();
    const numPrice = parseFloat(price);
    const numQuantity = parseInt(quantity, 10);

    if (trimmedName.length < 2) {
      alert("상품명은 2글자 이상 입력해줘.");
      return;
    }
    if (!trimmedCategory) {
      alert("품목을 입력해줘.");
      return;
    }
    if (isNaN(numPrice) || numPrice < 0) {
      alert("가격은 0 이상 정수로 입력해줘.");
      return;
    }
    if (isNaN(numQuantity) || numQuantity < 0) {
      alert("수량은 0 이상 정수로 입력해줘.");
      return;
    }

    // 유효성 검사 통과 후 폼 제출
    onSubmit({
      name: trimmedName,
      category: trimmedCategory,
      price: numPrice,
      quantity: numQuantity,
    });
  };

  // 수정인지 추가인지 판단
  const isEdit = Boolean(initialData);

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>

      <div className="modal-container">
        <div className="modal-card">
          <h3 className="modal-title">{isEdit ? "상품 수정" : "상품 추가"}</h3>

          <form onSubmit={handleSubmit} className="modal-form">
            <label>상품명 *</label>
            <input
              type="text"
              className="modal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>품목 *</label>
            <input
              type="text"
              className="modal-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <div className="modal-row">
              <div className="modal-col">
                <label>가격(₩) *</label>
                <input
                  type="number"
                  className="modal-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="modal-col">
                <label>수량 *</label>
                <input
                  type="number"
                  className="modal-input"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                취소
              </button>

              <button type="submit" className="btn btn-primary">
                {isEdit ? "수정 완료" : "저장"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
