import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Register a new user
export const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ _id: user._id }, secretKey);
    // user.tokens = user.tokens.concat({ token });
    await user.save();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Logout a user (delete the current token)
export const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Logout a user (delete all tokens)
export const logoutAll =  async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get the current user
export const getCurrentUser = async (req, res) => {
  res.send(req.user);
};





// /* READ */

// export const getUser = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const user = await User.findById(id);
//     response.status(200).json(user);
//   } catch (error) {
//     response.status(404).json({ error: error.message });
//   }
// };

// export const getUserFriends = async (request, response) => {
//   try {
//     const { id } = request.params;
//     const user = await User.findById(id);
//     const friends = await Promise.all(
//       user.friends.map((id) => User.findById(id))
//     );

//     const formatterFriends = friends.map(
//       ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//         return { _id, firstName, lastName, occupation, location, picturePath };
//       }
//     );
//     response.status(200).json(formatterFriends);
//   } catch (error) {
//     response.status(404).json({ error: error.message });
//   }
// };

// /* UPDATE */
// export const addRemoveFriend = async (request, response) => {
//     try{
//         const {id,friendId} = request.params;
//         const user = await User.findById(id);
//         const friend = await User.findById(friendId);

//         if(user.friends.includes(friendId)){
//             user.friends = user.friends.filter(id=> id !== friendId);
//             friend.friends = friend.friends.filter(id => id !== friendId);
//         }else{
//             user.friends.push(friendId);
//             friend.friends.push(friendId);
//         }

//         await user.save();
//         await friend.save();

//         const friends = await Promise.all(
//             user.friends.map((id) => User.findById(id))
//           );
      
//           const formatterFriends = friends.map(
//             ({ _id, firstName, lastName, occupation, location, picturePath }) => {
//               return { _id, firstName, lastName, occupation, location, picturePath };
//             }
//           );
          
//         response.status(200).json(formatterFriends);
//     }catch(error){
//         response.status(404).json({error:error.message});
//     }
// }