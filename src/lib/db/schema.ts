import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const workspaceRole = pgEnum("workspace_role", [
  "owner",
  "editor",
  "viewer",
]);

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const workspaceMembers = pgTable(
  "workspace_members",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: workspaceRole("role").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("workspace_members_workspace_user_unique").on(
      table.workspaceId,
      table.userId,
    ),
    index("workspace_members_user_idx").on(table.userId),
  ],
);

export const blockType = pgEnum("block_type", [
  "link",
  "text",
  "image",
  "embed",
  "social",
  "support",
  "signup",
  "contact",
]);

export const creatorProfiles = pgTable(
  "creator_profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    workspaceId: uuid("workspace_id")
      .notNull()
      .references(() => workspaces.id, { onDelete: "cascade" }),
    handle: text("handle").notNull(),
    displayName: text("display_name").notNull(),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    theme: jsonb("theme").notNull().default({}),
    customDomain: text("custom_domain"),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    uniqueIndex("creator_profiles_handle_unique").on(table.handle),
    uniqueIndex("creator_profiles_custom_domain_unique").on(table.customDomain),
  ],
);

export const blocks = pgTable(
  "blocks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => creatorProfiles.id, { onDelete: "cascade" }),
    type: blockType("type").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    enabled: boolean("enabled").notNull().default(true),
    data: jsonb("data").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("blocks_profile_idx").on(table.profileId),
    index("blocks_profile_sort_idx").on(table.profileId, table.sortOrder),
  ],
);

export const leadKind = pgEnum("lead_kind", ["signup", "contact"]);

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => creatorProfiles.id, { onDelete: "cascade" }),
    kind: leadKind("kind").notNull(),
    email: text("email").notNull(),
    name: text("name"),
    message: text("message"),
    meta: jsonb("meta").notNull().default({}),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("leads_profile_created_idx").on(table.profileId, table.createdAt),
  ],
);

export const analyticsEventType = pgEnum("analytics_event_type", [
  "view",
  "click",
]);

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => creatorProfiles.id, { onDelete: "cascade" }),
    blockId: uuid("block_id").references(() => blocks.id, {
      onDelete: "set null",
    }),
    type: analyticsEventType("type").notNull(),
    url: text("url"),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    ipHash: text("ip_hash"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("analytics_events_profile_created_idx").on(
      table.profileId,
      table.createdAt,
    ),
    index("analytics_events_profile_type_created_idx").on(
      table.profileId,
      table.type,
      table.createdAt,
    ),
  ],
);
