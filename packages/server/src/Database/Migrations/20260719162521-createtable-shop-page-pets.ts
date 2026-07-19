import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "shop_page_pets",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          credits: {
            allowNull: true,
            type: Sequelize.INTEGER,
          },
          duckets: {
            allowNull: true,
            type: Sequelize.INTEGER,
          },
          diamonds: {
            allowNull: true,
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
          petId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "pets",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          shopPageId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "shop_pages",
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
      await queryInterface.dropTable("shop_page_pets", { transaction });
    });
  },
};
