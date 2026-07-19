import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "shop_pages",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          parentId: {
            primaryKey: false,
            allowNull: true,
            type: Sequelize.UUID,
          },
          index: {
            type: Sequelize.INTEGER,
          },
          category: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          type: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          title: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          description: {
            allowNull: true,
            type: Sequelize.STRING(512),
          },
          icon: {
            allowNull: true,
            type: Sequelize.STRING(32),
          },
          header: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          teaser: {
            allowNull: true,
            type: Sequelize.STRING,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          featureVerticalId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "shop_page_features",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          featureHorizontalTopId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "shop_page_features",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          featureHorizontalMiddleId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "shop_page_features",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          featureHorizontalBottomId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            references: {
              model: "shop_page_features",
              key: "id",
            },
            allowNull: true,
            type: Sequelize.UUID,
          },
          bundleId: {
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            // references: {
            //     model: "shop_page_bundles",
            //     key: "id",
            // }, # Create after shop_page_bundles is created
            allowNull: true,
            type: Sequelize.UUID,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("shop_pages", { transaction });
    });
  },
};
