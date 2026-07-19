import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "user_achievements",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          level: {
            type: Sequelize.INTEGER,
          },
          score: {
            type: Sequelize.INTEGER,
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
            allowNull: true,
            type: Sequelize.UUID,
          },
          achievementId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "achievements",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.STRING(32),
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("user_achievements", { transaction });
    });
  },
};
