import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "shop_page_bundles",
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
          pageId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "shop_pages",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          roomId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            // references: {
            //     model: "rooms",
            //     key: "id",
            // }, # Create after rooms is created
            allowNull: true,
            type: Sequelize.UUID,
          },
          badgeId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            // references: {
            //     model: "badges",
            //     key: "id",
            // }, # Create after badges is created
            allowNull: true,
            type: Sequelize.STRING(32),
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("shop_page_bundles", { transaction });
    });
  },
};
