import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "achievements",
        {
          id: {
            primaryKey: true,
            type: Sequelize.STRING(32),
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          description: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          badgePrefix: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          levels: {
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
          badgeId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "badges",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.STRING(32),
          },
          categoryId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "achievement_categories",
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
      await queryInterface.dropTable("achievements", { transaction });
    });
  },
};
