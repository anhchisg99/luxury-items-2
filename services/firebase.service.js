import admin from "firebase-admin";
import { vars } from "../configs/index.js";
// import functions from "firebase-functions";

async function generateV4UploadSignedUrl(filePath, fileType) {
  const options = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000, // INFO: 15 minutes
    contentType: fileType,
  };

  // INFO: File type is content-type
  try {
    const [url] = await admin
      .storage()
      .bucket(vars.firebaseStorageBucketName)
      .file(filePath)
      .getSignedUrl(options);
    return url;
  } catch (error) {
    console.log(error);
  }
}

async function getCollectionRef(collectionName) {
  return admin.firestore().collection(collectionName);
}

async function firebaseMessage(message) {
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // INFO: Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}

async function createNewUser(userInfo) {
  return admin.auth().createUser(userInfo);
}
const getUserByEmail = async (email) => {
  return admin.auth().getUserByEmail(email);
};

const generateEmailVerificationLink = async (email) => {
  const link = await admin.auth().generateEmailVerificationLink(email, {
    url: "https://luxury-items.web.app",
  });
  console.log(link);
};

//Modify link rest -> chèn đường dẫn mong muốn 
// fe tạo url luxury/reset-password?token=...
const generatePasswordResetLink = async (email) => {
  const link = await admin.auth().generatePasswordResetLink(email, {
    url: "https://beluxuria.com/buyer/reset-password",
  });
  console.log(link);
};

const updateUser = async (uid, data) => {
  return admin.auth().updateUser(uid, data);
};
// export const sendEmailVerification = functions.auth
//   .user()
//   .onCreate(async (user, context) => {
//     const passwordProvider = user.providerData.some(
//       (provider) => provider.providerId === "password"
//     );
//     if (!passwordProvider) {
//       return true;
//     }
//     const email = user.email;
//     const link = await admin.auth().generateEmailVerificationLink(email, {
//       url: "abc.com.vn",
//     });
//     console.log(link);
//     return true;
//   });

export {
  generateV4UploadSignedUrl,
  getCollectionRef,
  firebaseMessage,
  createNewUser,
  generateEmailVerificationLink,
  getUserByEmail,
  generatePasswordResetLink,
  updateUser,
};
