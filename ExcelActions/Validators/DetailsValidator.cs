using ExcelActions.Models;
using FluentValidation;

namespace ExcelActions.Validations;

public class DetailsValidator : AbstractValidator<EmployeeDetails>
{

public DetailsValidator()
{
    RuleFor(detail => detail.MobileNo).Matches(@"^[789]\d{9}$");
    
}

}