import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex("clothes", {
        transaction,
        name: "clothes_part_set_id",
        type: "UNIQUE",
        fields: ["part", "setId"],
      });
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex("clothes", "clothes", { transaction });
    });
  },
};
