import { Banner } from "../../models/index.js";

export async function createOne(bannerData) {
  try {
    return Banner.create(bannerData);
  } catch (error) {
    console.log(
      "Location: repositories/banner.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function listAll() {
  try {
    return Banner.find().select("banner_img");;
  } catch (error) {
    console.log(
      "Location: repositories/banner.repository.js -> listAll: ",
      error.message
    );
  }
}

export async function deleteOne(id) {
  try {
    return Banner.findByIdAndRemove({ _id: id });
  } catch (error) {
    console.log(
      "Location: repositories/banner.repository.js -> deleteOne: ",
      error.message
    );
  }
}