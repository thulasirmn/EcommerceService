import Review from "../models/Review.js";

// Create a new review for a product
export const createReview = async (req, res) => {
    const review = new Review({
      ...req.body,
      product: req.params.id,
      owner: req.user._id,
    });
    try {
      await review.save();
      res.status(201).send(review);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Get all reviews for a product
  export const getAllReviews = async (req, res) => {
    const _id = req.params.id;
    try {
      const reviews = await Review.find({ product: _id });
      res.send(reviews);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  
  // Get a specific review by ID
  export const getReviewById =  async (req, res) => {
    const _id = req.params.id;
    try {
      const review = await Review.findById(_id);
      if (!review) {
        return res.status(404).send();
      }
      await review.populate('owner');
      res.send(review);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  // Update a review by ID
  export const updateReview = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["review", "rating"];
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    const _id = req.params.id;
    try {
      const review = await Review.findOne({ _id, owner: req.user._id });
      if (!review) {
        return res.status(404).send();
      }
      updates.forEach((update) => (review[update] = req.body[update]));
      await review.save();
      res.send(review);
    } catch (error) {
      res.status(400).send(error);
    }
  };
  
  // Delete a review by ID
  export const deleteReview = async (req, res) => {
    const _id = req.params.id;
    try {
      const review = await Review.findOneAndDelete({ _id, owner: req.user._id });
      if (!review) {
        return res.status(404).send();
      }
      res.send(review);
    } catch (error) {
      res.status(500).send(error);
    }
  };
  