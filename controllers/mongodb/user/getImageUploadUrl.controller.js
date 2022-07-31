import { v4 } from "uuid";
import { firebaseService } from "../../../services/index.js";
async function getImageUploadUrl(req, res, next) {
  console.log("POST /user/get-image-upload-url api");
  const { file_type } = req.body;

  try {
    if (req.user) {
      const randomUuid = v4();
      const filePath = `images/${randomUuid}`;
      const url = await firebaseService.generateV4UploadSignedUrl(
        filePath,
        file_type
      );
      const returnObject = {
        signed_url: url,
        file_path: filePath,
      };
      res.send(returnObject);
    } else {
      res.status(400).json("Cannot find this user");
    }
  } catch (error) {
    console.log(
      "Location: controllers/user/editProfile.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default getImageUploadUrl;
