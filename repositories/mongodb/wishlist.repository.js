import { Wishlist } from "../../models/index.js";

export async function createOne(wishlistData) {
  try {
    return Wishlist.create(wishlistData);
  } catch (error) {
    console.log(
      "Location: repositories/wishlist.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function saveOne(wishlistData) {
  try {
    return wishlistData.save();
  } catch (error) {
    console.log(
      "Location: repositories/wishlist.repository.js -> saveOne: ",
      error.message
    );
  }
}

export async function findByUserId(userId) {
  try {
    return Wishlist.findOne({ buyer: userId })
  } catch (error) {
    console.log(
      "Location: repositories/wishlist.repository.js -> findByUserId: ",
      error.message
    );
  }
}

export async function getFavoriteList() {
  try {
    return Wishlist.find()
      .populate("buyer","display_name")
      .populate("products")
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/wishlist.repository.js -> getFavoriteList: ",
      error.message
    );
  }
}

export async function updateList(list_id, product_id) {
  try {
    return Wishlist.updateOne(
      { buyer : list_id },
      { 
        $pullAll: {
          products: [product_id],
        },
      }
    );
  } catch (error) {
    console.log(
      "Location: repositories/wishlist.repository.js -> updateList: ",
      error.message
    );
  }
}