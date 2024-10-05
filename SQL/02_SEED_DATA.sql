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