const Sequelize = require("sequelize");
const sequelize = require("../configs/db.configs");

const Alumnos = sequelize.define(
  "Alumnos",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidoPaterno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellidoMaterno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    matricula: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    deleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: Sequelize.fn("now"),
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
    paranoid: true,
  }
);

module.exports = Alumnos;
