CREATE TABLE `fintech_port_account` (
	`userId` text(255) NOT NULL,
	`type` text(255) NOT NULL,
	`provider` text(255) NOT NULL,
	`providerAccountId` text(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text(255),
	`scope` text(255),
	`id_token` text,
	`session_state` text(255),
	PRIMARY KEY(`provider`, `providerAccountId`),
	FOREIGN KEY (`userId`) REFERENCES `fintech_port_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `fintech_port_account` (`userId`);--> statement-breakpoint
CREATE TABLE `fintech_port_bankAccounts` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `fintech_port_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `fintech_port_roundUps` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`transactionId` text(255) NOT NULL,
	`amount_cents` integer,
	FOREIGN KEY (`userId`) REFERENCES `fintech_port_user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transactionId`) REFERENCES `fintech_port_transactions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `fintech_port_session` (
	`sessionToken` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`expires` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `fintech_port_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `session_userId_idx` ON `fintech_port_session` (`userId`);--> statement-breakpoint
CREATE TABLE `fintech_port_verification_token` (
	`identifier` text(255) NOT NULL,
	`token` text(255) NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`identifier`, `token`)
);
--> statement-breakpoint
CREATE TABLE `fintech_port_transactions` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`userId` text(255) NOT NULL,
	`bankAccountId` text(255) NOT NULL,
	`amount` numeric,
	FOREIGN KEY (`userId`) REFERENCES `fintech_port_user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `fintech_port_user` (
	`id` text(255) PRIMARY KEY NOT NULL,
	`name` text(255),
	`email` text(255) NOT NULL,
	`emailVerified` integer DEFAULT (unixepoch()),
	`image` text(255)
);
