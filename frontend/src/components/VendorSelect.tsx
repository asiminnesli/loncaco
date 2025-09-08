import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VendorSelect: React.FC = () => {
    const [vendors, setVendors] = useState<string[]>([]);
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/vendors`).then(res => setVendors(res.data));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selected) {
            navigate(`/dashboard/${selected}`);
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ marginBottom: "1rem" }}>Vendor Seçimi</h1>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "1rem",
                }}
            >
                {vendors.map((v) => (
                    <div
                        key={v}
                        onClick={() => navigate(`/dashboard/${v}`)}
                        style={{
                            border: "1px solid #ccc",
                            padding: "1rem",
                            textAlign: "center",
                            cursor: "pointer",
                            color: "white",
                            backgroundColor: "#4f46e5", // mor
                            borderRadius: "0.5rem",
                            transition: "transform 0.2s, box-shadow 0.2s, background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.transform = "scale(1.05)";
                            el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                            el.style.backgroundColor = "#6366f1"; // hover renk
                        }}
                        onMouseLeave={(e) => {
                            const el = e.currentTarget as HTMLDivElement;
                            el.style.transform = "scale(1)";
                            el.style.boxShadow = "none";
                            el.style.backgroundColor = "#4f46e5"; // normal renk
                        }}
                    >
                        {v}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VendorSelect;