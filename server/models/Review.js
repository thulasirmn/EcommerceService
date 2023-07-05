import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'Product' },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User' },
},
{
  timestamps:true
}
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;