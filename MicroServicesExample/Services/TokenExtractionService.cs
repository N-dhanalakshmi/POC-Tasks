using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Json;

namespace MicroServicesExample.Services;
public class TokenExtractionService
{
    private readonly RequestDelegate _next;

    public TokenExtractionService(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        if (context.Request.Method == HttpMethods.Post && ShouldAuthorizeEndpoint(context.Request.Path))
        {
            context.Request.EnableBuffering();

            var bodyStr = await new StreamReader(context.Request.Body).ReadToEndAsync();
            var requestBody = JsonSerializer.Deserialize<Dictionary<string, object>>(bodyStr);
            context.Request.Body.Position = 0;

            if (requestBody != null && requestBody.ContainsKey("token"))
            {
                var token = requestBody["token"].ToString();
                var key = Encoding.UTF8.GetBytes("yourSecretKey");

                var tokenHandler = new JwtSecurityTokenHandler();
                try
                {
                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = true,
                        ValidIssuer = "yourIssuer",
                        ValidateAudience = true,
                        ValidAudience = "yourAudience",
                        ValidateLifetime = true
                    }, out SecurityToken validatedToken);

                    // Add the token to the Authorization header for further processing
                    context.Request.Headers.Append("Authorization", "Bearer " + token);
                }
                catch
                {
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Unauthorized");
                    return;
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                await context.Response.WriteAsync("Token is missing in the request body");
                return;
            }
        }

        await _next(context);
    }

    private bool ShouldAuthorizeEndpoint(string path)
    {
        // Define the endpoints that should be authorized
        var protectedEndpoints = new[]
        {
            "/Master/EventResponse"
        };

        foreach (var endpoint in protectedEndpoints)
        {
            if (path.StartsWith(endpoint, StringComparison.OrdinalIgnoreCase))
            {
                return true;
            }
        }

        return false;
    }
}
