const prisma = require("../helpers/database");
const Joi = require("joi");
const { join } = require("@prisma/client/runtime");
const { string } = require("joi");


class _user {
  //list user
  listUser = async () => {
    try {
      //query ke database
      const list = await prisma.user.findMany();

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.log("listUser user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };

  createUser = async (body) => {
    try {
      //validasi input dari body
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required()
      });

      const validation = schema.validate(body);

      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        );

        return {
          status: false,
          code: 422,
          error: errorDetails.join(","),
        };
      }

     
      const add = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });
      return {
        status: true,
        data: add,
      };
    } catch (error) {
      console.log("createUser user module Error: ", error);

      return {
        status: false,
        error,
      };
    }
  };
  updateUser = async (body) => {
    try {
      //validasi input dari body
      const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string(),
        email: Joi.string(),
        password: Joi.string()
      })
  
      const validation = schema.validate(body);
  
      if (validation.error) {
        const errorDetails = validation.error.details.map(
          (detail) => detail.message
        )
  
        return {
          status: false,
          code: 422,
          error: errorDetails.join(","),
        }
      }
  
  
      const update = await prisma.user.update({
        where: {
          id: body.id,
        },
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      })
      return {
        status: true,
        data: update,
      }
    } catch (error) {
      console.log("createUser user module Error: ", error);
  
      return {
        status: false,
        error,
      }
    }
  }
}


module.exports = new _user();
