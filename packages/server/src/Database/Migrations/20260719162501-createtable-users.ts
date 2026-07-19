import { QueryInterface } from "sequelize";
import Sequelize from "sequelize";

export default {
  up: (queryInterface: QueryInterface) =>
    queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        "users",
        {
          id: {
            primaryKey: true,
            type: Sequelize.UUID,
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(32),
          },
          password: {
            allowNull: true,
            type: Sequelize.STRING(256),
          },
          email: {
            allowNull: true,
            type: Sequelize.STRING(254),
          },
          lastLogin: {
            allowNull: true,
            type: Sequelize.DATE,
          },
          credits: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          diamonds: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          duckets: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          motto: {
            allowNull: true,
            type: Sequelize.STRING(40),
          },
          figureConfiguration: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          homeRoomId: {
            allowNull: true,
            type: Sequelize.TEXT,
          },
          roomChatStyleId: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          online: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
          },
          habboClub: {
            allowNull: true,
            type: Sequelize.DATE,
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
        },
        { transaction },
      );
    }),

  down: (queryInterface: QueryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("users", { transaction });
    });
  },
};
