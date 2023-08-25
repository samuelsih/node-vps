ALTER TABLE "users" ALTER COLUMN "full_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "phone" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(100) NOT NULL;