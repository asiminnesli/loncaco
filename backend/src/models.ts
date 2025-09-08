import mongoose, { Document, Schema } from "mongoose";

export interface IVendor extends Document {
    name: string;
}

const VendorSchema = new Schema<IVendor>({
    name: { type: String, required: true },
});

export const Vendor = mongoose.model<IVendor>("Vendor", VendorSchema);

export interface IParentProduct extends Document {
    name: string;
    vendor: mongoose.Types.ObjectId;
}

const ParentProductSchema = new Schema<IParentProduct>({
    name: { type: String, required: true },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
});

export const ParentProduct = mongoose.model<IParentProduct>(
    "ParentProduct",
    ParentProductSchema
);

export interface ICartItem {
    product: mongoose.Types.ObjectId;
    item_count: number;
    quantity: number;
    cogs: number;
}

export interface IOrder extends Document {
    cart_item: ICartItem[];
    payment_at: Date;
}

const OrderSchema = new Schema<IOrder>({
    cart_item: [
        {
            product: { type: Schema.Types.ObjectId, ref: "ParentProduct" },
            item_count: Number,
            quantity: Number,
            cogs: Number,
        },
    ],
    payment_at: { type: Date, required: true },
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);