import express from 'express'
import {
  registerSeller,
  authSeller,
  logoutSeller,
  getSellerProfile,
  updateSellerProfile,
  getSellers,
  deleteSeller,
  getSellerById,
  updateSeller,
} from '../controllers/sellerController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Register a new seller
router.route('/').post(registerSeller).get(protect, admin, getSellers)
router.post('/auth', authSeller)
router.post('/logout', logoutSeller)
router
  .route('/profile')
  .get(protect, getSellerProfile)
  .put(protect, updateSellerProfile)
router
  .route('/:id')
  .delete(protect, admin, deleteSeller)
  .get(protect, admin, getSellerById)
  .put(protect, admin, updateSeller)


// // Get all sellers (only accessible to admins)
// router.route('/').get(protect, admin, getSellers);

export default router
