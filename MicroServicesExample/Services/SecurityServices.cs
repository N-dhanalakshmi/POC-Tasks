using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MicroServicesExample.Models;
using Microsoft.IdentityModel.Tokens;

namespace MicroServicesExample.Services;

public class AuthenticationService{

private readonly IConfiguration _configuration;
    public AuthenticationService(IConfiguration configuration)
    {
        _configuration = configuration ;
    }

    public string CreateToken(Login login){

        List<Claim> claims = new List<Claim>{
            new Claim(ClaimTypes.Name, login.Email)
        };
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")!));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var options = new JwtSecurityToken(
            claims : claims,
            expires : DateTime.Now.AddMinutes(1),
            signingCredentials : credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(options);
    }

    
}
