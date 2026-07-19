import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("user_clothing", {
        transaction,
        name: "user_clothing_user_id_set_id",
        type: "UNIQUE",
        fields: ["userId", "setId"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("user_clothing", "user_clothing", {
        transaction,
      });
    });
  },
};
