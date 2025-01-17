USE [EmployeesDB]
GO
/****** Object:  StoredProcedure [dbo].[usp_InsertEmployeeDetails]    Script Date: 01-08-2024 14:39:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[usp_InsertEmployeeDetails]
@Data udt_EmployeeDetails READONLY
AS
BEGIN
BEGIN TRANSACTION ;
BEGIN TRY

-- Insert data into Employee table
INSERT INTO Employee (EmpID, EmployeeNo, FirstName, LastName, Status)
SELECT EmpID, EmployeeNo, FirstName, LastName, 1
FROM @Data;

-- Getting Id from Employees table
DECLARE @EmployeeId UNIQUEIDENTIFIER;
SELECT TOP 1 @EmployeeId = Id FROM Employee WHERE EmployeeNo IN (SELECT EmployeeNo FROM @Data);

-- Insert data into AdditionalDetails table
INSERT INTO AdditionalDetails (EmpID, MobileNo, Address, Status)
SELECT EmpID, MobileNo, Address, 1
FROM @Data;

-- Getting Id from AdditionalDetails table
DECLARE @AdditionalDetailsId UNIQUEIDENTIFIER;
SELECT TOP 1 @AdditionalDetailsId = Id FROM AdditionalDetails WHERE EmpID IN (SELECT EmpID FROM @Data);

-- Getting Id from Role table
DECLARE @RoleId UNIQUEIDENTIFIER;
SELECT TOP 1 @RoleId = Id FROM Role WHERE RoleName IN (SELECT Designation FROM @Data);

-- Getting Id from Domain table
DECLARE @DomainId UNIQUEIDENTIFIER;
SELECT TOP 1 @DomainId = Id FROM Domain WHERE Name IN (SELECT Domain FROM @Data);

--inserting into AspireEmployees Table
INSERT INTO AspireEmployees(EmpID, AdditionalDetails_Id, Role_Id, Domain_Id,Employee_Id)
VALUES
    ((SELECT EmpId FROM @Data), @AdditionalDetailsId, @RoleId, @DomainId,@EmployeeId);

INSERT INTO EmployeeDetails SELECT * FROM @Data WHERE EmpID IN (SELECT EmpId FROM @Data)

COMMIT ;
END TRY
BEGIN CATCH
ROLLBACK ;
END CATCH
END