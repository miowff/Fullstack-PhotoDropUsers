CREATE TABLE `Albums` (
	`Id` varchar(100) PRIMARY KEY NOT NULL,
	`Title` varchar(256) NOT NULL,
	`Location` varchar(100) NOT NULL,
	`Datapicker` varchar(100) NOT NULL,
	`CreatedDate` date NOT NULL,
	`PhotographerId` varchar(100) NOT NULL,
	`Price` int NOT NULL DEFAULT 5);
--> statement-breakpoint
CREATE TABLE `PhoneNumberCode` (
	`PhoneNumber` varchar(100) NOT NULL,
	`Price` int NOT NULL DEFAULT 5,
	`ResendTries` int NOT NULL DEFAULT 1,
	`SentTime` int NOT NULL);
--> statement-breakpoint
CREATE TABLE `Photos` (
	`Id` varchar(80) PRIMARY KEY NOT NULL,
	`AlbumId` varchar(70) NOT NULL,
	`AlbumTitle` varchar(256) NOT NULL,
	`PhotoName` varchar(256) NOT NULL);
--> statement-breakpoint
CREATE TABLE `Photographers` (
	`Id` varchar(70) PRIMARY KEY NOT NULL,
	`Email` varchar(100),
	`FullName` varchar(256),
	`Login` varchar(256) NOT NULL,
	`PasswordHash` varchar(256) NOT NULL);
--> statement-breakpoint
CREATE TABLE `Users` (
	`Id` varchar(70) PRIMARY KEY NOT NULL,
	`Email` varchar(100),
	`FullName` varchar(256),
	`ProfilePhotoKey` varchar(256),
	`PhoneNumber` varchar(100) NOT NULL);
--> statement-breakpoint
CREATE TABLE `UserPhotos` (
	`UserId` varchar(70) NOT NULL,
	`PhotoId` varchar(80) NOT NULL,
	`AlbumId` varchar(70) NOT NULL,
	`IsActivated` boolean NOT NULL DEFAULT false);
--> statement-breakpoint
ALTER TABLE `Photos` ADD CONSTRAINT `Photos_AlbumId_Albums_Id_fk` FOREIGN KEY (`AlbumId`) REFERENCES `Albums`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserPhotos` ADD CONSTRAINT `UserPhotos_UserId_Users_Id_fk` FOREIGN KEY (`UserId`) REFERENCES `Users`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserPhotos` ADD CONSTRAINT `UserPhotos_PhotoId_Photos_Id_fk` FOREIGN KEY (`PhotoId`) REFERENCES `Photos`(`Id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `UserPhotos` ADD CONSTRAINT `UserPhotos_AlbumId_Albums_Id_fk` FOREIGN KEY (`AlbumId`) REFERENCES `Albums`(`Id`) ON DELETE no action ON UPDATE no action;