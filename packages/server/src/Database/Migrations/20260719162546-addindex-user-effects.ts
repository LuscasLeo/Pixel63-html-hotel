import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("user_effects", {
        transaction,
        name: "user_effects_user_id_enable",
        type: "UNIQUE",
        fields: ["userId", "enable"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("user_effects", "user_effects", {
        transaction,
      });
    });
  },
};
