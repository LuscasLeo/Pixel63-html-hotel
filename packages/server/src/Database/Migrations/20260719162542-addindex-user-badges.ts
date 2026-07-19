import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("user_badges", {
        transaction,
        name: "user_badges_user_id_badge_id",
        type: "UNIQUE",
        fields: ["userId", "badgeId"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("user_badges", "user_badges", {
        transaction,
      });
    });
  },
};
