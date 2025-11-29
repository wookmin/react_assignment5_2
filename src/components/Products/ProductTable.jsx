import React from "react";

const formatNumber = (n) => {
  if (!n) return "";
  return Number(n).toLocaleString("ko-KR");
};

const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <table aria-label="상품 목록">
      <thead>
        <tr>
          <th style={{ width: "60px" }}>ID</th>
          <th>상품명</th>
          <th>품목</th>
          <th style={{ width: "120px" }}>가격(₩)</th>
          <th style={{ width: "100px" }}>수량</th>
          <th style={{ width: "160px" }}>동작</th>
        </tr>
      </thead>
      <tbody>
        {(!products || products.length === 0) ? (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", color: "#777" }}>
              데이터가 없습니다.
            </td>
          </tr>
        ) : (
          products.map((p) => (
            <tr key={p.id}>
              <td className="num">{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td className="num">{formatNumber(p.price)}</td>
              <td className="num">{p.quantity}</td>
              <td>
                <button
                  type="button"
                  className="btn-custom"
                  onClick={() => onEdit(p)}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn-custom btn-gray"
                  style={{ marginLeft: "6px" }}
                  onClick={() => onDelete(p.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProductTable;
