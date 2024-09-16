export async function sendNotification(token?:string, text?: string, title?: string) {



try {


   const response = await fetch('https://us-central1-tellme-72f4c.cloudfunctions.net/sendNotification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({token, title, text}),
    });

    const data = await response.text();
    console.log('Respuesta de la función:', data);
  } catch (error) {
    console.error('Error enviando la notificación:', error);
  }



   // const response = await fetch('https://fcm.googleapis.com/v1/projects/tellme-72f4c/messages:send', {
   //    method: 'POST',
   //    headers: {
   //       'Content-Type': 'application/json',
   //       'Authorization': `Bearer ya29.a0AcM612zHhEZZr9IZNRFSX4dHnSr-3l0lzIsiaYwoLl6dEeq7FqAORz91i6ehurkvKGDaenk6PiqijQYzxO-S42fs3NUN1DgEWvaSHt370KkSNUdGGO7Z2mWPY3IyJy2lUzTBZYZEa9ThdmekPI7SO2PvK66XP22u9FzAl0PBaCgYKASYSARISFQHGX2MickPuVwzkVPGy8A1jXv0ryA0175`, // Token generado
   //    },
   //    body: JSON.stringify({
   //       message: {
   //          token: "cXtJW46ER9uZ3tla28cuNc:APA91bHa370vO9XJO3E07qyUqfR6erIPdErqPHp78pGVQ2MDZlNOEmaV3dDMoPXcmLa5PfE8VvgbtAgP7S3O-YHsfuxkoq_sQeUt0aEvTdtC4NZ8EXaQwLEieGd2sOSYsbEjnc_cs0Bx",
   //          notification: {
   //             body: text,
   //             title: title,
   //             image: "https://firebasestorage.googleapis.com/v0/b/tellme-72f4c.appspot.com/o/profileImages%2Fad310b60-96a2-40af-941c-2ecac9c54b7c.jpeg?alt=media&token=ebf56bd0-0d35-4c72-90f4-54338c74b446",
   //          },
   //          android: {
   //             notification: {
   //                sound: "default"  // Usar el sonido por defecto de Android
   //             }
   //          },
   //          data: {}, // Datos opcionales personalizados
   //       },
   //    }),
   // });

   // const data = await response.json();
   // console.log(data);
}


//const message = {
//       to: token, // Reemplaza con el token del dispositivo
//       sound: 'default',
//       title: title,
//       body: text,
//       data: { withSome: 'data' },
//    };

//    try {
//       const res = await fetch('https://exp.host/--/api/v2/push/send', {
//          method: 'POST',
//          headers: {
//             'Accept': 'application/json',
//             'Accept-encoding': 'gzip, deflate',
//             'Content-Type': 'application/json',
//          },
//          body: JSON.stringify(message),
//       });
//       console.log(res)
//    } catch (error) {
//       console.log(error)
//    }

// };
