import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addConstraint("shop_page_features", {
        transaction,
        fields: ["featuredPageId"],
        type: "foreign key",
        name: "shop_page_features_featuredPageId_fkey",
        references: {
          table: "shop_pages",
          field: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint(
        "shop_page_features",
        "shop_page_features",
        { transaction },
      );
    });
  },
};
