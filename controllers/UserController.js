const m$user = require("../modules/user.module");
const { Router } = require("express");
const response = require("../helpers/response");

const UserController = Router();


//list user
UserController.get("/", async (req, res) => {
  const list = await m$user.listUser();
  // Response helper

  response.sendResponse(res, list)
})

//create user
UserController.post("/", async (req, res) => {
    //req body adalah input dari client berupa json
  const add = await m$user.createUser(req.body)
  // Response helper

  response.sendResponse(res, add)
})
//update user
UserController.put("/", async (req, res) => {
    //req body adalah input dari client berupa json
  const update = await m$user.updateUser(req.body)
  // Response helper

  response.sendResponse(res, update)
})

module.exports = UserController
