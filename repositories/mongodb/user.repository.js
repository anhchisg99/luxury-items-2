import { User } from "../../models/index.js";

export async function findByEmail(email) {
  try {
    return User.findOne({ email });
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> findByEmail: ",
      error.message
    );
  }
}

export async function changePassword(email, currentPassword, newPassword) {
  try {
    const user = await findByEmail(email);
    // INFO: this is passport-local-mongoose method
    const newUser = await user.changePassword(currentPassword, newPassword);
    return newUser;
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> changePassword: ",
      error.message
    );
  }
}

export async function findById(id) {
  try {
    return User.findById(id).select("-salt -hash -__v");
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> findById: ",
      error.message
    );
  }
}

export async function getFullDetailUser(userId) {
  try {
    return User.findById(userId);
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> getFullDetailUser: ",
      error.message
    );
  }
}

export async function resetPassword(email, newPassword) {
  try {
    const user = await findByEmail(email);

    // INFO: this is passport-local-mongoose method
    const newUser = await user.setPassword(newPassword);
    newUser.save();
    return newUser;
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> resetPassword: ",
      error.message
    );
  }
}

export async function saveUser(userData) {
  try {
    return userData.save();
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> saveUser: ",
      error.message
    );
  }
}

export async function getAddressesOfUser(userId) {
  try {
    const userRelated = await findById(userId);
    return userRelated.populate("addresses");
  } catch (error) {
    console.log(
      "Location: repositories/user.repository.js -> getAddressesOfUser: ",
      error.message
    );
  }
}

// export async function getAddressesOfUser(userId) {
//   try {
//     const userRelated = await findById(userId);
//     return userRelated.populate("addresses");
//   } catch (error) {
//     console.log(
//       "Location: repositories/user.repository.js -> getAddressesOfUser: ",
//       error.message
//     );
//   }
// }