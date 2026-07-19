import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "shop_page_features",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          image: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          configuration: {
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
          featuredPageId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            // references: {
            //     model: "shop_pages",
            //     key: "id",
            // }, # Create after shop_pages is created
            allowNull: true,
            type: Sequelize.UUID,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("shop_page_features", { transaction });
    });
  },
};
