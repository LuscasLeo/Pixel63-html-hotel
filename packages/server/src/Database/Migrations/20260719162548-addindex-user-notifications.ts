import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("user_notifications", {
        transaction,
        name: "user_notifications_user_id_type",
        type: "UNIQUE",
        fields: ["userId", "type"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex(
        "user_notifications",
        "user_notifications",
        { transaction },
      );
    });
  },
};
