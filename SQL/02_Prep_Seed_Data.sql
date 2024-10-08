USE [Prep];
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile] ([Id], [Name], [Email]) VALUES
(1, 'John Doe', 'john.doe@example.com'),
(2, 'Jane Smith', 'jane.smith@example.com'),
(3, 'Mike Johnson', 'mike.johnson@example.com');
SET IDENTITY_INSERT [UserProfile] OFF


SET IDENTITY_INSERT [Category] ON
INSERT INTO [Category] ([Id], [Name]) VALUES
(1, 'Food Supplies'),
(2, 'Medical Supplies'),
(3, 'Tools and Gear'),
(4, 'Water Purification'),
(5, 'Clothing');
SET IDENTITY_INSERT [Category] OFF


SET IDENTITY_INSERT [Item] ON
INSERT INTO [Item] ([Id], [Name], [UserProfileId], [CategoryId], [Have]) VALUES
(1, 'Canned Beans', 1, 1, 1),
(2, 'First Aid Kit', 1, 2, 1),
(3, 'Multi-tool', 2, 3, 0),
(4, 'Water Filter', 3, 4, 1),
(5, 'Tactical Backpack', 2, 3, 1),
(6, 'Freeze-dried Meals', 1, 1, 0),
(7, 'Emergency Blanket', 3, 5, 1);
SET IDENTITY_INSERT [Item] OFF


SET IDENTITY_INSERT [List] ON
INSERT INTO [List] ([Id], [Name], [UserProfileId], [Location], [Checked]) VALUES
(1, 'Survival Gear', 1, 'Storage Room', '2024-10-01'),
(2, 'Food Stockpile', 2, 'Pantry', NULL),
(3, 'Emergency Kit', 3, 'Car', '2024-09-28');
SET IDENTITY_INSERT [List] OFF


SET IDENTITY_INSERT [ListItem] ON
INSERT INTO [ListItem] ([Id], [ItemId], [ListId], [Amount]) VALUES
(1, 1, 1, 10),  -- 10 Canned Beans for Survival Gear
(2, 2, 1, 1),   -- 1 First Aid Kit for Survival Gear
(3, 6, 2, 5),   -- 5 Freeze-dried Meals for Food Stockpile
(4, 4, 3, 1),   -- 1 Water Filter for Emergency Kit
(5, 5, 3, 1);   -- 1 Tactical Backpack for Emergency Kit
SET IDENTITY_INSERT [ListItem] OFF


SET IDENTITY_INSERT [Message] ON
INSERT INTO [Message] ([Id], [Message], [UserProfileId], [PostedDate]) VALUES
(1, 'Just stocked up on supplies!', 1, '2024-10-01 10:00:00'),
(2, 'Looking for tips on emergency kits.', 2, '2024-10-02 12:30:00'),
(3, 'Found a great deal on freeze-dried meals!', 1, '2024-10-03 14:15:00'),
(4, 'Need recommendations for a good multi-tool.', 3, '2024-10-04 09:45:00');
SET IDENTITY_INSERT [Message] OFF
