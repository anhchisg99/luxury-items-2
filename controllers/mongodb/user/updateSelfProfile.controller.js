import { userRepository } from "../../../repositories/mongodb/index.js";
import { firebaseService } from "../../../services/index.js";
import moment from "moment";
// import { role as userRole } from "../../../../constants/enums/index.js";
 
async function updateSelfProfile(req, res, next) {
  console.log("PATCH /user/ api");
  try {
    if (req.user) {
      const userId = req.user.userId;
      const user = await userRepository.findById(userId);
      console.log(user);
      const data = req.body;
      // const firebaseData = {};
      if (data.display_name) {
        user.display_name = data.display_name;
        // firebaseData.displayName = data.display_name;
      }
      if (data.avatar) {
        user.avatar = data.avatar;
        // firebaseData.photoURL = data.avatar;
      }
      if (data.phone) {
        user.phone = data.phone;
        // INFO: this phone number must be in E.164 format
        // firebaseData.phoneNumber = data.phone;
      }
      if (data.gender) {
        user.gender = data.gender;
      }
      if (data.default_language) {
        user.default_language = data.default_language;
      }
      if (data.birthday) {
        user.birthday = moment(data.birthday, "DD/MM/YYYY").toDate();
      }
      if (data.currency) {
        user.currency = data.currency;
      }
      if (data.description) {
        user.description = data.description;
      }

      //INFO: Not allowed to change yet
      // if (data.email) {
      //   user.email = data.email;
      // }

      // if (firebaseData) {
      //   await Promise.all([
      //     user.save(),
      //     firebaseService.updateUser(userId, firebaseData),
      //   ]);
      // } else {
      //   await user.save();
      // }
      await user.save();
      res.send(user);
    } else {
      res.status(400).json("Cannot find this user");
    }
  } catch (error) {
    console.log(
      "Location: controllers/user/updateSelfProfile.controller.js",
      error.message
    );
    res.status(400).json(error.message);
  }
}

export default updateSelfProfile;
