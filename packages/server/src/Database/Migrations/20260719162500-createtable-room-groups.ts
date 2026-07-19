import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "room_groups",
        {
          id: {
            primaryKey: true,
            type: Sequelize.STRING,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          description: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          primaryColor: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          secondaryColor: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          badge: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          rights: {
            allowNull: false,
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
      await queryInterface.dropTable("room_groups", { transaction });
    });
  },
};
