import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "room_models",
        {
          id: {
            primaryKey: true,
            type: Sequelize.STRING,
          },
          door: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          grid: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          index: {
            type: Sequelize.INTEGER,
          },
          indexable: {
            type: Sequelize.BOOLEAN,
          },
          membership: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("room_models", { transaction });
    });
  },
};
