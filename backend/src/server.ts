import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Order, Vendor } from "./models";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

app.get("/sales/monthly", async (req: Request, res: Response) => {
    try {
        const vendorQuery = req.query.vendor as string | undefined;

        const pipeline: any[] = [
            { $unwind: "$cart_item" },
            {
                $lookup: {
                    from: "parent_products",
                    localField: "cart_item.product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $lookup: {
                    from: "vendors",
                    localField: "product.vendor",
                    foreignField: "_id",
                    as: "vendor",
                },
            },
            { $unwind: "$vendor" },
        ];

        if (vendorQuery) {
            pipeline.push({ $match: { "vendor.name": vendorQuery } });
        }

        pipeline.push({
            $group: {
                _id: {
                    vendor: "$vendor.name",
                    year: { $year: "$payment_at" },
                    month: { $month: "$payment_at" },
                },
                totalQuantity: { $sum: "$cart_item.quantity" },
            },
        });

        pipeline.push({ $sort: { "_id.vendor": 1, "_id.year": 1, "_id.month": 1 } });

        const rawData = await Order.aggregate<{ _id: { vendor: string; year: number; month: number }; totalQuantity: number }>(pipeline);

        if (vendorQuery) {
            res.json(
                rawData.map(item => ({
                    year: item._id.year,
                    month: item._id.month,
                    totalQuantity: item.totalQuantity,
                }))
            );
        } else {
            const grouped: Record<string, { year: number; month: number; totalQuantity: number }[]> = {};
            rawData.forEach(item => {
                const vendorName = item._id.vendor;
                if (!grouped[vendorName]) grouped[vendorName] = [];
                grouped[vendorName].push({
                    year: item._id.year,
                    month: item._id.month,
                    totalQuantity: item.totalQuantity,
                });
            });
            res.json(grouped);
        }
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.get("/sales/top-products-by-vendor", async (req: Request, res: Response) => {
    try {
        const vendorQuery = req.query.vendor as string | undefined;

        const pipeline: any[] = [
            { $unwind: "$cart_item" },
            {
                $lookup: {
                    from: "parent_products",
                    localField: "cart_item.product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            { $unwind: "$product" },
            {
                $lookup: {
                    from: "vendors",
                    localField: "product.vendor",
                    foreignField: "_id",
                    as: "vendor",
                },
            },
            { $unwind: "$vendor" },
        ];

        if (vendorQuery) {
            pipeline.push({ $match: { "vendor.name": vendorQuery } });
        }

        pipeline.push({
            $group: {
                _id: { vendor: "$vendor.name", product: "$product.name" },
                totalQuantity: { $sum: "$cart_item.quantity" },
            },
        });

        pipeline.push({
            $sort: { "_id.vendor": 1, totalQuantity: -1 },
        });

        const rawData: { _id: { vendor: string; product: string }; totalQuantity: number }[] =
            await Order.aggregate(pipeline);

        // Vendor bazında top 5 ürün
        const topByVendor: Record<
            string,
            { product: string; totalQuantity: number }[]
        > = {};

        rawData.forEach(item => {
            const vendorName = item._id.vendor;
            if (!topByVendor[vendorName]) topByVendor[vendorName] = [];
            if (topByVendor[vendorName].length < 5) {
                topByVendor[vendorName].push({
                    product: item._id.product,
                    totalQuantity: item.totalQuantity,
                });
            }
        });

        const result = Object.entries(topByVendor).map(([vendor, products]) => ({
            vendor,
            topProducts: products,
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.get("/vendors", async (req: Request, res: Response) => {
    try {
        const vendors = await Vendor.find({}, { name: 1, _id: 0 });
        res.json(vendors.map(v => v.name));
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});


const PORT = process.env.PORT!;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});