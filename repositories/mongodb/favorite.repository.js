import { Favorite, Buyer } from "../../models/index.js";

export async function getAllFavorite(userId) {
  try {
    return await Buyer.find({ _id: userId })
      .select("favorite")
      .populate({
        path: "favorite",
        populate: [
          {
            path: "product",
            populate: [
              { path: "belongs_to_vendor", select: "display_name avatar" },
            ],
          },
          { path: "vendor" },
          { path: "brand" },
        ],
      });
  } catch (error) {
    console.log(
      "Location: repositories/favorite.repository.js -> getAllFavorite: ",
      error.message
    );
  }
}
//create Product
export async function createFavoritesProduct(userId, product_id) {
  console.log(userId, product_id);
  try {
    const buyer = await Buyer.findById(userId);
    console.log(buyer);
    const buyer_fav = buyer.favorite;
    console.log(buyer_fav);
    if (!buyer_fav) {
      const fav = await Favorite.create({ product: product_id });
      return await Buyer.updateOne({ _id: userId }, { favorite: fav._id });
    } else {
      // const fav = await Buyer.findById(userId)
      return await Favorite.updateOne(
        { _id: buyer.favorite },
        { $push: { product: product_id } }
      );
    }
    //   const buyerFavorite = buyer.favorite
    //   return Favorite.findByIdAndUpdate(buyerFavorite,{$pull:{'product':{_id:product_id}}})
  } catch (error) {
    console.log(
      "Location: repositories/favorite.repository.js -> createFavoritesProduct: ",
      error.message
    );
  }
}
//remove Product
export async function removeFavoritesProduct(userId, product_id) {
  try {
    const buyer = await Buyer.findById(userId);

    return Favorite.updateOne(
      { _id: buyer.favorite },
      { $pull: { product: product_id } }
    );
    //   const buyerFavorite = buyer.favorite
    //   return Favorite.findByIdAndUpdate(buyerFavorite,{$pull:{'product':{_id:product_id}}})
  } catch (error) {
    console.log(
      "Location: repositories/favorite.repository.js -> removeFavoritesProduct: ",
      error.message
    );
  }
}
//create Vendors
export async function createFavoritesVendor(userId, vendor_id) {
  console.log(userId, vendor_id);
  try {
    const buyer = await Buyer.findById(userId);
    console.log(buyer);
    const buyer_fav = buyer.favorite;
    console.log(buyer_fav);
    if (!buyer_fav) {
      //vendor *
      const fav = await Favorite.create({ vendor: vendor_id });
      return await Buyer.updateOne(
        { _id: userId },
        { $push: { favorite: fav._id } }
      );
    } else {
      // const fav = await Buyer.findById(userId)
      //vendor *

      return await Favorite.updateOne(
        { _id: buyer.favorite },
        { $push: { vendor: vendor_id } }
      );
    }
    //   const buyerFavorite = buyer.favorite
    //   return Favorite.findByIdAndUpdate(buyerFavorite,{$pull:{'product':{_id:product_id}}})
  } catch (error) {
    console.log(
      "Location: repositories/favorite.repository.js -> createFavoritesVendor: ",
      error.message
    );
  }
}
//remove Vendor
export async function removeFavoritesVendor(userId, vendor_id) {
  try {
    const buyer = await Buyer.findById(userId);

    return Favorite.updateOne(
      { _id: buyer.favorite },
      { $pull: { vendor: vendor_id } }
    );
    //   const buyerFavorite = buyer.favorite
    //   return Favorite.findByIdAndUpdate(buyerFavorite,{$pull:{'product':{_id:product_id}}})
  } catch (error) {
    console.log(
      "Location: repositories/favorite.repository.js -> removeFavoritesVendor: ",
      error.message
    );
  }
}
//create Brand
export async function createFavoritesBrand(userId, brand_id) {
  console.log(userId, brand_id);
  try {
    const buyer = await Buyer.findById(userId);
    console.log(buyer);
    const buyer_fav = buyer.favorite;
    console.log(buyer_fav);
    if (!buyer_fav) {
      //vendor *
      const fav = await Favorite.create({ brand: brand_id });
      return await Buyer.updateOne(
        { _id: userId },
        { $push: { favorite: fav._id } }
      );
    } else {
      // const fav = await Buyer.findById(userId)
      //vendor *

      return await Favorite.updateOne(
        { _id: buyer.favorite },
        { $push: { brand: brand_id } }
      );
    }
    //   const buyerFavorite = buyer.favorite
    //   return Favorite.findByIdAndUpdate(buyerFavorite,{$pull:{'product':{_id:product_id}}})
  } catch (error) {
    console.log(
      "Location: repositories/favorite.repository.js -> createFavoritesBrand: ",
      error.message
    );
  }
}
//remove Brand
export async function removeFavoritesBrand(userId, brand_id) {
  try {
    const buyer = await Buyer.findById(userId);

    return Favorite.updateOne(
      { _id: buyer.favorite },
      { $pull: { brand: brand_id } }
    );
    //   const buyerFavorite = buyer.favorite
    //   return Favorite.findByIdAndUpdate(buyerFavorite,{$pull:{'product':{_id:product_id}}})
  } catch (error) {
    console.log(
      "Location: repositories/favorite.repository.js -> removeFavoritesBrand: ",
      error.message
    );
  }
}
