USE [EmployeesDB]
GO
/****** Object:  StoredProcedure [dbo].[usp_GetEmployeeDetails]    Script Date: 01-08-2024 14:41:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[usp_GetEmployeeDetails]
AS
BEGIN
    SELECT
	    ae.EmpID,
        e.EmployeeNo,
        e.FirstName,
        e.LastName,
        r.RoleName as Designation,
        d.Name AS Domain,
        ad.MobileNo,
        ad.Address
    FROM
        AspireEmployees ae
    JOIN
        Employee e ON ae.Employee_Id = e.Id
    JOIN
        Role r ON ae.Role_Id = r.Id
    JOIN
        Domain d ON ae.Domain_Id = d.Id
    JOIN
        AdditionalDetails ad ON ae.AdditionalDetails_Id = ad.Id;
END
