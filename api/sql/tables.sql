USE [lawyershub_db];
GO
CREATE TABLE auth_user
(
    userid NVARCHAR(50),
    firstName NVARCHAR(20) NOT NULL,
    middleName NVARCHAR(20) NULL,
    lastName NVARCHAR(20) NOT NULL,
    phone NVARCHAR(15) NOT NULL,
    email NVARCHAR(50) NOT NULL,
    username NVARCHAR(20) NOT NULL,
    password NVARCHAR(20) NOT NULL,
    updated DATETIME NOT NULL,
    CONSTRAINT pk_authuser_userid PRIMARY KEY (userid)
);
CREATE TABLE user_client
(
    clientid NVARCHAR(50) NOT NULL,
    userid NVARCHAR(50) NOT NULL,
    firstName NVARCHAR(20) NOT NULL,
    middleName NVARCHAR(20) NULL,
    lastName NVARCHAR(20) NOT NULL,
    address1 NVARCHAR(50) NOT NULL,
    address2 NVARCHAR(50) NULL,
    country NVARCHAR(50) NOT NULL,
    state NVARCHAR(20) NOT NULL,
    district NVARCHAR(40) NOT NULL,
    city NVARCHAR(40) NOT NULL,
    email NVARCHAR(40) NULL,
    purpose INTEGER NOT NULL,
    isprivate BIT NOT NULL,
    about NVARCHAR(max) NULL,
    created DATETIME,
    updated DATETIME,
    CONSTRAINT pk_userclient_clientid PRIMARY KEY (clientid),
    CONSTRAINT fk_userclient_userid FOREIGN KEY (userid) REFERENCES [dbo].auth_user(userid)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
GO