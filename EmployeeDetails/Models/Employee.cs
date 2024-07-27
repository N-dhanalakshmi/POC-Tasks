namespace EmployeeDetails.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Designation { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string? PhoneNumber { get; set; }
}
