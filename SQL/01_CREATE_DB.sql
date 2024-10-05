USE [master]
GO
IF db_id('Blocklingo') IS NULL
  CREATE DATABASE [Blocklingo]
GO
USE [Blocklingo]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType]; 

DROP TABLE IF EXISTS [TriggerWord];
DROP TABLE IF EXISTS [TriggerGroup];
DROP TABLE IF EXISTS [PuzzleWord];
DROP TABLE IF EXISTS [PuzzleTriggerWord];
DROP TABLE IF EXISTS [PuzzlePuzzleWord];
DROP TABLE IF EXISTS [GuessWord]; 

DROP TABLE IF EXISTS [Puzzle]; 
DROP TABLE IF EXISTS [Leaderboard];
DROP TABLE IF EXISTS [PuzzleAttempt];
DROP TABLE IF EXISTS [UserAchievement];
DROP TABLE IF EXISTS [Achievement]; 


CREATE TABLE [UserProfile] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [Username] nvarchar(50) NOT NULL, 
  [Password] nvarchar(50) NOT NULL, 
  [FirstName] nvarchar(50),
  [LastName] nvarchar(50),
  [Email] nvarchar(255),
  [Avatar] nvarchar(255),
  [WalletAddress] nvarchar(42), 
  [CreatedAt] datetime NOT NULL,
  [LastLoginDate] datetime, 
  [UserTypeId] int NOT NULL
)
GO

CREATE TABLE [UserType] (
[Id] integer PRIMARY KEY identity NOT NULL,
[Name] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [TriggerWord] (
  [Id] integer PRIMARY KEY identity NOT NULL, 
  [Word] nvarchar(50) NOT NULL, 
  [TriggerGroupId] integer NOT NULL, 
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [TriggerGroup] (
  [Id] integer PRIMARY KEY identity NOT NULL, 
  [Name] nvarchar(50) NOT NULL, 
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [PuzzleWord] (
  [Id] integer PRIMARY KEY identity NOT NULL, 
  [Word] nvarchar(50) NOT NULL, 
  [TriggerWordId] integer NOT NULL, 
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [PuzzleTriggerWord] (
  [Id] integer PRIMARY KEY identity NOT NULL,
  [PuzzleId] integer NOT NULL,
  [TriggerWordId] integer NOT NULL
)
GO

CREATE TABLE [PuzzlePuzzleWord] (
  [Id] integer PRIMARY KEY identity NOT NULL, 
  [PuzzleId] integer NOT NULL,
  [PuzzleWordId] integer NOT NULL
)
GO

CREATE TABLE [GuessWord] (
  [Id] integer PRIMARY KEY identity NOT NULL, 
  [Word] nvarchar(50) NOT NULL,
  [CreatedAt] datetime NOT NULL
)
GO

CREATE TABLE [Puzzle] (
[Id] integer PRIMARY KEY identity NOT NULL, 
[Name] nvarchar(50) NOT NULL, 
[CreatedAt] datetime NOT NULL, 
[Difficulty] nvarchar(50) NOT NULL, 
[Points] integer NOT NULL, 
[RewardAmount] decimal(30, 18) NOT NULL, 
[ExpirationAt] datetime NOT NULL, 
[TriggerGroupId] integer NOT NULL, 
[GuessWordId] integer NOT NULL
)
GO

CREATE TABLE [Leaderboard] (
[Id] integer PRIMARY KEY identity NOT NULL, 
[TotalSolvedPuzzles] integer NOT NULL, 
[TotalPoints] integer NOT NULL, 
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


-- Can later possibly index:

-- CREATE INDEX idx_UserProfile_UserTypeId ON [UserProfile] ([UserTypeId]);
-- CREATE INDEX idx_Puzzle_TriggerGroupId ON [Puzzle] ([TriggerGroupId]);
-- CREATE INDEX idx_Leaderboard_UserId ON [Leaderboard] ([UserId]);
-- CREATE INDEX idx_PuzzleAttempt_UserId ON [PuzzleAttempt] ([UserId]);
-- CREATE INDEX idx_PuzzleAttempt_PuzzleId ON [PuzzleAttempt] ([PuzzleId]);

-- ALTER TABLE [TriggerWord] ADD CONSTRAINT uq_TriggerWord UNIQUE ([Word]);
-- ALTER TABLE [PuzzleWord] ADD CONSTRAINT uq_PuzzleWord UNIQUE ([Word]);
-- ALTER TABLE [GuessWord] ADD CONSTRAINT uq_GuessWord UNIQUE ([Word]);


ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO
ALTER TABLE [TriggerWord] ADD FOREIGN KEY ([TriggerGroupId]) REFERENCES [TriggerGroup] ([Id])
GO
ALTER TABLE [PuzzleWord] ADD FOREIGN KEY ([TriggerWordId]) REFERENCES [TriggerWord] ([Id])
GO
ALTER TABLE [PuzzleTriggerWord] ADD FOREIGN KEY ([PuzzleId]) REFERENCES [Puzzle] ([Id])
GO
ALTER TABLE [PuzzleTriggerWord] ADD FOREIGN KEY ([TriggerWordId]) REFERENCES [TriggerWord] ([Id])
GO
ALTER TABLE [PuzzlePuzzleWord] ADD FOREIGN KEY ([PuzzleId]) REFERENCES [Puzzle] ([Id])
GO
ALTER TABLE [PuzzlePuzzleWord] ADD FOREIGN KEY ([PuzzleWordId]) REFERENCES [PuzzleWord] ([Id])
GO
ALTER TABLE [Puzzle] ADD FOREIGN KEY ([TriggerGroupId]) REFERENCES [TriggerGroup] ([Id])
GO
ALTER TABLE [Puzzle] ADD FOREIGN KEY ([GuessWordId]) REFERENCES [GuessWord] ([Id])
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

-- If a user is deleted, also delete their attempts and achievements.
ALTER TABLE [PuzzleAttempt] 
  ADD CONSTRAINT fk_PuzzleAttempt_UserId FOREIGN KEY ([UserId]) REFERENCES [UserProfile]([Id]) 
  ON DELETE CASCADE;
GO

ALTER TABLE [UserAchievement] 
  ADD CONSTRAINT fk_UserAchievement_UserId FOREIGN KEY ([UserId]) REFERENCES [UserProfile]([Id]) 
  ON DELETE CASCADE;
GO

-- If a puzzle is deleted, also delete associated attempts and leaderboard entries.
ALTER TABLE [PuzzleAttempt] 
  ADD CONSTRAINT fk_PuzzleAttempt_PuzzleId FOREIGN KEY ([PuzzleId]) REFERENCES [Puzzle]([Id]) 
  ON DELETE CASCADE;
GO

ALTER TABLE [Leaderboard] 
  ADD CONSTRAINT fk_Leaderboard_LastSolvedPuzzleId FOREIGN KEY ([LastSolvedPuzzleId]) REFERENCES [Puzzle]([Id]) 
  ON DELETE CASCADE;
GO

-- If an achievement is deleted, also remove associated user achievements.
ALTER TABLE [UserAchievement] 
  ADD CONSTRAINT fk_UserAchievement_AchievementId FOREIGN KEY ([AchievementId]) REFERENCES [Achievement]([Id]) 
  ON DELETE CASCADE;
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