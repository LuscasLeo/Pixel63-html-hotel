import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "furnitures",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING(64),
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(256),
          },
          description: {
            allowNull: true,
            type: Sequelize.STRING(256),
          },
          category: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          interactionType: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          placement: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          dimensions: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          directions: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          animations: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          color: {
            type: Sequelize.INTEGER,
          },
          flags: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          customParams: {
            allowNull: true,
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
      await queryInterface.dropTable("furnitures", { transaction });
    });
  },
};
