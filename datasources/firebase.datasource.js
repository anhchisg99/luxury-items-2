import fs from "fs";
import admin from "firebase-admin";
import { vars } from "../configs/index.js";
async function InitiateFirebaseServices() {
  try {
    await fs.writeFile(vars.gcpKeyFile, vars.gcpCredit, (error) => {
      if (error) {
        console.log(error);
      }
      console.log("Load google credential successfully");
    });
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: vars.firebaseProjectId,
        clientEmail: vars.firebaseClientEmail,
        privateKey: vars.firebasePrivateKey.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error) {
    console.log(error);
  }
}

export default InitiateFirebaseServices;
