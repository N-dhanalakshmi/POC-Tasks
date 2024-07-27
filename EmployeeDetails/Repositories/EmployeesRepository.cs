using EmployeeDetails.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeDetails.Repositories;

public class EmployeesRepository : IEmployeesRepository
{
    private readonly EmployeeDetailsContext _context;

    public EmployeesRepository(EmployeeDetailsContext context)
    {
        _context = context;
    }

    public void AddEmployee(Employee employee)
    {
        _context.Employees.Add(employee);
        _context.SaveChanges();
    }

    public void DeleteEmployee(string Email)
    {
        _context.Database.ExecuteSqlRaw(@"EXEC Delete_Employee @Email={0}", Email);

    }

    public IEnumerable<Employee> GetEmployees()
    {
        return _context.Employees.FromSqlRaw("EXEC Get_Employees").ToList();
    }

    public IEnumerable<Employee> GetEmployeesBySearch(string SearchKey)
    {
        return _context.Employees.Where(employee => employee.Name.Contains(SearchKey)).ToList();
    }

    public void SaveTemplate(Templates template)
    {
        _context.Templates.Add(template);
        _context.SaveChanges();
    }

    public IEnumerable<Templates> GetTemplates()
    {
        return _context.Templates.ToList();
    }

    public void UpdateEmployee(Employee employeeChosen)
    {
        Employee employee = _context.Employees.FirstOrDefault(data => data.Email == employeeChosen.Email)!;

        if (employee != null)
        {
            employee.Name = employeeChosen.Name ?? employee.Name;
            employee.Designation = employeeChosen.Designation ?? employee.Designation;
            employee.Department = employeeChosen.Department ?? employee.Department;
            employee.PhoneNumber = employeeChosen.PhoneNumber ?? employee.PhoneNumber;
            _context.Database.ExecuteSqlRaw("EXEC Update_Employee @Email={0},@Name={1},@Designation={2},@Department={3},@PhoneNumber={4}", [employee.Email, employee.Name, employee.Designation, employee.Department, employee.PhoneNumber]);
        }
    }
}