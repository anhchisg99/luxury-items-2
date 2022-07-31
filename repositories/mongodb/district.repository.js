import { District } from "../../models/index.js";

export async function listAllOfSpecificProvince(provinceCode) {
  try {
    return District.find({ parent_code: provinceCode });
  } catch (error) {
    console.log(
      "Location: repositories/district.repository.js -> listAllOfSpecificProvince: ",
      error.message
    );
  }
}

export async function getProvinceCode(districtCode) {
  try {
    return District.find({ code: districtCode }).select("code parent_code");
  } catch (error) {
    console.log(
      "Location: repositories/district.repository.js -> listAllOfSpecificProvince: ",
      error.message
    );
  }
}
