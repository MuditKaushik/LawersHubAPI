USE [lawyershub_db];
GO
CREATE PROCEDURE sp_addAuthuser
    @firstname NVARCHAR(20),
    @middlename NVARCHAR(20),
    @lastname NVARCHAR(20),
    @phone NVARCHAR(20),
    @email NVARCHAR(20),
    @username NVARCHAR(20),
    @password NVARCHAR(20)
AS
DECLARE @userid NVARCHAR(50);
SET @userid = NEWID()
BEGIN
    INSERT INTO [dbo].auth_user
    VALUES
        (
            @userid,
            @firstname,
            @middlename,
            @lastname,
            @phone,
            @email,
            @username,
            @password,
            SYSDATETIME()
    );
    RETURN @userid;
END;

GO
CREATE PROCEDURE sp_userExist
    @username NVARCHAR(20),
    @email NVARCHAR(20),
    @phone NVARCHAR(20)
AS
DECLARE @isExist BIT;
BEGIN
    IF EXISTS(
    SELECT *
    FROM [dbo].auth_user as authuser
    WHERE [authuser].username LIKE @username
        AND [authuser].email LIKE @email
        AND [authuser].phone LIKE @phone)
    BEGIN
        SET @isExist = 1;
    END
    ELSE
    BEGIN
        SET @isExist = 0;
    END;
    RETURN @isExist;
END;

GO
CREATE PROCEDURE sp_getAuthuser
    @username NVARCHAR(20),
    @password NVARCHAR(20)
AS
BEGIN
    SELECT *
    FROM [dbo].auth_user as lawyer
    WHERE [lawyer].username LIKE @username
        AND [lawyer].password = @password;
END;

GO
CREATE PROCEDURE sp_addClient
    @userid NVARCHAR(50),
    @firstName NVARCHAR(20),
    @middleName NVARCHAR(20),
    @lastName NVARCHAR(20),
    @address1 NVARCHAR(50),
    @address2 NVARCHAR(50),
    @country NVARCHAR(50),
    @state NVARCHAR(20),
    @district NVARCHAR(40),
    @city NVARCHAR(40),
    @purpose INTEGER,
    @isprivate BIT,
    @about NVARCHAR(max)
AS
BEGIN
    INSERT INTO [dbo].user_client
    VALUES(
            NEWID(),
            @userid,
            @firstName,
            @middleName,
            @lastName,
            @address1,
            @address2,
            @country,
            @state,
            @district,
            @city,
            @purpose,
            @isprivate,
            @about,
            SYSDATETIME(),
            SYSDATETIME()
    );
END;

GO
CREATE PROCEDURE sp_updateClient
    @clientid NVARCHAR(50),
    @firstName NVARCHAR(20),
    @middleName NVARCHAR(20),
    @lastName NVARCHAR(20),
    @address1 NVARCHAR(50),
    @address2 NVARCHAR(50),
    @country NVARCHAR(50),
    @state NVARCHAR(20),
    @district NVARCHAR(40),
    @city NVARCHAR(40),
    @purpose INTEGER,
    @isprivate BIT,
    @about NVARCHAR(max),
    @updated DATETIME
AS
DECLARE @isupdated BIT
BEGIN
    UPDATE [dbo].user_client
    SET 
    firstName =  @firstName,
    middleName = @middleName,
    lastname   = @lastName,
    address1 = @address1,
    address2 = @address2,
    country = @country,
    state = @state,
    district = @district,
    city = @city,
    purpose = @purpose,
    isprivate = @isprivate,
    about = @about,
    updated = SYSDATETIME()
    WHERE clientid = @clientid;
    SET @isupdated = 1;
    RETURN @isupdated;
END;

GO
CREATE PROCEDURE sp_getclients
    @userid NVARCHAR(50),
    @clientType BIT
AS
BEGIN
    SELECT *
    FROM [dbo].user_client as [client]
    WHERE [client].userid = @userid
        AND [client].isprivate = @clientType
    ORDER BY [client].updated DESC
END