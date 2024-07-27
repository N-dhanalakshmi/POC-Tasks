using System.Text;
using System.Text.Json;
using AutoMapper;
using MicroServicesExample.Models;

namespace MicroServicesExample.Proxies;
public class EmployerProxy
{
    private readonly HttpClient _AdminrClient;
    private readonly IMapper _mapper;
    public EmployerProxy(HttpClient AdminrClient, IConfiguration configuration, IMapper mapper)
    {
        _AdminrClient = AdminrClient;
        _AdminrClient.BaseAddress = new Uri(configuration.GetValue<string>("Urls:EmployerAPI")!);
        _mapper = mapper;
    }

    public async Task<IEnumerable<Employee>> GetAllUser()
    {
        var result = _AdminrClient.GetAsync("EmployeesList").Result;
        var jsonString = await result.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<IEnumerable<Employee>>(jsonString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })!;
    }

    public async Task AddUser(AddUserDTO user)
    {
        Employee newUser = _mapper.Map<Employee>(user);
        var jsonPayload = JsonSerializer.Serialize(newUser);
        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        await _AdminrClient.PostAsync("AddEmployee", content);
    }

    public async Task DeleteEmployee(string Email)
    {
        await _AdminrClient.DeleteAsync($"DeleteEmployee?Email={Email}");
    }

    public async Task<IEnumerable<Employee>> GetUserBySearch(string SearchKey){
        var result = _AdminrClient.GetAsync($"EmployeesBySearch?SearchKey={SearchKey}").Result;
        var jsonString = await result.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<IEnumerable<Employee>>(jsonString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })!;
    }
    public async Task SaveTemplate(Templates template)
    {
        var jsonPayload = JsonSerializer.Serialize(template);
        var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");
        await _AdminrClient.PostAsync("SaveTemplate", content);
    }
    public async Task<IEnumerable<Templates>> GetTemplate()
    {
        var result = _AdminrClient.GetAsync($"Templates").Result;
        var jsonString = await result.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<IEnumerable<Templates>>(jsonString, new JsonSerializerOptions { PropertyNameCaseInsensitive = true })!;
    }

}