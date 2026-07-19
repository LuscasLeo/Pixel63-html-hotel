import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "furniture_crackable_rewards",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          chance: {
            allowNull: false,
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
          furnitureId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "furnitures",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          crackableId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "furniture_crackables",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("furniture_crackable_rewards", {
        transaction,
      });
    });
  },
};
