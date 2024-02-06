module.exports = app => {
  const jsonfiles = require("../controllers/jsonfile.controller.js");

  var router = require("express").Router();

  router.post("/", jsonfiles.create);

  router.get("/all", jsonfiles.findAll);

  router.get("/", jsonfiles.findOne);

  router.put("/", jsonfiles.update);

  router.delete("/", jsonfiles.delete);

  app.use('/api/jsonfiles', router);
};