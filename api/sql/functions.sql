USE [lawyershub_db];

GO
CREATE FUNCTION Fn_getUser(@username NVARCHAR(max),@email NVARCHAR(max),@phone NVARCHAR(max))
RETURNS Table
AS
RETURN (SELECT *
FROM [dbo].auth_user as auth
WHERE auth.username LIKE @username
    OR auth.email = @email
    OR auth.phone = @phone);

GO