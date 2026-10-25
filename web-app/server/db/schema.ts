import { relations } from "drizzle-orm";
import { boolean, decimal, integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";


export const checkInStatusEnum = pgEnum('check_in_status', ['active', 'checked out']);
export const volunteerStatusEnum = pgEnum('volunteer_status', ['pending', 'approved', 'rejected']);


export const roles = pgTable("roles", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    notes: varchar('notes', { length: 200 })
});

export const countries = pgTable("countries", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    code: varchar('code', { length: 5 }).notNull().unique(),
    telCode: varchar('tel_code', { length: 5 }).notNull().unique(),
    phoneFormat: varchar('phone_format', { length: 50 }).notNull()
});

export const users = pgTable("users", {
    id: serial('user_id').primaryKey(),
    nickName: varchar('nickname', { length: 50 }).notNull(),
    telephone: varchar('telephone', { length: 20 }).notNull().unique(),
    memberCount: integer('member_count').notNull().default(0),
    password: varchar('hashed_password', { length: 250 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),

    // Foreign keys
    memberId: integer('member_id').references((): any => users.id), 
    countryId: integer('country_id').references(() => countries.id).notNull(),
    roleId: integer('role_id').references(() => roles.id).notNull(),
});

export const items = pgTable("items", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    notes: varchar('notes', { length: 200 }),

    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const statuses = pgTable("statuses", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
    color: varchar('color_code', { length: 50 }).notNull(),
    notes: varchar('notes', { length: 200 })
});

export const shelters = pgTable("shelters", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    address: text('address').notNull(),
    latitude: decimal('latitude', { precision: 12, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 12, scale: 8 }).notNull(),
    
    // Capacities
    maxCapacity: integer('max_capacity').notNull(),
    currentOccupancy: integer('current_occupancy').notNull().default(0),

    // Feature Flags (Filters)
    wheelchairAccess: boolean('wheelchair_access').default(false).notNull(),
    petsAllowed: boolean('pets_allowed').default(false).notNull(),
    medicalHelp: boolean('medical_help').default(false).notNull(),
    hasWater: boolean('has_water').default(false).notNull(),
    hasPower: boolean('has_power').default(false).notNull(),
    hasWifi: boolean('has_wifi').default(false).notNull(),

    // Approval
    isApproved: boolean('is_approved').default(false).notNull(),
    approvedBy: integer('approved_by').references(() => users.id), // Admin who approved
    
    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const shelterStatuses = pgTable("shelter_statuses", {
    id: serial('id').primaryKey(),
    shelterId: integer('shelter_id').references(() => shelters.id).notNull(),
    statusId: integer('status_id').references(() => statuses.id).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const shelterInventories = pgTable("shelter_inventories", {
    id: serial('id').primaryKey(),
    shelterId: integer('shelter_id').references(() => shelters.id).notNull(),
    itemId: integer('item_id').references(() => items.id).notNull(),

    quantity: integer('quantity').notNull().default(0),
    isWishlist: boolean('is_wishlist').default(false).notNull(), // true if it's an urgent request

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const checkIns = pgTable("check_ins", {
    id: serial('id').primaryKey(),
    shelterId: integer('shelter_id').references(() => shelters.id).notNull(),
    userId: integer('user_id').references(() => users.id).notNull(),
    partySize: integer('party_size').notNull().default(1), // how many people checked in with this user

    status: checkInStatusEnum('status').notNull().default('active'),

    checkedInAt: timestamp('checked_in_at', { withTimezone: true }).defaultNow().notNull(),
    checkedOutAt: timestamp('checked_out_at', { withTimezone: true }),
});

export const skills = pgTable("skills", {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(), // e.g., "Medical", "Translation"
    notes: varchar('notes', { length: 200 }),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const volunteers = pgTable("volunteers", {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id).notNull(),
    shelterId: integer('shelter_id').references(() => shelters.id).notNull(),

    skillId: integer('skill_id').references(() => skills.id).notNull(),
    
    shiftStart: timestamp('shift_start', { withTimezone: true }).notNull(),
    shiftEnd: timestamp('shift_end', { withTimezone: true }).notNull(),
    
    status: volunteerStatusEnum('status').notNull().default('pending'),

    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const donations = pgTable("donations", {
    id: serial('id').primaryKey(),
    donorId: integer('donor_id').references(() => users.id).notNull(),
    shelterId: integer('shelter_id').references(() => shelters.id),
    itemId: integer('item_id').references(() => items.id).notNull(),
    quantity: integer('quantity').notNull(),

    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});

export const emergencyAlerts = pgTable("emergency_alerts", {
    id: serial('id').primaryKey(),
    adminId: integer('admin_id').references(() => users.id).notNull(),
    title: varchar('title', { length: 150 }).notNull(),
    message: text('message').notNull(),

    latitude: decimal('latitude', { precision: 12, scale: 8 }).notNull(),
    longitude: decimal('longitude', { precision: 12, scale: 8 }).notNull(),
    radiusKm: decimal('radius_km', { precision: 5, scale: 2 }).notNull().default('2.00'),

    deletedAt: timestamp('deleted_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull()
});


// ────────────────────────────────────────────────────────────
// Relations
// ────────────────────────────────────────────────────────────
export const rolesRelations = relations(roles, ({ many }) => ({
    users: many(users),
}));

export const countriesRelations = relations(countries, ({ many }) => ({
    users: many(users),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
    role: one(roles, {
        fields: [users.roleId], references: [roles.id],
    }),
    member: one(users, {
        fields: [users.memberId], references: [users.id],
        relationName: 'userMember',
    }),
    subMembers: many(users, {
        relationName: 'userMember',
    }),
    country: one(countries, {
        fields: [users.countryId], references: [countries.id],
    }),
    approvedShelters: many(shelters),
    checkIns: many(checkIns),
    volunteers: many(volunteers),
    donations: many(donations),
    emergencyAlerts: many(emergencyAlerts),
}));

export const itemsRelations = relations(items, ({ many }) => ({
    shelterInventories: many(shelterInventories),
    donations: many(donations),
}));

export const statusesRelations = relations(statuses, ({ many }) => ({
    shelterStatuses: many(shelterStatuses),
}));

export const sheltersRelations = relations(shelters, ({ one, many }) => ({
    approvedByAdmin: one(users, {
        fields: [shelters.approvedBy], references: [users.id],
    }),
    shelterStatuses: many(shelterStatuses),
    shelterInventories: many(shelterInventories),
    checkIns: many(checkIns),
    volunteers: many(volunteers),
    donations: many(donations),
}));

export const shelterStatusesRelations = relations(shelterStatuses, ({ one }) => ({
    shelter: one(shelters, {
        fields: [shelterStatuses.shelterId], references: [shelters.id],
    }),
    status: one(statuses, {
        fields: [shelterStatuses.statusId], references: [statuses.id],
    }),
}));

export const shelterInventoriesRelations = relations(shelterInventories, ({ one }) => ({
    shelter: one(shelters, {
        fields: [shelterInventories.shelterId], references: [shelters.id],
    }),
    item: one(items, {
        fields: [shelterInventories.itemId], references: [items.id],
    }),
}));

export const checkInsRelations = relations(checkIns, ({ one }) => ({
    shelter: one(shelters, {
        fields: [checkIns.shelterId], references: [shelters.id],
    }),
    user: one(users, {
        fields: [checkIns.userId], references: [users.id],
    }),
}));

export const skillsRelations = relations(skills, ({ many }) => ({
    volunteers: many(volunteers),
}));

export const volunteersRelations = relations(volunteers, ({ one }) => ({
    user: one(users, {
        fields: [volunteers.userId], references: [users.id],
    }),
    shelter: one(shelters, {
        fields: [volunteers.shelterId], references: [shelters.id],
    }),
    skill: one(skills, {
        fields: [volunteers.skillId], references: [skills.id],
    }),
}));

export const donationsRelations = relations(donations, ({ one }) => ({
    donor: one(users, {
        fields: [donations.donorId], references: [users.id],
    }),
    shelter: one(shelters, {
        fields: [donations.shelterId], references: [shelters.id],
    }),
    item: one(items, {
        fields: [donations.itemId], references: [items.id],
    }),
}));

export const emergencyAlertsRelations = relations(emergencyAlerts, ({ one }) => ({
    admin: one(users, {
        fields: [emergencyAlerts.adminId], references: [users.id],
    }),
}));


// ────────────────────────────────────────────────────────────
// Types
// ────────────────────────────────────────────────────────────
export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;

export type Country = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;

export type Status = typeof statuses.$inferSelect;
export type NewStatus = typeof statuses.$inferInsert;

export type Shelter = typeof shelters.$inferSelect;
export type NewShelter = typeof shelters.$inferInsert;

export type ShelterStatus = typeof shelterStatuses.$inferSelect;
export type NewShelterStatus = typeof shelterStatuses.$inferInsert;

export type ShelterInventory = typeof shelterInventories.$inferSelect;
export type NewShelterInventory = typeof shelterInventories.$inferInsert;

export type CheckIn = typeof checkIns.$inferSelect;
export type NewCheckIn = typeof checkIns.$inferInsert;

export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;

export type Volunteer = typeof volunteers.$inferSelect;
export type NewVolunteer = typeof volunteers.$inferInsert;

export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;

export type EmergencyAlert = typeof emergencyAlerts.$inferSelect;
export type NewEmergencyAlert = typeof emergencyAlerts.$inferInsert;
