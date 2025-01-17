USE [EmployeesDB]
GO
/****** Object:  StoredProcedure [dbo].[usp_GetSelectedDetails]    Script Date: 01-08-2024 14:41:06 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROC [dbo].[usp_GetSelectedDetails]
    @columns NVARCHAR(MAX)
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX);
	DECLARE @ColumnNames NVARCHAR(MAX);
	SET @ColumnNames = REPLACE(@columns, 'MobileNo', '''+91''+ MobileNo');
    SET @SQL = 'SELECT ' + @ColumnNames + ' FROM
        AspireEmployees ae
    JOIN
        Employee e ON ae.Employee_Id = e.Id
    JOIN
        Role r ON ae.Role_Id = r.Id
    JOIN
        Domain d ON ae.Domain_Id = d.Id
    JOIN
        AdditionalDetails ad ON ae.AdditionalDetails_Id = ad.Id';
    EXEC sp_executesql @SQL;
END
