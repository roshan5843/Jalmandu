import asyncHandler from '../middleware/asyncHandler.js'
import generateToken from '../utils/generateToken.js'
import Seller from '../models/sellerModel.js'

// @desc    Auth seller & get token
// @route   POST /api/sellers/auth
// @access  Public
const authSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const seller = await Seller.findOne({ email })

  if (seller && (await seller.matchPassword(password))) {
    generateToken(res, seller._id)

    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      isSeller: seller.isSeller,
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// @desc    Register a new seller
// @route   POST /api/sellers
// @access  Public
const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password, panNumber } = req.body

  const sellerExists = await Seller.findOne({ email })

  if (sellerExists) {
    res.status(400)
    throw new Error('Seller already exists')
  }

  const seller = await Seller.create({
    name,
    email,
    password,
    panNumber,
  })

  if (seller) {
    generateToken(res, seller._id)

    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      panNumber: seller.panNumber,
      isSeller: seller.isSeller,
    })
  } else {
    res.status(400)
    throw new Error('Invalid seller data')
  }
})

// @desc    Logout seller / clear cookie
// @route   POST /api/sellers/logout
// @access  Public
const logoutSeller = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })
  res.status(200).json({ message: 'Logged out successfully' })
}

// @desc    Get seller profile
// @route   GET /api/sellers/profile
// @access  Private
const getSellerProfile = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id)

  if (seller) {
    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      isSeller: seller.isSeller,
    })
  } else {
    res.status(404)
    throw new Error('Seller not found')
  }
})

// @desc    Update seller profile
// @route   PUT /api/sellers/profile
// @access  Private
const updateSellerProfile = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id)

  if (seller) {
    seller.name = req.body.name || seller.name
    seller.email = req.body.email || seller.email

    if (req.body.password) {
      seller.password = req.body.password
    }

    const updatedSeller = await seller.save()

    res.json({
      _id: updatedSeller._id,
      name: updatedSeller.name,
      email: updatedSeller.email,
      panNumber: updatedSeller.panNumber,
      isSeller: updatedSeller.isSeller,
    })
  } else {
    res.status(404)
    throw new Error('Seller not found')
  }
})

// @desc    Get all sellers
// @route   GET /api/sellers
// @access  Private/Admin
const getSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({})
  res.json(sellers)
})

// @desc    Delete seller
// @route   DELETE /api/sellers/:id
// @access  Private/Admin
const deleteSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id)

  if (seller) {
    if (!seller.isAdmin) {
      await Seller.deleteOne({ _id: seller._id })
      res.json({ message: 'Seller removed' })
    } else {
      res.status(400)
      throw new Error('Cannot delete admin user')
    }
  } else {
    res.status(404)
    throw new Error('Seller not found')
  }
})

// @desc    Get seller by ID
// @route   GET /api/sellers/:id
// @access  Private/Admin
const getSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id).select('-password')

  if (seller) {
    res.json(seller)
  } else {
    res.status(404)
    throw new Error('Seller not found')
  }
})

// @desc    Update seller
// @route   PUT /api/sellers/:id
// @access  Private/Admin
const updateSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id)

  if (seller) {
    seller.name = req.body.name || seller.name
    seller.email = req.body.email || seller.email
   // seller.isSeller = Boolean(req.body.isSeller)

    const updatedSeller = await seller.save()

    res.json({
      _id: updatedSeller._id,
      name: updatedSeller.name,
      email: updatedSeller.email,
     // isSeller: updatedSeller.isSeller,
    })
  } else {
    res.status(404)
    throw new Error('Seller not found')
  }
})

export {
  authSeller,
  registerSeller,
  logoutSeller,
  getSellerProfile,
  updateSellerProfile,
  getSellers,
  deleteSeller,
  getSellerById,
  updateSeller,
}
