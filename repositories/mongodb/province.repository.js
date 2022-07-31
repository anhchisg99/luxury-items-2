import { Province } from "../../models/index.js";

export async function listAll() {
  try {
    return Province.find();
  } catch (error) {
    console.log(
      "Location: repositories/province.repository.js -> listAll: ",
      error.message
    );
  }
}

export async function listCurrentAvailable() {
  try {
    return Province.find({ code: { $in: ["01", "79"] } });
  } catch (error) {
    console.log(
      "Location: repositories/province.repository.js -> listCurrentAvailable: ",
      error.message
    );
  }
}
