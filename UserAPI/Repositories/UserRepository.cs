using UserAPI.Models;
using Microsoft.EntityFrameworkCore;
using UserAPI.DbContexts;

namespace EmployeeDetails.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UserDbContext _context;

    public UserRepository(UserDbContext context)
    {
        _context = context;
    }

    public void AddUser(Users user)
    {
        _context.Users.Add(user);
        _context.SaveChanges();
    }

    public void DeleteUser(string Email)
    {
        _context.Database.ExecuteSqlRaw(@"EXEC Delete_User @Email={0}", Email);
    }

    public Users GetUser(string Email)
    {
        return _context.Users.FromSqlRaw("EXEC Get_User @Email={0}", Email).AsEnumerable().FirstOrDefault()!;
    }

    public void UpdatePassword(string Email, string Password)
    {
        _context.Database.ExecuteSqlRaw("EXEC Update_User_Password @Password={0}, @Email={1}", [Password, Email]);
    }

    public Users UpdateUser(Users users)
    {
        Users user = _context.Users.FirstOrDefault(data => data.Email == users.Email)!;

        if (user != null)
        {
            user.Designation = users.Designation ?? user.Designation;
            user.Department = users.Department ?? user.Department;
            user.PhoneNumber = users.PhoneNumber ?? user.PhoneNumber;
            user.Address = users.Address ?? user.Address;
            if (users.Salary != null)
            { user.Salary = users.Salary; }
            _context.Database.ExecuteSqlRaw("EXEC Update_User_Details @Email={0},@Designation={1},@Department={2},@PhoneNumber={3},@Address={4},@Salary={5}", [users.Email, user.Designation, user.Department, user.PhoneNumber, user.Address, user.Salary]);
            return _context.Users.FromSqlRaw("EXEC Get_User @Email={0}", users.Email).AsEnumerable().FirstOrDefault();
        }
        return null;
    }
}