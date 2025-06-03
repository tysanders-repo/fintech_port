CREATE TABLE "fintech_port_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" varchar,
	"access_token" varchar,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" varchar,
	"session_state" varchar(255),
	CONSTRAINT "fintech_port_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "fintech_port_bankAccounts" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fintech_port_roundUps" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"transactionId" varchar(255) NOT NULL,
	"amount_cents" integer
);
--> statement-breakpoint
CREATE TABLE "fintech_port_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "fintech_port_transactions" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"bankAccountId" varchar(255) NOT NULL,
	"amount" numeric,
	"balance" numeric,
	"description" text,
	"category" text
);
--> statement-breakpoint
CREATE TABLE "fintech_port_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"roundUp" numeric,
	"savingsGoal" numeric
);
--> statement-breakpoint
CREATE TABLE "fintech_port_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "fintech_port_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
ALTER TABLE "fintech_port_account" ADD CONSTRAINT "fintech_port_account_userId_fintech_port_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."fintech_port_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fintech_port_bankAccounts" ADD CONSTRAINT "fintech_port_bankAccounts_userId_fintech_port_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."fintech_port_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fintech_port_roundUps" ADD CONSTRAINT "fintech_port_roundUps_userId_fintech_port_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."fintech_port_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fintech_port_roundUps" ADD CONSTRAINT "fintech_port_roundUps_transactionId_fintech_port_transactions_id_fk" FOREIGN KEY ("transactionId") REFERENCES "public"."fintech_port_transactions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fintech_port_session" ADD CONSTRAINT "fintech_port_session_userId_fintech_port_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."fintech_port_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fintech_port_transactions" ADD CONSTRAINT "fintech_port_transactions_userId_fintech_port_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."fintech_port_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "fintech_port_account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "fintech_port_session" USING btree ("userId");