USE [EmployeesDB]
GO
/****** Object:  StoredProcedure [dbo].[usp_UpdateEmployeeDetails]    Script Date: 01-08-2024 14:42:08 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[usp_UpdateEmployeeDetails]
@Data udt_EmployeeDetails READONLY
AS
BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY

        -- Merge data into Employee table
        MERGE INTO Employee AS target
        USING @Data AS source
        ON target.EmployeeNo = source.EmployeeNo
        WHEN MATCHED AND (target.FirstName != source.FirstName OR target.LastName != source.LastName)  THEN
            UPDATE SET
                target.FirstName = source.FirstName,
                target.LastName = source.LastName
        WHEN NOT MATCHED BY TARGET THEN
            INSERT (EmpID, EmployeeNo, FirstName, LastName, Status)
            VALUES (source.EmpID, source.EmployeeNo, source.FirstName, source.LastName, 1);

        -- Merge data into AdditionalDetails table
        MERGE INTO AdditionalDetails AS target
        USING @Data AS source
        ON target.EmpID = source.EmpID
        WHEN MATCHED AND (target.MobileNo != source.MobileNo OR target.Address != source.Address) THEN
            UPDATE SET
                target.MobileNo = source.MobileNo,
                target.Address = source.Address
        WHEN NOT MATCHED BY TARGET THEN
            INSERT (EmpID, MobileNo, Address, Status)
            VALUES (source.EmpID, source.MobileNo, source.Address, 1);

        -- Merge into AspireEmployees table
        MERGE INTO AspireEmployees AS target
        USING (
            SELECT 
                source.EmpID, 
                (SELECT TOP 1 Id FROM AdditionalDetails WHERE EmpID = source.EmpID) AS AdditionalDetails_Id,
                (SELECT TOP 1 Id FROM Role WHERE RoleName = source.Designation) AS Role_Id,
                (SELECT TOP 1 Id FROM Domain WHERE Name = source.Domain) AS Domain_Id,
                (SELECT TOP 1 Id FROM Employee WHERE EmployeeNo = source.EmployeeNo) AS Employee_Id
            FROM @Data AS source
        ) AS source
        ON target.EmpID = source.EmpID
        WHEN MATCHED AND (
            target.AdditionalDetails_Id != source.AdditionalDetails_Id OR
            target.Role_Id != source.Role_Id OR
            target.Domain_Id != source.Domain_Id OR
            target.Employee_Id != source.Employee_Id
        ) THEN
            UPDATE SET
                target.AdditionalDetails_Id = source.AdditionalDetails_Id,
                target.Role_Id = source.Role_Id,
                target.Domain_Id = source.Domain_Id,
                target.Employee_Id = source.Employee_Id
        WHEN NOT MATCHED BY TARGET THEN
            INSERT (EmpID, AdditionalDetails_Id, Role_Id, Domain_Id, Employee_Id)
            VALUES (source.EmpID, source.AdditionalDetails_Id, source.Role_Id, source.Domain_Id, source.Employee_Id);

        -- Merge data into EmployeeDetails table
        MERGE INTO EmployeeDetails AS target
        USING @Data AS source
        ON target.EmpID = source.EmpID
        WHEN MATCHED THEN
            UPDATE SET
                target.FirstName = source.FirstName,
                target.LastName = source.LastName,
                target.MobileNo = source.MobileNo,
                target.Address = source.Address,
                target.Designation = source.Designation,
                target.Domain = source.Domain
        WHEN NOT MATCHED BY TARGET THEN
            INSERT (EmpID, EmployeeNo, FirstName, LastName, MobileNo, Address, Designation, Domain)
            VALUES (source.EmpID, source.EmployeeNo, source.FirstName, source.LastName, source.MobileNo, source.Address, source.Designation, source.Domain);

        COMMIT;
    END TRY
    BEGIN CATCH
        ROLLBACK;
    END CATCH
END
