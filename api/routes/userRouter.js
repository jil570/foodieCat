const express = require('express');
const fs = require('fs');
const path = require('path');
const User = require('../models/User');
const { checkAuthenticated } = require('../app');
const { sendDatabaseErrorResponse } = require('../app');

const router = express.Router();

router.get('/getUser', checkAuthenticated, (req, res) => {
  const { username } = req.user;

  User.findOne({ username })
    .then((userInDatabase) => {
      if (userInDatabase) {
        const userToSend = userInDatabase;

        // Don't send the user's email or password.
        userToSend.email = '';
        userToSend.password = '';
        delete userToSend.email;
        delete userToSend.password;

        // Send the profile picture as a Buffer.
        // There is no Buffer class in the browser, so it is better to do this step in the back end.
        // To display the image on the client side, set an img element's "src" to the following,
        // where "resJson" is the response from this route as a JSON object:
        // `data:image/png;base64,${btoa(String.fromCharCode.apply(null, resJson.image.data))}`

        try {
          userToSend.image = Buffer.from(userInDatabase.image, 'binary');
        } catch (err) {
          userToSend.image = fs.readFileSync(path.join(__dirname, '../public/images/default-profile.png'));
        }

        res.status(200);
        res.send(userToSend);
      } else {
        res.status(404);
        res.json(`[!] User not found: ${username}`);
      }
    })
    .catch((err) => sendDatabaseErrorResponse(err, res));
});


router.get('/getOtherUser/:username', checkAuthenticated, (req, res) => {
  const { username } = req.params;

  User.findOne({ username })
    .then((userInDatabase) => {
      if (userInDatabase) {
        const userToSend = userInDatabase;

        // Don't send the user's email or password.
        userToSend.email = '';
        userToSend.password = '';
        delete userToSend.email;
        delete userToSend.password;

        // Send the profile picture as a Buffer.
        // There is no Buffer class in the browser, so it is better to do this step in the back end.
        // To display the image on the client side, set an img element's "src" to the following,
        // where "resJson" is the response from this route as a JSON object:
        // `data:image/png;base64,${btoa(String.fromCharCode.apply(null, resJson.image.data))}`
        try {
          userToSend.image = Buffer.from(userInDatabase.image, 'binary');
        } catch (err) {
          userToSend.image = fs.readFileSync(path.join(__dirname, '../public/images/default-profile.png'));
        }

        res.status(200);
        res.send(userToSend);
      } else {
        res.status(404);
        res.json(`[!] User not found: ${username}`);
      }
    })
    .catch((err) => sendDatabaseErrorResponse(err, res));
});

module.exports = router;
