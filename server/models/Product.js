import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        productName:{
            type:String,
            required:true
        },
        description: { 
            type: String, 
            required: true },
        productImage : {
            type: String, 
            required: true
        },
        price: { 
            type: Number,
            required: true,
            validate(value) {
              if (value <= 0) {
                throw new Error('Price must be a positive number');
              }
            }    
        },
        reviews: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Review' }],
        catagory:String,
        quantity:Number,
        owner:{ 
            type: mongoose.Schema.Types.ObjectId, 
            required: true,
            ref: 'User' },
    },
    {
        timestamps:true
    }
);

const Product = mongoose.model("Product",productSchema);
export default Product;