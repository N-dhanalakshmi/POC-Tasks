using AutoMapper;
using MicroServicesExample.Models;

namespace MicroServicesExample.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AddUserDTO, Users>()
            .ForMember(property => property.EmployeeId, option => option.Ignore());

            CreateMap<AddUserDTO, Employee>();
        }
    }
}
