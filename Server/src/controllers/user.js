const { nanoid } = require("nanoid");
const db = require("../models");
const bcrypt = require("bcrypt");
const moment = require("moment");
const image_url = process.env.IMAGE_URL;
const url = process.env.URL;
const mailer = require("../lib/nodemailer");

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
            expired: moment().add(30, "minutes").format(),
            token: generateToken,
            payload: JSON.stringify(payload),
            status: "LOGIN",
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
  generateTokenByEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email,
        },
      });

      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "FORGOT-PASSWORD",
            },
          }
        );
        const payload = {
          id: user.dataValues.id,
        };
        const generateToken = nanoid();
        const token = await db.Token.create({
          expired: moment().add(5, "minutes").format(),
          token: generateToken,
          payload: JSON.stringify({ id: user.dataValues.id }),
          status: "FORGOT-PASSWORD",
        });

        mailer({
          subject: mailer.subject,
          to: user.dataValues.email,
          text: url + token.dataValues.token,
        });

        return res.send({ message: "cek your email" });
      } else {
        throw new Error("usr not found");
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
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
  editProfile: async (req, res) => {
    try {
      const { name, email, address, handphone } = req.body;

      await db.User.update(
        {
          name,
          email,
          address,
          handphone,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  editPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);

      await db.User.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  forgotPassword: async (req, res) => {
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
      return res.send({
        message: "berhasil mengganti password",
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
};

module.exports = userController;
