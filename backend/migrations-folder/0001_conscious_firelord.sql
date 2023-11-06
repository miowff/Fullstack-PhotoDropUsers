CREATE TABLE `AccessRefreshTokens` (
	`UserId` varchar(80) NOT NULL,
	`AccessToken` varchar(256) NOT NULL,
	`RefreshToken` varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE `PhoneNumberCode` RENAME COLUMN `Price` TO `Code`;--> statement-breakpoint
ALTER TABLE `PhoneNumberCode` MODIFY COLUMN `Code` int NOT NULL;--> statement-breakpoint
ALTER TABLE `AccessRefreshTokens` ADD CONSTRAINT `AccessRefreshTokens_UserId_Users_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;