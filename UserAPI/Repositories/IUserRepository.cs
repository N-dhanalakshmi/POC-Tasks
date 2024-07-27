using UserAPI.Models;

namespace EmployeeDetails.Repositories;

public interface IUserRepository{
    Users GetUser(string Email);
    void DeleteUser(string Email);
    void UpdatePassword(string Email,string Password);
    void AddUser(Users user);    
    Users UpdateUser(Users user);

}