RENAME TABLE `AccessRefreshTokens` TO `UserRefreshToken`;--> statement-breakpoint
ALTER TABLE `UserRefreshToken` DROP FOREIGN KEY `AccessRefreshTokens_UserId_Users_Id_fk`;
--> statement-breakpoint
ALTER TABLE `UserRefreshToken` ADD CONSTRAINT `UserRefreshToken_UserId_Users_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserRefreshToken` DROP COLUMN `AccessToken`;