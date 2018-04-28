USE [master];
GO
IF(EXISTS(SELECT * FROM sys.databases as [sysdb] WHERE [sysdb].name = N'lawyershub_db'))
BEGIN
    print('DATABASE Exists');
END
ELSE
BEGIN
    CREATE DATABASE lawyershub_db;
END