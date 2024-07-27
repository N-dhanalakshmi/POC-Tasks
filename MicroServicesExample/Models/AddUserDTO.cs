namespace MicroServicesExample.Models;
public partial class AddUserDTO
{
    public int EmployeeId { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Designation { get; set; } = null!;
    public string Department { get; set; } = null!;
    public string? PhoneNumber { get; set; }
    public string? Password { get; set; }
    public string? DOB { get; set; }
    public decimal Salary { get; set; }
    public string? DOJ { get; set; }
    public string? Address { get; set; }
}
