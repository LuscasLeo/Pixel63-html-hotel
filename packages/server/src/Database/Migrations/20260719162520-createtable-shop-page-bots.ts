import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "shop_page_bots",
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
      await queryInterface.dropTable("shop_page_bots", { transaction });
    });
  },
};
