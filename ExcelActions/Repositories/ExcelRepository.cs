
using System.Data;
using Microsoft.Data.SqlClient;
using ExcelActions.Models;
using GemBox.Spreadsheet;
using Microsoft.EntityFrameworkCore;

namespace ExcelActions.Repositories;
public class ExcelRepository
{

    private readonly EmployeesDbContext context;
    public ExcelRepository(EmployeesDbContext context)
    {
        this.context = context;
    }

    public async Task<MemoryStream?> ExportEmployees()
    {

        SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

        var data = await context.EmployeeDetails.FromSqlRaw($"EXEC usp_GetEmployeeDetails").ToListAsync();

        if (data.Count > 0)
        {
            // Creating Workbook and Sheet
            var workbook = new ExcelFile();
            var worksheet = workbook.Worksheets.Add("Sheet1");

            var properties = typeof(EmployeeDetails).GetProperties();

            // Adding headers
            for (int i = 0; i < properties.Length; i++)
            {
                worksheet.Cells[0, i].Value = properties[i].Name;
            }

            // Adding Data
            for (int i = 0; i < data.Count; i++)
            {
                var item = data[i];
                for (int j = 0; j < properties.Length; j++)
                {
                    worksheet.Cells[i + 1, j].Value = properties[j].GetValue(item);
                }
            }

            worksheet.DataValidations.Add(new DataValidation(worksheet.Cells.GetSubrange("C2", "G1048576"))
            {
                Type = DataValidationType.Custom,
                Formula1 = "=AND(ISTEXT(C2),LEN(C2)>2)",
                ErrorTitle = "Invalid input",
                ErrorMessage = "Provide valid Names."
            });
            worksheet.DataValidations.Add(new DataValidation(worksheet.Cells.GetSubrange("H2", "H1048576"))
            {
                Type = DataValidationType.Custom,
                Formula1 = "=AND(ISNUMBER(H2),LEN(H2)=10)",
                ErrorTitle = "Invalid input",
                ErrorMessage = "Provide valid Phone Number of length 10."
            });

            // Save to a stream
            var stream = new MemoryStream();
            workbook.Save(stream, SaveOptions.XlsxDefault);
            stream.Position = 0;

            return stream;
        }
        return null;
    }

    public async Task ImportEmployees(IFormFile file)
    {
        SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

        using (var stream = new MemoryStream())
        {
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var workbook = ExcelFile.Load(stream, new XlsxLoadOptions { PreserveUnsupportedFeatures = true });
            var worksheet = workbook.Worksheets[0];

            var properties = typeof(EmployeeDetails).GetProperties();
            var employees = worksheet.Rows
            .Skip(1) // Skip header row
            .Select(row =>
            {
                var employee = new EmployeeDetails();
                for (int i = 0; i < properties.Length; i++)
                {
                    var property = properties[i];
                    var value = row.Cells[i].Value?.ToString();
                    if (value != null)
                    {
                        var targetType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                        var convertedValue = targetType == typeof(string) ? value : Convert.ChangeType(value, targetType);
                        property.SetValue(employee, convertedValue);
                    }
                }
                return employee;
            })
            .ToList();

            var dataTable = new DataTable();
            foreach (var property in properties)
            {
                dataTable.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
            }


            foreach (var employee in employees)
            {
                dataTable.Rows.Add(employee.EmpId, employee.EmployeeNo, employee.FirstName, employee.LastName, employee.Designation, employee.Domain, employee.Address, employee.MobileNo);
            }

            var parameter = new SqlParameter("@Data", SqlDbType.Structured)
            {
                TypeName = "udt_EmployeeDetails",
                Value = dataTable
            };

            await context.Database.ExecuteSqlRawAsync("EXEC usp_InsertEmployeeDetails @Data", parameter);
        }
    }

    public async Task<MemoryStream?> ExportSelectedFields(List<string> fields)
    {
        SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

        // Joining fields into a comma-separated string
        string columns = string.Join(",", fields);

        var dataTable = new DataTable();

        using (var command = context.Database.GetDbConnection().CreateCommand())
        {
            command.CommandText = "EXEC usp_GetSelectedDetails @columns";
            command.Parameters.Add(new SqlParameter("@columns", columns));

            await context.Database.OpenConnectionAsync();

            using (var reader = await command.ExecuteReaderAsync())
            {
                dataTable.Load(reader);
            }
        }

        if (dataTable.Rows.Count > 0)
        {
            // Creating Workbook and Sheet
            var workbook = new ExcelFile();
            var worksheet = workbook.Worksheets.Add("Sheet1");

            // Adding headers
            worksheet.Cells[0, 0].Value = "S.No";
            for (int i = 0; i < fields.Count; i++)
            {
                worksheet.Cells[0, i + 1].Value = fields[i];
            }

            // Adding Data
            for (int i = 0; i < dataTable.Rows.Count; i++)
            {
                worksheet.Cells[i + 1, 0].Value = i + 1;
                for (int j = 0; j < fields.Count; j++)
                {
                    worksheet.Cells[i + 1, j + 1].Value = dataTable.Rows[i][fields[j]]?.ToString();
                }
            }

            // Save to a stream
            var stream = new MemoryStream();
            workbook.Save(stream, SaveOptions.XlsxDefault);
            stream.Position = 0;

            return stream;
        }

        return null;
    }

    public async Task ImportEmployeesForUpdate(IFormFile file)
    {
        SpreadsheetInfo.SetLicense("FREE-LIMITED-KEY");

        using (var stream = new MemoryStream())
        {
            await file.CopyToAsync(stream);
            stream.Position = 0;

            var workbook = ExcelFile.Load(stream, new XlsxLoadOptions { PreserveUnsupportedFeatures = true });
            var worksheet = workbook.Worksheets[0];

            var properties = typeof(EmployeeDetails).GetProperties();
            var employees = worksheet.Rows
            .Skip(1) // Skip header row
            .Select(row =>
            {
                var employee = new EmployeeDetails();
                for (int i = 0; i < properties.Length; i++)
                {
                    var property = properties[i];
                    var value = row.Cells[i].Value?.ToString();
                    if (value != null)
                    {
                        var targetType = Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType;
                        var convertedValue = targetType == typeof(string) ? value : Convert.ChangeType(value, targetType);
                        property.SetValue(employee, convertedValue);
                    }
                }
                return employee;
            })
            .ToList();

            var dataTable = new DataTable();
            foreach (var property in properties)
            {
                dataTable.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
            }

            foreach (var employee in employees)
            {
                dataTable.Rows.Add(employee.EmpId, employee.EmployeeNo, employee.FirstName, employee.LastName, employee.Designation, employee.Domain, employee.Address, employee.MobileNo);
            }

            var parameter = new SqlParameter("@Data", SqlDbType.Structured)
            {
                TypeName = "udt_EmployeeDetails",
                Value = dataTable
            };

            await context.Database.ExecuteSqlRawAsync("EXEC usp_UpdateEmployeeDetails @Data", parameter);
        }
    }


}