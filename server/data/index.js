import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId()
];

const productIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId()
];

const reviewIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId()
];

export const users = [
  {
    _id: userIds[0],
    firstName: "the",
    lastName: "alinnev",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    location: "San Fran, CA"
  },
  {
    _id: userIds[1],
    firstName: "thulasiraman",
    lastName: "Ralph",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    location: "New York, CA"
  },
  {
    _id: userIds[2],
    firstName: "Some",
    lastName: "Guy",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    location: "Canada, CA"
  },
  {
    _id: userIds[3],
    firstName: "Whatcha",
    lastName: "Doing",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    location: "Korea, CA"
  }
];

export const products = [
  {
    _id: productIds[0],
    productName: "Bridal Blouse",
    description: "Blouse worked with aari and zardhusi",
    productImage : "product1.jpeg",
    price: 5000,
    reviews: [
      reviewIds[0], reviewIds[1], reviewIds[2]
    ],
    catagory:"",
    quantity: 2,
    owner : userIds[0]
  },
  {
    _id: productIds[1],
    productName: "Muhurtham Saree",
    description: "silk Saree",
    productImage : "product2.jpeg",
    price: 15000,
    reviews: [
      reviewIds[2]
    ],
    catagory:"",
    quantity: 20,
    owner : userIds[0]
  },
  
];

export const reviews = [
{
  id_ :reviewIds[0],
  productId : productIds[0],
  review : "nice product",
  rating : 5,
  owner : userIds[1]
},
{
  id_ :reviewIds[1],
  productId : productIds[0],
  review : "Good",
  rating : 4,
  owner : userIds[2]
},
{
  id_ :reviewIds[2],
  productId : productIds[1],
  review : "Super collection",
  rating : 5,
  owner : userIds[3]
}
];