import { Brand } from "../../models/index.js";

export async function createOne(brandData) {
  try {
    return Brand.create(brandData);
  } catch (error) {
    console.log(
      "Location: repositories/brand.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function listAll() {
  try {
    return Brand.find().select("brand_name description");
  } catch (error) {
    console.log(
      "Location: repositories/brand.repository.js -> listAll: ",
      error.message
    );
  }
}

export async function getOne(brandId) {
  try {
    return Brand.findById(brandId).select("brand_name description");
  } catch (error) {
    console.log(
      "Location: repositories/brand.repository.js -> getOne: ",
      error.message
    );
  }
}

export async function updateOne(brandId, brandData) {
  try {
    return Brand.findByIdAndUpdate(brandId, brandData, {
      new: true,
    });
  } catch (error) {
    console.log(
      "Location: repositories/brand.repository.js -> updateOne: ",
      error.message
    );
  }
}