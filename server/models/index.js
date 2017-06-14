var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      //console.log(req);
      // var queryString = "SELECT m.messageID, m.text, r.roomname, u.username FROM messages m inner join rooms r on (r.roomID=m.roomID) inner join users u on (u.userID=m.userID)";
      // db.con.query(queryString, function (err, result) {
      // if (err) throw err;
      //   //console.log(result);
        
      //   var obj = {};
      //   obj.results = result;
      //   res.writeHead(200, {'Content-type': 'application/json'});
      //   console.log(obj);
      //   //res.write(JSON.stringify(obj));
      //   res.end(JSON.stringify(obj));
      // });
      var queryString = "SELECT m.messageID, m.text, r.roomname, u.username FROM messages m inner join rooms r on (r.roomID=m.roomID) inner join users u on (u.userID=m.userID)";
      db.con.query(queryString, function (err, result) {
        callback(err,result);
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      var inputUsername = JSON.stringify(data.username);
      var USERID;
      var queryString = "SELECT userID FROM users WHERE username =" + inputUsername;
      db.con.query(queryString, (err, result) => {
        if (err) throw err;
        console.log(result);
        // if (result === []) {
        //   db.con.query("INSERT INTO users (username) VALUES (data.username)", (err, result) => {
        //     USERID = result.insertId;
        //   });
        // } else {
        USERID = result[0].userID;

        var inputRoomname = JSON.stringify(data.roomname);
        var ROOMID;
        var queryString = "SELECT roomID FROM rooms WHERE roomname =" + inputRoomname;
        db.con.query(queryString, (err, result) => {
          if (err) throw err;
          ROOMID = result[0].roomID;
          var message = data.text;
          db.con.query("INSERT INTO messages (text,roomID,userID) VALUES ('" + message + "','" + ROOMID + "','" + USERID +  "')", (err, result) => {
            if (err) throw err;
            messageID = result.insertId;
            callback(messageID);
          });
        });
      });
          //if use exists in database, then we need to get their userID
          //if user does not exist, then we need to create the user into the database
        //2: roomname
          //if roomname exists, then we need to get the roomID
          //if roomname does NOT exist, we need to create a new roomID 
        //3: text
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryString = "SELECT * FROM users";
      db.con.query(queryString, function (err, result) {
        callback(err,result);
      });
    },
    post: function (data, callback) {
      console.log(data.username);
    }
  }
};

