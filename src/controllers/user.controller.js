import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // Get data from frontend
  // Validation are checked (not empty)
  // check if your user already exists : username and email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create an entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return the response

  const { fullName, email, username, passwords } = req.body;
  console.log(fullName);

  if (
    [fullName, email, username, passwords].some((field) => {
      return field?.trim() === "";
    })
  ) {
    throw new ApiError(400, "All fields must be provided");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Image is required");
  }

  const avatar = await uploadCloudinary(avatarLocalPath);
  const coverImage = await uploadCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar Image is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(createdUser){
    throw new ApiError(500, "Something went wrong creating a user");
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User created successfully")
  )
});

export { registerUser };
