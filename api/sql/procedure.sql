USE [lawyershub_db];
GO
CREATE PROCEDURE sp_addAuthuser
    @firstname NVARCHAR(20),
    @middlename NVARCHAR(20),
    @lastname NVARCHAR(20),
    @phone NVARCHAR(20),
    @email NVARCHAR(20),
    @username NVARCHAR(20),
    @password NVARCHAR(20),
    @iscreated BIT OUTPUT
AS
DECLARE @id NVARCHAR(50);
SET @id = NEWID()
BEGIN
    IF NOT EXISTS(SELECT *
    FROM dbo.Fn_getUser(@username,@email,@phone))
    BEGIN
        INSERT INTO [dbo].auth_user
        VALUES
            (@id, @firstname, @middlename, @lastname, @phone, @email, @username, @password, SYSUTCDATETIME());
        SET @iscreated = 1;
    END
    ELSE
    SET @iscreated = 0
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
    @email NVARCHAR(40),
    @purpose INTEGER,
    @isprivate BIT,
    @about NVARCHAR(max),
    @created BIT OUTPUT
AS
BEGIN
    INSERT INTO [dbo].user_client
    VALUES(NEWID(), @userid, @firstName, @middleName, @lastName,
            @address1, @address2, @country, @state, @district,
            @city, @email, @purpose, @isprivate, @about,
            SYSUTCDATETIME(), SYSUTCDATETIME());
    SET @created = 1;
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
    @updated DATETIME,
    @isupdated BIT OUTPUT

AS
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