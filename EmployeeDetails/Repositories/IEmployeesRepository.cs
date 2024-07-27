using EmployeeDetails.Models;

namespace EmployeeDetails.Repositories;

public interface IEmployeesRepository{
    IEnumerable<Employee>  GetEmployees();
    IEnumerable<Employee> GetEmployeesBySearch(string SearchKey);
    void AddEmployee(Employee employee);
    void DeleteEmployee(string Email);
    void UpdateEmployee(Employee employee);
    void SaveTemplate(Templates template);
    IEnumerable<Templates> GetTemplates();

}