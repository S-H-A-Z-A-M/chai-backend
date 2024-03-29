import { Router } from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserAvatar,
  updateUserCoverImage,
  changeCurrentPassword,
  getCurrentUser,
  updateUserDetails,
  getUserChannel,
  getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshaccessToken } from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

// Secured Routes

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshaccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateUserDetails);

router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
  .route("/update-coverimage")
  .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/:username").get(verifyJWT, getUserChannel);
router.route('/watchHistory').get(verifyJWT, getWatchHistory);

export default router;
