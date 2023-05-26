const { nanoid } = require("nanoid");
const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const image_url = process.env.IMAGE_URL;

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password, address, handphone } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.create({
        name,
        email,
        password: hashPassword,
        address,
        handphone,
      });

      return res.send({
        message: "register berhasil",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send(err.message);
    }
  },
  login: async (req, res) => {
    try {
      const { handphone, password } = req.body;
      const user = await db.User.findOne({
        where: {
          handphone,
        },
      });

      if (user) {
        const match = await bcrypt.compare(password, user.dataValues.password);
        if (match) {
          const payload = {
            id: user.dataValues.id,
          };

          const generateToken = nanoid();
          const token = await db.Token.create({
            expired: moment().add(2, "days").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
          });
          return res.send({
            message: "login berhasil",
            token: token.dataValues.token,
          });
        } else {
          throw new Error("password anda salah");
        }
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  getByToken: async (req, res, next) => {
    try {
      const { token } = req.query;

      let p = await db.Token.findOne({
        where: {
          token,
          expired: {
            [db.Sequelize.Op.gte]: moment().format(),
          },
          valid: true,
        },
      });

      if (!p) {
        throw new Error("token has expired");
      }
      user = await db.User.findOne({
        where: {
          id: JSON.parse(p.dataValues.payload).id,
        },
      });

      delete user.dataValues.password;
      req.user = user;
      next();
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  getUserByToken: async (req, res) => {
    delete req.user.password;
    res.send(req.user);
  },
  changePassword: async (req, res) => {
    try {
      const { token } = req.query;
      const { password } = req.body.user;
      const { id } = req.user;

      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );

      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );

      res.send({ message: "password has been changed" });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },
  uploudAvatar: async (req, res) => {
    const { filename } = req.file;

    await db.User.update(
      {
        avatar_url: filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    await db.User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((result) => res.send(result));
  },
};

module.exports = userController;
