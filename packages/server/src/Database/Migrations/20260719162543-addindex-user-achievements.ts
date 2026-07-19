import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("user_achievements", {
        transaction,
        name: "user_achievements_user_id_achievement_id",
        type: "UNIQUE",
        fields: ["userId", "achievementId"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex(
        "user_achievements",
        "user_achievements",
        { transaction },
      );
    });
  },
};
