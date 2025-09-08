import React, { useEffect, useState } from "react";
import axios from "axios";

type Product = {
    product: string;
    totalQuantity: number;
};

const ProductSalesTable: React.FC<{ vendor: string }> = ({ vendor }) => {
    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/sales/top-products-by-vendor?vendor=${vendor}`).then((res: any) => {
            if (Array.isArray(res.data) && res.data.length > 0) {
                if (res.data[0] && Array.isArray(res.data[0].topProducts)) {
                    setData(res.data[0].topProducts);
                } else {
                    setData(res as Product[]);
                }
            } else {
                setData([]);
            }
        });
    }, [vendor]);

    return (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Ürün</th>
                    <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Toplam Satış</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, idx) => (
                    <tr
                        key={d.product}
                        style={{
                            backgroundColor: idx % 2 === 0 ? "#f3f4f6" : "white", // zebra stripe
                            transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0f2fe")}
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = idx % 2 === 0 ? "#f3f4f6" : "white")
                        }
                    >
                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{d.product}</td>
                        <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{d.totalQuantity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductSalesTable;