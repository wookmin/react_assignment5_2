import React from "react";
import { Route, Routes } from "react-router-dom"; // React Router를 사용하여 라우팅 설정
import ShowList from "./components/Pages/ShowList"; // 상품 목록 페이지
import ProductDetail from "./components/Pages/ProductDetail"; // 상품 상세 페이지
import ProductUpdate from "./components/Pages/ProductUpdate"; // 상품 수정 페이지

function App() {
  return (
    <div>
      <h1>My Product App</h1>
      <Routes>
        {/* 상품 목록 */}
        <Route path="/" element={<ShowList />} />
        <Route path="/list" element={<ShowList />} />
        
        {/* 상품 상세 페이지 */}
        <Route path="/detail/:id" element={<ProductDetail />} />
        
        {/* 상품 수정 페이지 */}
        <Route path="/update/:id" element={<ProductUpdate />} />
      </Routes>
    </div>
  );
}

export default App;
