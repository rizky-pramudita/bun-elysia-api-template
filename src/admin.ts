var admin = require("firebase-admin");

var serviceAccount = require("../service-account-key.json");

// Initialize the Firebase Admin SDK with the service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (token: string, response: object): Promise<boolean> => {
  try {
    // Correct way to access the auth module
    await admin.auth().verifyIdToken(token);  // If the token is valid, no error will be thrown
    return true;  // Return true if the token is valid
  } catch (error: any) {
    console.error("Error during token verification:", error);
    return false;  // Return false if the token is invalid or any error occurs
  }
};
