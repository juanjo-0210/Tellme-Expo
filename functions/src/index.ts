// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const expoPushToken = req.body.token; // Token del dispositivo
  const title = req.body.title;
  const text = req.body.text;

  const message = {
    token: expoPushToken,
    notification: {
      title: title,
      body: text,
    },
  };

  try {
    // Enviar la notificación a FCM
    const response = await admin.messaging().send(message);
    res.status(200).send("Notificación enviada: " + response);
  } catch (error) {
    res.status(500).send("Error enviando la notificación: " + error);
  }
});
