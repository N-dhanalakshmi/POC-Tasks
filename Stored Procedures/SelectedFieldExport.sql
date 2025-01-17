USE [EmployeesDB]
GO
/****** Object:  StoredProcedure [dbo].[usp_GetSelectedFieldsFromSource]    Script Date: 01-08-2024 14:40:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[usp_GetSelectedFieldsFromSource]
    @columns NVARCHAR(MAX)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = 'SELECT ' + @columns + ' FROM (SELECT
	    ae.EmpID,
        e.EmployeeNo,
        e.FirstName,
        e.LastName,
        r.RoleName as Designation,
        d.Name AS Domain,
        MobileNo =''+91''+ ad.MobileNo ,
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
        AdditionalDetails ad ON ae.AdditionalDetails_Id = ad.Id) AS SOURCE';
    EXEC sp_executesql @SQL;
END
