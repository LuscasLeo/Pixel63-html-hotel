import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "user_bots",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          motto: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          figureConfiguration: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          speech: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          position: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          direction: {
            allowNull: true,
            type: Sequelize.INTEGER,
          },
          relaxed: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          userId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "users",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          roomId: {
            allowNull: true,
            type: Sequelize.UUID,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("user_bots", { transaction });
    });
  },
};
