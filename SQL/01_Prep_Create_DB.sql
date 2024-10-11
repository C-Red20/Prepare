USE [master]

IF db_id('Prep') IS NULL
    CREATE DATABASE [Prep]
GO

USE [Prep]
GO

DROP TABLE IF EXISTS [ListItem];
DROP TABLE IF EXISTS [List];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [UserProfile]; 
DROP TABLE IF EXISTS [Message];
GO

CREATE TABLE [UserProfile] (  
    [Id] INT PRIMARY KEY IDENTITY,
    [Name] NVARCHAR(255) NOT NULL,
    [Email] NVARCHAR(255) NOT NULL
)
GO

CREATE TABLE [Category] (
    [Id] INT PRIMARY KEY IDENTITY,
    [Name] NVARCHAR(255) NOT NULL
)
GO

CREATE TABLE [Item] (
    [Id] INT PRIMARY KEY IDENTITY,
    [Name] NVARCHAR(255) NOT NULL,
    [UserProfileId] INT NOT NULL,  
    [CategoryId] INT NOT NULL,
    [Have] BIT NOT NULL,

    CONSTRAINT [FK_Item_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id]),  
    CONSTRAINT [FK_Item_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
)
GO

CREATE TABLE [List] (
    [Id] INT PRIMARY KEY IDENTITY,
    [Name] NVARCHAR(255) NOT NULL,
    [UserProfileId] INT NOT NULL,  
    [Location] NVARCHAR(255),
    [LastUpdated] DATETIME,

    CONSTRAINT [FK_List_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])  
)


CREATE TABLE [ListItem] (
    [Id] INT PRIMARY KEY IDENTITY,
    [ItemId] INT NOT NULL,
    [ListId] INT NOT NULL,
    [Amount] INT NOT NULL,
    [NeedsPurchase] BIT DEFAULT 0,
    [LastUpdated] DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT [FK_ListItem_Item] FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id]),
    CONSTRAINT [FK_ListItem_List] FOREIGN KEY ([ListId]) REFERENCES [List] ([Id])
)
GO

CREATE TABLE [Message] (
    [Id] INT PRIMARY KEY IDENTITY,
    [Content] NVARCHAR(255) NOT NULL,
    [UserProfileId] INT NOT NULL,  
    [PostedDate] DATETIME NOT NULL,

    CONSTRAINT [FK_Message_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO
