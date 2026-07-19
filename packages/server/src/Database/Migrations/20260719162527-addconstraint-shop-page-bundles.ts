import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addConstraint("shop_page_bundles", {
        transaction,
        fields: ["roomId"],
        type: "foreign key",
        name: "shop_pages_roomId_fkey",
        references: {
          table: "rooms",
          field: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeConstraint(
        "shop_page_bundles",
        "shop_page_bundles",
        { transaction },
      );
    });
  },
};
