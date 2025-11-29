import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom"; // React Router를 사용하기 위해 추가
import App from "./App"; // App 컴포넌트를 import

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router> {/* BrowserRouter로 앱을 감싸서 라우팅을 가능하게 만듦 */}
    <App /> {/* App 컴포넌트를 렌더링 */}
  </Router>
);
