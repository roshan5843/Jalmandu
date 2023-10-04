import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import User from '../models/userModel.js'
//import Seller from '../models/sellerModel.js'

//Portect routes
const protect = asyncHandler(async (req, res, next) => {
  let token

  //read the jwt from the coookie
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.userId).select('-password')
      //req.seller = await Seller.findById(decoded.userId).select('-password')
      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized, no failed')
    }
  } else {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && (req.user.isAdmin || req.user.isSeller)) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as admin')
  }
}

// // Seller middleware
// const seller = (req, res, next) => {
//   if (req.user && req.user.isSeller) {
//     next()
//   } else {
//     res.status(401)
//     throw new Error('Not authorized as seller')
//   }
// }

export { protect, admin }
