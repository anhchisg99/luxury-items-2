import { Address, User } from "../../models/index.js";

export async function createOne(addressData) {
  try {
    return Address.create(addressData);
  } catch (error) {
    console.log(
      "Location: repositories/address.repository.js -> createOne: ",
      error.message
    );
  }
}

export async function saveOne(addressData) {
  try {
    return addressData.save();
  } catch (error) {
    console.log(
      "Location: repositories/address.repository.js -> saveOne: ",
      error.message
    );
  }
}

export async function getSpecificAddress(addressId) {
  try {
    return Address.findById(addressId)
      .populate("user", "display_name phone")
      .select("-created_at -updated_at -__v");
  } catch (error) {
    console.log(
      "Location: repositories/address.repository.js -> getSpecificAddress: ",
      error.message
    );
  }
}

export async function updateOne(addressId, addressData) {
  try {
    return Address.findByIdAndUpdate(addressId, addressData, {
      new: true,
    });
  } catch (error) {
    console.log(
      "Location: repositories/address.repository.js -> updateOne: ",
      error.message
    );
  }
}

//Add force delete later 
export async function deleteOne(id) {
  try {
    return Address.findByIdAndRemove({ _id: id });
  } catch (error) {
    console.log(
      "Location: repositories/address.repository.js -> forceDelete: ",
      error.message
    );
  }
}