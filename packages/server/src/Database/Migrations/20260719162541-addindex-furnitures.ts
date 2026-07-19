import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("furnitures", {
        transaction,
        name: "furnitures_type_color",
        type: "UNIQUE",
        fields: ["type", "color"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("furnitures", "furnitures", {
        transaction,
      });
    });
  },
};
