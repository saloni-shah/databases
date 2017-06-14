var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { 
      models.messages.get((err,result) => {
        if (err) throw err;
        var obj = {};
        obj.results = result;
        res.writeHead(200, {'Content-type': 'application/json'});
        //console.log(obj);
        //res.write(JSON.stringify(obj));
        res.end(JSON.stringify(obj));
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      var data = '';
      req.on('data',function(chunk){
        data += chunk;
        var jsonData = JSON.parse(data);
        models.messages.post(jsonData, (msgId) => {
          res.writeHead(201, {'Content-type': 'application/json'});
          res.end(JSON.stringify(msgId));
        });
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      models.users.get((err,result) => {
        if (err) throw err;
        var obj = {};
        obj.results = result;
        res.writeHead(200, {'Content-type': 'application/json'});
        //console.log(obj);
        //res.write(JSON.stringify(obj));
        res.end(JSON.stringify(obj));
      });
    },
    post: function (req, res) {
      var data = '';
      req.on('data',function(chunk){
        data += chunk;
        var jsonData = JSON.parse(data);
        models.users.post(jsonData, (userId) => {
          res.writeHead(201, {'Content-type': 'application/json'});
          res.end(JSON.stringify(userId));
        });
      });
    }
  }
};

