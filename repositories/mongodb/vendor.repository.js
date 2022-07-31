import { Vendor, OrderDetails } from "../../models/index.js";

export async function getDetail(id) {
  try {
    return Vendor.findById({ _id: id }).select(
      "phone display_name avatar email storeLocation storeDescription created_at"
    );
  } catch (error) {
    console.log(
      "Location: repositories/vendor.repository.js -> getDetail: ",
      error.message
    );
  }
}

export async function getFullDetail(id) {
  try {
    return Vendor.findById({ _id: id });
  } catch (error) {
    console.log(
      "Location: repositories/vendor.repository.js -> getFullDetail: ",
      error.message
    );
  }
}

export async function updateInfo(vendorId, vendorData) {
  try {
    return Vendor.findByIdAndUpdate(vendorId, vendorData, {
      new: true,
    });
  } catch (error) {
    console.log(
      "Location: repositories/vendor.repository.js -> updateOne: ",
      error.message
    );
  }
}

export async function getAllOrdersWithStatusParams(vendorId, statusFilter) {
  try {
    return OrderDetails.find({
      $and: [{ vendorId: vendorId }, { status: statusFilter }],
    }).populate("buyerId","_id email display_name phone")
      .select("-update_at -__v")
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/vendor.repository.js -> getAllOrdersWithStatusParams: ",
      error.message
    );
  }
}

export async function getAllOrders(vendorId, load_more) {
  try {
    return OrderDetails.find({ vendorId: vendorId },
    ).populate("buyerId","_id email display_name phone")
      .select("-update_at -__v -vendorId")
      .limit(load_more)
      .sort({ created_at: -1 })
      .lean();
  } catch (error) {
    console.log(
      "Location: repositories/vendor.repository.js -> getAllOrders: ",
      error.message
    );
  }
}

export async function searchOrders(filter) {
  try {
    return OrderDetails.find(filter);
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> searchOrders: ",
      error.message
    );
  }
}
