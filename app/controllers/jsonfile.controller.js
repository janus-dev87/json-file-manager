const fs = require('fs');

exports.create = (req, res) => {
  if (!req.query.name) {
    res.status(400).json({error: "No name parameter provided. Please provide a file name. ex: name=jsonfile.json"});
    return;
  }

  var path = `./storage/${req.query.name}`;

  if (checkFileExist(path)) {
    console.log(path);
    res.status(400).json({error: `The file ${req.query.name} is already exist. Please provide another file name.`});
    return;
  }

  fs.writeFile(path, JSON.stringify(req.body), (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
      res.status(200).send("Json file is saved.");
  });
};

exports.findAll = (req, res) => {
  var path = `./storage`;

  var filelist = [];

  fs.readdir(path, (err, files) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send(JSON.stringify(files));
  })
};

exports.findOne = (req, res) => {
  if (!req.query.name) {
    res.status(400).json({error: "No name parameter provided. Please provide a file name. ex: name=jsonfile.json"});
    return;
  }

  var path = `./storage/${req.query.name}`;

  checkFileExist(path, (err) => {
    if (err) {
      res.status(404).json({error: "File is not found."});
      return;
    }

    fs.readFile(path, (err, data) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
  
      let jsonObject = JSON.parse(data);
      res.status(200).send(jsonObject);
    });    
  });
};

exports.update = (req, res) => {
  if (!req.query.name) {
    res.status(400).json({error: "No name parameter provided. Please provide a file name. ex: name=jsonfile.json"});
    return;
  }

  var path = `./storage/${req.query.name}`;

  checkFileExist(path, (err) => {
    if (err) {
      res.status(404).json({error: "File is not found."});
      return;
    }

    fs.writeFile(path, JSON.stringify(req.body), (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
        res.status(200).send("Json file is updated.");
    });
  });
};

exports.delete = (req, res) => {
  if (!req.query.name) {
    res.status(400).json({error: "No name parameter provided. Please provide a file name. ex: name=jsonfile.json"});
    return;
  }

  var path = `./storage/${req.query.name}`;

  checkFileExist(path, (err) => {
    if (err) {
      res.status(404).json({error: "File is not found."});
      return;
    }

    fs.unlink(path, (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }
  
      res.status(200).send("Json file is deleted.");
    })
  });
}

const checkFileExist = (path, callback) => {
  fs.access(path, fs.constants.F_OK, (err) => {
      callback(err);
      return false;
  })

  return true;
}