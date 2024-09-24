USE [master]
GO
IF db_id('Blocklingo') IS NULL
  CREATE DATABASE [Blocklingo]
GO
USE [Blocklingo]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType]; 
DROP TABLE IF EXISTS [Puzzle]; 
DROP TABLE IF EXISTS [Leaderboard];
DROP TABLE IF EXISTS [PuzzleAttempt];
DROP TABLE IF EXISTS [UserAchievement];
DROP TABLE IF EXISTS [Achievement]; 


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Username] nvarchar(255) NOT NULL, 
  [Password] nvarchar(255) NOT NULL, 
  [FirstName] nvarchar(255),
  [LastName] nvarchar(255),
  [Email] nvarchar(255),
  [Avatar] nvarchar(255),
  [WalletAddress] nvarchar(255), 
  [CreatedAt] datetime NOT NULL,
  [LastLoginDate] datetime, 
  [UserTypeId] int NOT NULL
)
GO

CREATE TABLE [UserType] (
[Id] integer PRIMARY KEY identity NOT NULL,
[Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Puzzle] (
[Id] integer PRIMARY KEY identity NOT NULL, 
[Name] nvarchar(255) NOT NULL, 
[CreatedAt] datetime NOT NULL, 
[Solution] nvarchar(255) NOT NULL, 
[Difficulty] nvarchar(255) NOT NULL, 
[PuzzleType] nvarchar(255) NOT NULL,
[Status] nvarchar(255) NOT NULL, 
[Points] integer NOT NULL, 
[RewardAmount] decimal NOT NULL, 
[ExpirationAt] datetime NOT NULL, 
[IsDailyPuzzle] bit NOT NULL, 
[WordLength] integer NOT NULL
)
GO

CREATE TABLE [Leaderboard] (
[Id] integer PRIMARY KEY identity NOT NULL, 
[TotalSolvedPuzzles] integer NOT NULL, 
[CurrentStreak] integer NOT NULL, 
[BestStreak] integer NOT NULL, 
[Rank] integer NOT NULL,
[UserId] integer NOT NULL, 
[LastSolvedPuzzleId] integer NOT NULL, 
[RankedAt] datetime
)
GO

CREATE TABLE [PuzzleAttempt] (
[Id] integer PRIMARY KEY identity NOT NULL, 
[CompletionTimeSeconds] integer, 
[Tries] integer, 
[IsSolved] bit NOT NULL, 
[EarnedPoints] integer,
[UserId] integer NOT NULL, 
[PuzzleId] integer NOT NULL
)
GO

CREATE TABLE [Achievement] (
[Id] integer PRIMARY KEY identity NOT NULL,
[Name] nvarchar(255) NOT NULL, 
[Description] nvarchar(255), 
[Points] integer NOT NULL
)
GO

CREATE TABLE [UserAchievement](
[Id] integer PRIMARY KEY identity NOT NULL, 
[UserId] integer NOT NULL,
[AchievementId] integer NOT NULL, 
[EarnedAt] datetime NOT NULL
)
GO


ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO
ALTER TABLE [PuzzleAttempt] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [PuzzleAttempt] ADD FOREIGN KEY ([PuzzleId]) REFERENCES [Puzzle] ([Id])
GO

ALTER TABLE [Leaderboard] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [Leaderboard] ADD FOREIGN KEY ([LastSolvedPuzzleId]) REFERENCES [Puzzle] ([Id])
GO

ALTER TABLE [UserAchievement] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO
ALTER TABLE [UserAchievement] ADD FOREIGN KEY ([AchievementId]) REFERENCES [Achievement] ([Id])
GO 

SET IDENTITY_INSERT [UserType] ON
INSERT INTO [UserType] ([Id], [Name])
VALUES 
    (1, 'Admin'),
    (2, 'Player')
SET IDENTITY_INSERT [UserType] OFF
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [Username], [Password], [FirstName], [LastName], [Email], [Avatar], [WalletAddress], [CreatedAt], [LastLoginDate], [UserTypeId])
VALUES 
  (1, 'schismlj', 'haha', 'LJ', 'White', 'theljwhite@gmail.com', null, null, '09-20-2025', null, 1),
  (2, 'jimbo43', 'hehe', 'Jim', 'Bo', 'jimbo@fakemail.fake', null, null, '09-20-2025', null, 2)
SET IDENTITY_INSERT [UserProfile] OFF;