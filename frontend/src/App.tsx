import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MonthlySalesChart from "./components/MonthlySalesChart";
import ProductSalesTable from "./components/ProductSalesTable";
import VendorSelect from "./components/VendorSelect";
import { useParams } from "react-router-dom";
import { CaretLeftIcon } from "@phosphor-icons/react";
const Dashboard: React.FC<{ vendor: string }> = ({ vendor }) => {
  return (
    <div style={{ padding: "2rem" }}>
      <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
        <CaretLeftIcon size={32} weight="bold" style={{ cursor: "pointer" }} onClick={() => window.history.back()} />
        <h1 style={{ marginBottom: "1rem" }}>{vendor} - Satış Dashboard</h1>
      </div>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap", // mobilde alt alta geçmesi için
        }}
      >
        {/* Sol taraf: Grafik */}
        <div style={{ flex: 1, minWidth: "300px", maxHeight: "300px" }}>
          <h2>Aylık Satış Grafiği</h2>
          <MonthlySalesChart vendor={vendor} />
        </div>

        {/* Sağ taraf: Tablo */}
        <div style={{ flex: 1, minWidth: "300px", maxHeight: "300px" }}>
          <h2>Ürün Bazlı Satış Tablosu</h2>
          <ProductSalesTable vendor={vendor} />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VendorSelect />} />
        <Route path="/dashboard/:vendor" element={<VendorDashboardWrapper />} />
      </Routes>
    </Router>
  );
};

// useParams ile vendor paramını alıp Dashboard’a gönderiyoruz

const VendorDashboardWrapper: React.FC = () => {
  const { vendor } = useParams<{ vendor: string }>();
  if (!vendor) return <div>Vendor bulunamadı</div>;
  return <Dashboard vendor={vendor} />;
};

export default App;