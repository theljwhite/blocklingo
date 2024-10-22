SET IDENTITY_INSERT [UserType] ON;
INSERT INTO [UserType] ([Id], [Name])
VALUES 
    (1, 'Admin'),
    (2, 'Player')
SET IDENTITY_INSERT [UserType] OFF;
GO

SET IDENTITY_INSERT [UserProfile] ON;
INSERT INTO [UserProfile]
  ([Id], [Username], [Password], [FirstName], [LastName], [Email], [Avatar], [WalletAddress], [CreatedAt], [LastLoginDate], [UserTypeId])
VALUES 
  (1, 'schismlj', 'haha', 'LJ', 'White', 'theljwhite@gmail.com', null, null, '09-20-2025', null, 1),
  (2, 'jimbo43', 'hehe', 'Jim', 'Bo', 'jimbo@fakemail.fake', null, null, '09-20-2025', null, 2)
SET IDENTITY_INSERT [UserProfile] OFF;
GO

-- Make a puzzle manually: 

SET IDENTITY_INSERT [TriggerGroup] ON;
INSERT INTO [TriggerGroup] ([Id], [Name], [CreatedAt])
VALUES (1, 'Example Puzzle Trigger Group', GETDATE());
SET IDENTITY_INSERT [TriggerGroup] OFF;
GO

SET IDENTITY_INSERT [TriggerWord] ON;
INSERT INTO [TriggerWord] ([Id], [Word], [TriggerGroupId], [CreatedAt])
VALUES
    (1, 'cow', 1, GETDATE()),
    (2, 'dog', 1, GETDATE()),
    (3, 'fruit', 1, GETDATE()),
    (4, 'tree', 1, GETDATE());
SET IDENTITY_INSERT [TriggerWord] OFF;
GO

SET IDENTITY_INSERT [PuzzleWord] ON;
INSERT INTO [PuzzleWord] ([Id], [Word], [TriggerWordId], [CreatedAt])
VALUES
    -- Puzzle words for 'cow'
    (1, 'dung', 1, GETDATE()),
    (2, 'heifer', 1, GETDATE()),
    (3, 'milking', 1, GETDATE()),
    (4, 'calf', 1, GETDATE()),

    -- Puzzle words for 'dog'
    (5, 'kennel', 2, GETDATE()),
    (6, 'sled', 2, GETDATE()),
    (7, 'terrier', 2, GETDATE()),
    (8, 'herding', 2, GETDATE()),

    -- Puzzle words for 'fruit'
    (9, 'achene', 3, GETDATE()),
    (10, 'drupe', 3, GETDATE()),
    (11, 'pappus', 3, GETDATE()),
    (12, 'ripen', 3, GETDATE()),

    -- Puzzle words for 'tree'
    (13, 'trunks', 4, GETDATE()),
    (14, 'frog', 4, GETDATE()),
    (15, 'bark', 4, GETDATE()),
    (16, 'trunk', 4, GETDATE());
SET IDENTITY_INSERT [PuzzleWord] OFF;
GO

SET IDENTITY_INSERT [GuessWord] ON; 
INSERT INTO [GuessWord] ([Id], [Word], [CreatedAt])
VALUES
    (1, 'timer', GETDATE())
SET IDENTITY_INSERT [GuessWord] OFF; 
GO

SET IDENTITY_INSERT [Puzzle] ON;
INSERT INTO [Puzzle] ([Id], [Name], [CreatedAt], [Difficulty], [Points], [RewardAmount], [ExpirationAt], [TriggerGroupId], [GuessWordId])
VALUES (1, 'Example Puzzle', GETDATE(), 'Medium', 100, 5.0, '12-29-2024', 1, 1); 
SET IDENTITY_INSERT [Puzzle] OFF;
GO

SET IDENTITY_INSERT [PuzzleTriggerWord] ON;
INSERT INTO [PuzzleTriggerWord] ([Id], [PuzzleId], [TriggerWordId])
VALUES
    (1, 1, 1), -- cow
    (2, 1, 2), -- dog
    (3, 1, 3), -- fruit
    (4, 1, 4); -- tree
SET IDENTITY_INSERT [PuzzleTriggerWord] OFF; 
GO

SET IDENTITY_INSERT [PuzzlePuzzleWord] ON; 
INSERT INTO [PuzzlePuzzleWord] ([Id], [PuzzleId], [PuzzleWordId])
VALUES 
    -- Cow's puzzle words
    (1, 1, 1),
    (2, 1, 2), 
    (3, 1, 3),
    (4, 1, 4),

    -- Dog's puzzle words
    (5, 1, 5),
    (6, 1, 6),
    (7, 1, 7),
    (8, 1, 8),

    -- Fruit's puzzle words
    (9, 1, 9),
    (10, 1, 10),
    (11, 1, 11),
    (12, 1, 12),

    --Tree's puzzle words
    (13, 1, 13),
    (14, 1, 14),
    (15, 1, 15),
    (16, 1, 16);
SET IDENTITY_INSERT [PuzzlePuzzleWord] OFF; 
GO

-- Add another puzzle manually for now: 

SET IDENTITY_INSERT [TriggerGroup] ON;
INSERT INTO [TriggerGroup] ([Id], [Name], [CreatedAt])
VALUES (2, 'Example Puzzle Trigger Group 2', GETDATE());
SET IDENTITY_INSERT [TriggerGroup] OFF;
GO

SET IDENTITY_INSERT [TriggerWord] ON;
INSERT INTO [TriggerWord] ([Id], [Word], [TriggerGroupId], [CreatedAt])
VALUES
    (5, 'football terms', 2, GETDATE()),
    (6, 'relating to a street', 2, GETDATE()),
    (7, 'duck', 2, GETDATE()),
    (8, 'garbage', 2, GETDATE());
SET IDENTITY_INSERT [TriggerWord] OFF;
GO

SET IDENTITY_INSERT [PuzzleWord] ON;
INSERT INTO [PuzzleWord] ([Id], [Word], [TriggerWordId], [CreatedAt])
VALUES
    -- Puzzle words for 'football terms'
    (17, 'nfl', 5, GETDATE()),
    (18, 'afl', 5, GETDATE()),
    (19, 'linebacker', 5, GETDATE()),
    (20, 'lineman', 5, GETDATE()),

    -- Puzzle words for 'relating to a street'
    (21, 'downtown', 6, GETDATE()),
    (22, 'boulevard', 6, GETDATE()),
    (23, 'avenue', 6, GETDATE()),
    (24, 'subway', 6, GETDATE()),

    -- Puzzle words for 'duck'
    (25, 'anas', 7, GETDATE()),
    (26, 'pochard', 7, GETDATE()),
    (27, 'daffy', 7, GETDATE()),
    (28, 'coot', 7, GETDATE()),

    -- Puzzle words for 'garbage'
    (29, 'dumpster', 8, GETDATE()),
    (30, 'dump', 8, GETDATE()),
    (31, 'scow', 8, GETDATE()),
    (32, 'pail', 8, GETDATE());
SET IDENTITY_INSERT [PuzzleWord] OFF;
GO

SET IDENTITY_INSERT [GuessWord] ON; 
INSERT INTO [GuessWord] ([Id], [Word], [CreatedAt])
VALUES
    (2, 'bacon', GETDATE())
SET IDENTITY_INSERT [GuessWord] OFF; 
GO

SET IDENTITY_INSERT [Puzzle] ON;
INSERT INTO [Puzzle] ([Id], [Name], [CreatedAt], [Difficulty], [Points], [RewardAmount], [ExpirationAt], [TriggerGroupId], [GuessWordId])
VALUES (2, 'Example Puzzle 2', GETDATE(), 'Medium', 100, 5.0, '12-29-2024', 2, 2); 
SET IDENTITY_INSERT [Puzzle] OFF;
GO

SET IDENTITY_INSERT [PuzzleTriggerWord] ON;
INSERT INTO [PuzzleTriggerWord] ([Id], [PuzzleId], [TriggerWordId])
VALUES
    (5, 2, 5), -- football terms
    (6, 2, 6), -- relating to a street
    (7, 2, 7), -- duck
    (8, 2, 8); -- garbage
SET IDENTITY_INSERT [PuzzleTriggerWord] OFF; 
GO

SET IDENTITY_INSERT [PuzzlePuzzleWord] ON; 
INSERT INTO [PuzzlePuzzleWord] ([Id], [PuzzleId], [PuzzleWordId])
VALUES 
    -- football's puzzle words
    (17, 2, 17),
    (18, 2, 18), 
    (19, 2, 19),
    (20, 2, 20),

    -- street's puzzle words
    (21, 2, 21),
    (22, 2, 22),
    (23, 2, 23),
    (24, 2, 24),

    -- duck's puzzle words
    (25, 2, 25),
    (26, 2, 26),
    (27, 2, 27),
    (28, 2, 28),

    --garbage's puzzle words
    (29, 2, 29),
    (30, 2, 30),
    (31, 2, 31),
    (32, 2, 32);
SET IDENTITY_INSERT [PuzzlePuzzleWord] OFF; 
GO

--Add an achievement
SET IDENTITY_INSERT [Achievement] ON;
INSERT INTO [Achievement] ([Id], [Name], [Description], [Image])
VALUES (1, 'Perfect', 'Complete a full puzzle with no connections mistakes', 'perfect-badge.png')
SET IDENTITY_INSERT [Achievement] OFF;
GO