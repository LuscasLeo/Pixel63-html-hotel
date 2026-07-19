import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("user_figures", {
        transaction,
        name: "user_figures_user_id_index",
        type: "UNIQUE",
        fields: ["userId", "index"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("user_figures", "user_figures", {
        transaction,
      });
    });
  },
};
