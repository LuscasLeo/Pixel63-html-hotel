import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "badges",
        {
          id: {
            primaryKey: true,
            type: Sequelize.STRING(32),
          },
          name: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          description: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          image: {
            allowNull: false,
            type: Sequelize.TEXT,
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
      await queryInterface.dropTable("badges", { transaction });
    });
  },
};
