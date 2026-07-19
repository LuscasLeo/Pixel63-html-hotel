import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addConstraint("shop_pages", {
        transaction,
        fields: ["bundleId"],
        type: "foreign key",
        name: "shop_pages_bundleId_fkey",
        references: {
          table: "shop_page_bundles",
          field: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint("shop_pages", "shop_pages", {
        transaction,
      });
    });
  },
};
