"use strict";

import { ConstraintType } from "@sequelize/core";
import { QueryInterface, Transaction, IndexType, AddConstraintOptions } from "sequelize";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "badges", deps: []
 * createTable "furnitures", deps: []
 * createTable "pet_breeds", deps: []
 * createTable "room_models", deps: []
 * createTable "room_categories", deps: []
 * createTable "room_groups", deps: []
 * createTable "users", deps: []
 * createTable "user_tokens", deps: []
 * createTable "user_badges", deps: []
 * createTable "user_preferences", deps: []
 * createTable "web_articles", deps: []
 * createTable "web_article_likes", deps: []
 * createTable "web_article_comments", deps: []
 * createTable "room_chat_styles", deps: []
 * createTable "hotel_settings", deps: []
 * createTable "permissions", deps: []
 * createTable "permission_roles", deps: []
 * createTable "achievement_categories", deps: []
 * createTable "clothes", deps: []
 * createTable "furniture_crackables", deps: [furnitures]
 * createTable "furniture_crackable_rewards", deps: [furnitures, furniture_crackables]
 * createTable "pets", deps: [pet_breeds]
 * createTable "shop_page_features", deps: [shop_pages]
 * createTable "shop_page_furnitures", deps: [furnitures, shop_pages]
 * createTable "shop_page_bundles", deps: [shop_pages, rooms, badges]
 * createTable "shop_page_bots", deps: [shop_pages]
 * createTable "shop_page_pets", deps: [pets, shop_pages]
 * createTable "shop_page_memberships", deps: [shop_pages]
 * createTable "user_groups", deps: [users, room_groups]
 * createTable "user_friends", deps: [users, users]
 * createTable "user_friend_requests", deps: [users, users]
 * createTable "rooms", deps: [users]
 * createTable "room_rights", deps: [rooms, users]
 * createTable "shop_pages", deps: [shop_page_features, shop_page_features, shop_page_features, shop_page_features, shop_page_bundles]
 * createTable "user_pets", deps: [pets, users]
 * createTable "user_bots", deps: [users]
 * createTable "user_furnitures", deps: [furnitures, user_furnitures]
 * createTable "hotel_feedback", deps: [users]
 * createTable "user_roles", deps: [users, permission_roles]
 * createTable "role_permissions", deps: [permission_roles, permissions]
 * createTable "achievements", deps: [badges, achievement_categories]
 * createTable "user_achievements", deps: [achievements]
 * createTable "user_clothing", deps: [users]
 * createTable "user_effects", deps: [users]
 * createTable "user_figures", deps: [users]
 * createTable "user_notifications", deps: [users]
 * addIndex "furnitures_type_color" to table "furnitures"
 * addIndex "user_badges_user_id_badge_id" to table "user_badges"
 * addIndex "user_achievements_user_id_achievement_id" to table "user_achievements"
 * addIndex "clothes_part_set_id" to table "clothes"
 * addIndex "user_clothing_user_id_set_id" to table "user_clothing"
 * addIndex "user_effects_user_id_enable" to table "user_effects"
 * addIndex "user_figures_user_id_index" to table "user_figures"
 * addIndex "user_notifications_user_id_type" to table "user_notifications"
 *
 **/

var info = {
    revision: 1,
    name: "init",
    created: "2026-07-19T01:45:00.389Z",
    comment: "",
};

type QueryInterfaceCommand =
    | { fn: "createTable"; params: Parameters<QueryInterface["createTable"]> }
    | { fn: "addIndex"; params: Parameters<QueryInterface["addIndex"]> }
    | { fn: "addConstraint"; params: Parameters<QueryInterface["addConstraint"]> }
    | { fn: "removeIndex"; params: Parameters<QueryInterface["removeIndex"]> }
    | { fn: "removeConstraint"; params: Parameters<QueryInterface["removeConstraint"]> }
    | { fn: "dropTable"; params: Parameters<QueryInterface["dropTable"]> };

const IndexTypes: Record<IndexType, IndexType> = {
    UNIQUE: "UNIQUE",
    FULLTEXT: "FULLTEXT",
    SPATIAL: "SPATIAL",
};

var migrationCommands: QueryInterfaceCommand[] = [
    {
        fn: "createTable",
        params: [
            "shop_page_features",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                title: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                image: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                configuration: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                featuredPageId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    // references: {
                    //     model: "shop_pages",
                    //     key: "id",
                    // }, # Create after shop_pages is created
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "shop_pages",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                parentId: {
                    primaryKey: false,
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                index: {
                    type: Sequelize.INTEGER,
                },
                category: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                title: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                description: {
                    allowNull: true,
                    type: Sequelize.STRING(512),
                },
                icon: {
                    allowNull: true,
                    type: Sequelize.STRING(32),
                },
                header: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                teaser: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                featureVerticalId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_page_features",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                featureHorizontalTopId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_page_features",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                featureHorizontalMiddleId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_page_features",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                featureHorizontalBottomId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_page_features",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                bundleId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    // references: {
                    //     model: "shop_page_bundles",
                    //     key: "id",
                    // }, # Create after shop_page_bundles is created
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    /**
     * Create Referente to shop_page_features.featuredPageId after shop_pages is created
     *
     */

    {
        fn: "addConstraint",
        params: [
            "shop_page_features",
            {
                fields: ["featuredPageId"],
                type: "foreign key",
                name: "shop_page_features_featuredPageId_fkey",
                references: {
                    table: "shop_pages",
                    field: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
        ],
    },

    {
        fn: "createTable",
        params: [
            "badges",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING(32),
                },
                name: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                description: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                image: {
                    allowNull: false,
                    type: Sequelize.TEXT,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "furnitures",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING(64),
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING(256),
                },
                description: {
                    allowNull: true,
                    type: Sequelize.STRING(256),
                },
                category: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                interactionType: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                placement: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                dimensions: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                directions: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                animations: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                color: {
                    type: Sequelize.INTEGER,
                },
                flags: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                customParams: {
                    allowNull: true,
                    type: Sequelize.TEXT,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "pet_breeds",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                type: {
                    type: Sequelize.STRING,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING(256),
                },
                index: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "room_models",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING,
                },
                door: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                grid: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                index: {
                    type: Sequelize.INTEGER,
                },
                indexable: {
                    type: Sequelize.BOOLEAN,
                },
                membership: {
                    allowNull: true,
                    type: Sequelize.STRING,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "room_categories",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING(64),
                },
                title: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                developer: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "room_groups",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                description: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                primaryColor: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                secondaryColor: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                badge: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                rights: {
                    allowNull: false,
                    type: Sequelize.STRING,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_tokens",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                secretKey: {
                    allowNull: false,
                    type: Sequelize.TEXT,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_badges",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                equipped: {
                    type: Sequelize.BOOLEAN,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                badgeId: {
                    allowNull: true,
                    type: Sequelize.STRING(32),
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_preferences",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                allowFriendsRequest: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                },
                allowFriendsFollow: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "web_articles",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                bannerUrl: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                title: {
                    allowNull: false,
                    type: Sequelize.STRING(150),
                },
                content: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                authorId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "web_article_likes",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                articleId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                userId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "web_article_comments",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                content: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                articleId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                userId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "room_chat_styles",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING(32),
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "hotel_settings",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                value: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "permissions",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "permission_roles",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "achievement_categories",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING(32),
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                iconImage: {
                    allowNull: false,
                    type: Sequelize.STRING,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "clothes",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                part: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                setId: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                membership: {
                    allowNull: true,
                    type: Sequelize.STRING,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "furniture_crackables",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                requiredClicks: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                furnitureId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "furnitures",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "furniture_crackable_rewards",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                chance: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                furnitureId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "furnitures",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                crackableId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "furniture_crackables",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "pets",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING(64),
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING(256),
                },
                palettes: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                breedId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "pet_breeds",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "shop_page_furnitures",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                credits: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                duckets: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                diamonds: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                membership: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                furnitureId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "furnitures",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                shopPageId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_pages",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "shop_page_bundles",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                credits: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                duckets: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                diamonds: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                pageId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_pages",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                roomId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    // references: {
                    //     model: "rooms",
                    //     key: "id",
                    // }, # Create after rooms is created
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                badgeId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    // references: {
                    //     model: "badges",
                    //     key: "id",
                    // }, # Create after badges is created
                    allowNull: true,
                    type: Sequelize.STRING(32),
                },
            },
            {},
        ],
    },

    /**
     * Create Referente to shop_pages.bundleId after shop_page_bundles is created
     */

    {
        fn: "addConstraint",
        params: [
            "shop_pages",
            {
                fields: ["bundleId"],
                type: "foreign key",
                name: "shop_pages_bundleId_fkey",
                references: {
                    table: "shop_page_bundles",
                    field: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
        ],
    },

    {
        fn: "createTable",
        params: [
            "shop_page_bots",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                motto: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                figureConfiguration: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                credits: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                duckets: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                diamonds: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                shopPageId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_pages",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "shop_page_pets",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                credits: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                duckets: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                diamonds: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                petId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "pets",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                shopPageId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_pages",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "shop_page_memberships",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                membership: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                days: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                credits: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                duckets: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                diamonds: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                shopPageId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "shop_pages",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_groups",
            {
                userId: {
                    onDelete: "NO ACTION",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    primaryKey: true,
                    unique: "user_groups_groupId_userId_unique",
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                groupId: {
                    onDelete: "NO ACTION",
                    onUpdate: "CASCADE",
                    references: {
                        model: "room_groups",
                        key: "id",
                    },
                    primaryKey: true,
                    unique: "user_groups_groupId_userId_unique",
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                pending: {
                    type: Sequelize.BOOLEAN,
                },
                owner: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                },
                admin: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
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
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_friends",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                relationship: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                friendId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_friend_requests",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                senderId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                receiverId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "rooms",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                description: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                thumbnail: {
                    allowNull: true,
                    type: Sequelize.BLOB("medium"),
                },
                maxUsers: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                structure: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                lock: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                password: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                ownerId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                categoryId: {
                    allowNull: true,
                    type: Sequelize.STRING(64),
                },
                groupId: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
            },
            {},
        ],
    },

    // Add Constraint from shop_page_bundles.roomnId to rooms.id after rooms is created

    {
        fn: "addConstraint",
        params: [
            "shop_page_bundles",
            {
                fields: ["roomId"],
                type: "foreign key",
                name: "shop_pages_roomId_fkey",
                references: {
                    table: "rooms",
                    field: "id",
                },
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            },
        ],
    },

    {
        fn: "createTable",
        params: [
            "room_rights",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                roomId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "rooms",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_pets",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                position: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                direction: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                animation: {
                    type: Sequelize.INTEGER,
                },
                color: {
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                petId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "pets",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                roomId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_bots",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                motto: {
                    allowNull: true,
                    type: Sequelize.STRING,
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                figureConfiguration: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                speech: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                position: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                direction: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                relaxed: {
                    allowNull: false,
                    type: Sequelize.BOOLEAN,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                roomId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_furnitures",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                name: {
                    allowNull: true,
                    type: Sequelize.STRING(256),
                },
                description: {
                    allowNull: true,
                    type: Sequelize.STRING(256),
                },
                position: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                direction: {
                    allowNull: true,
                    type: Sequelize.INTEGER,
                },
                animation: {
                    type: Sequelize.INTEGER,
                },
                animationTags: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                colorTags: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                color: {
                    type: Sequelize.INTEGER,
                },
                data: {
                    allowNull: true,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                furnitureId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "furnitures",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                userId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                roomId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                traxId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "user_furnitures",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "hotel_feedback",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                area: {
                    allowNull: true,
                    type: Sequelize.STRING(128),
                },
                description: {
                    allowNull: false,
                    type: Sequelize.STRING(512),
                },
                status: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_roles",
            {
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                roleId: {
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    references: {
                        model: "permission_roles",
                        key: "id",
                    },
                    primaryKey: true,
                    type: Sequelize.STRING,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "role_permissions",
            {
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                roleId: {
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    references: {
                        model: "permission_roles",
                        key: "id",
                    },
                    primaryKey: true,
                    type: Sequelize.STRING,
                },
                permissionId: {
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                    references: {
                        model: "permissions",
                        key: "id",
                    },
                    primaryKey: true,
                    type: Sequelize.STRING,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "achievements",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.STRING(32),
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                description: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                badgePrefix: {
                    allowNull: false,
                    type: Sequelize.STRING(32),
                },
                levels: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                badgeId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "badges",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.STRING(32),
                },
                categoryId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "achievement_categories",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.STRING(32),
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_achievements",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                level: {
                    type: Sequelize.INTEGER,
                },
                score: {
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    allowNull: true,
                    type: Sequelize.UUID,
                },
                achievementId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "achievements",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.STRING(32),
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_clothing",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                setId: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_effects",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                enable: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_figures",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                index: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                figureConfiguration: {
                    allowNull: false,
                    type: Sequelize.TEXT,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },

    {
        fn: "createTable",
        params: [
            "user_notifications",
            {
                id: {
                    primaryKey: true,
                    type: Sequelize.UUID,
                },
                type: {
                    allowNull: false,
                    type: Sequelize.STRING,
                },
                count: {
                    allowNull: false,
                    type: Sequelize.INTEGER,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                },
                userId: {
                    onDelete: "SET NULL",
                    onUpdate: "CASCADE",
                    references: {
                        model: "users",
                        key: "id",
                    },
                    allowNull: true,
                    type: Sequelize.UUID,
                },
            },
            {},
        ],
    },
    {
        fn: "addIndex",
        params: [
            "furnitures",

            {
                name: "furnitures_type_color",
                type: IndexTypes.UNIQUE,
                fields: ["type", "color"],
            },
        ],
    },
    {
        fn: "addIndex",
        params: [
            "user_badges",

            {
                name: "user_badges_user_id_badge_id",
                type: IndexTypes.UNIQUE,
                fields: ["userId", "badgeId"],
            },
        ],
    },
    {
        fn: "addIndex",
        params: [
            "user_achievements",

            {
                name: "user_achievements_user_id_achievement_id",
                type: IndexTypes.UNIQUE,
                fields: ["userId", "achievementId"],
            },
        ],
    },
    {
        fn: "addIndex",
        params: [
            "clothes",

            {
                name: "clothes_part_set_id",
                type: IndexTypes.UNIQUE,
                fields: ["part", "setId"],
            },
        ],
    },
    {
        fn: "addIndex",
        params: [
            "user_clothing",

            {
                name: "user_clothing_user_id_set_id",
                type: IndexTypes.UNIQUE,
                fields: ["userId", "setId"],
            },
        ],
    },
    {
        fn: "addIndex",
        params: [
            "user_effects",

            {
                name: "user_effects_user_id_enable",
                type: IndexTypes.UNIQUE,
                fields: ["userId", "enable"],
            },
        ],
    },
    {
        fn: "addIndex",
        params: [
            "user_figures",

            {
                name: "user_figures_user_id_index",
                type: IndexTypes.UNIQUE,
                fields: ["userId", "index"],
            },
        ],
    },
    {
        fn: "addIndex",
        params: [
            "user_notifications",

            {
                name: "user_notifications_user_id_type",
                type: IndexTypes.UNIQUE,
                fields: ["userId", "type"],
            },
        ],
    },
];

var rollbackCommands: QueryInterfaceCommand[] = [
    {
        fn: "dropTable",
        params: ["furniture_crackable_rewards"],
    },

    {
        fn: "dropTable",
        params: ["shop_page_furnitures"],
    },

    {
        fn: "dropTable",
        params: ["shop_page_bots"],
    },
    {
        fn: "dropTable",
        params: ["shop_page_pets"],
    },
    {
        fn: "dropTable",
        params: ["shop_page_memberships"],
    },
    {
        fn: "dropTable",
        params: ["user_groups"],
    },
    {
        fn: "dropTable",
        params: ["user_friends"],
    },
    {
        fn: "dropTable",
        params: ["user_friend_requests"],
    },

    {
        fn: "dropTable",
        params: ["room_rights"],
    },

    {
        fn: "dropTable",
        params: ["user_pets"],
    },
    {
        fn: "dropTable",
        params: ["user_bots"],
    },
    {
        fn: "dropTable",
        params: ["user_furnitures"],
    },
    {
        fn: "dropTable",
        params: ["hotel_feedback"],
    },
    {
        fn: "dropTable",
        params: ["user_roles"],
    },
    {
        fn: "dropTable",
        params: ["role_permissions"],
    },

    {
        fn: "dropTable",
        params: ["user_achievements"],
    },
    {
        fn: "dropTable",
        params: ["user_clothing"],
    },
    {
        fn: "dropTable",
        params: ["user_effects"],
    },
    {
        fn: "dropTable",
        params: ["user_figures"],
    },
    {
        fn: "dropTable",
        params: ["user_notifications"],
    },

    {
        fn: "dropTable",
        params: ["room_models"],
    },
    {
        fn: "dropTable",
        params: ["room_categories"],
    },
    {
        fn: "dropTable",
        params: ["room_groups"],
    },

    {
        fn: "dropTable",
        params: ["user_tokens"],
    },
    {
        fn: "dropTable",
        params: ["user_badges"],
    },
    {
        fn: "dropTable",
        params: ["user_preferences"],
    },
    {
        fn: "dropTable",
        params: ["web_articles"],
    },
    {
        fn: "dropTable",
        params: ["web_article_likes"],
    },
    {
        fn: "dropTable",
        params: ["web_article_comments"],
    },
    {
        fn: "dropTable",
        params: ["room_chat_styles"],
    },
    {
        fn: "dropTable",
        params: ["hotel_settings"],
    },
    {
        fn: "dropTable",
        params: ["permissions"],
    },
    {
        fn: "dropTable",
        params: ["permission_roles"],
    },

    {
        fn: "dropTable",
        params: ["clothes"],
    },

    /// changed
    {
        fn: "dropTable",
        params: ["furniture_crackables"],
    },

    {
        fn: "dropTable",
        params: ["pets"],
    },

    {
        fn: "removeConstraint",
        params: ["shop_page_bundles", "shop_pages_roomId_fkey"],
    },

    {
        fn: "dropTable",
        params: ["rooms"],
    },

    {
        fn: "removeConstraint",
        params: ["shop_page_features", "shop_page_features_featuredPageId_fkey"],
    },

    {
        fn: "removeConstraint",
        params: ["shop_page_bundles", "shop_page_bundles_ibfk_1"],
    },

    {
        fn: "dropTable",
        params: ["shop_pages"],
    },

    {
        fn: "dropTable",
        params: ["achievements"],
    },
    {
        fn: "dropTable",
        params: ["badges"],
    },

    {
        fn: "dropTable",
        params: ["furnitures"],
    },
    {
        fn: "dropTable",
        params: ["pet_breeds"],
    },
    {
        fn: "dropTable",
        params: ["users"],
    },
    {
        fn: "dropTable",
        params: ["achievement_categories"],
    },
    {
        fn: "dropTable",
        params: ["shop_page_features"],
    },
    {
        fn: "dropTable",
        params: ["shop_page_bundles"],
    },
];

module.exports = {
    up: (queryInterface: QueryInterface) =>
        queryInterface.sequelize.transaction(async (transaction: Transaction) => {
            for (var index = 0; index < migrationCommands.length; index++) {
                let command = migrationCommands[index];
                if (!command) return;

                // Patch the command params to inject the transaction object
                let finalParams = [];
                switch (command.fn) {
                    case "createTable":
                        finalParams = [command.params[0], command.params[1], { transaction }];
                        break;
                    case "addIndex":
                        finalParams = [command.params[0], command.params[1], { transaction }];
                        break;
                    case "addConstraint":
                        finalParams = [command.params[0], { ...command.params[1], transaction }];
                        break;

                    default:
                        console.log("Unknown command: " + command.fn);
                        finalParams = [...command.params, { transaction }];
                }

                console.log(
                    "[#" +
                        index +
                        "] execute: " +
                        command.fn +
                        " " +
                        finalParams.map((p: any, index) => `#${index} - ` + inspect(p)).join(", "),
                );

                await (queryInterface[command.fn] as Function).apply(queryInterface, finalParams);
            }
        }),
    down: (queryInterface: any) =>
        queryInterface.sequelize.transaction(async (transaction: Transaction) => {
            for (var index = 0; index < rollbackCommands.length; index++) {
                let command = rollbackCommands[index];
                if (!command) return;
                console.log("[#" + index + "] execute: " + command.fn + " on " + command.params[0]);

                await queryInterface[command.fn].apply(queryInterface, [
                    ...command.params,
                    { transaction },
                ]);
            }
        }),
    info: info,
};

const inspect = (obj: any) => {
    if (obj === null || obj === undefined) {
        return "" + obj;
    }
    if (typeof obj === "object") {
        return `Object: Keys: ${Object.keys(obj).join(", ")}`;
    }
    return obj.toString();
};
