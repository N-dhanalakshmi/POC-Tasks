using System.ComponentModel.DataAnnotations;

namespace EmployeeDetails.Models;

public partial class Templates
{
    [Key]
    public int TemplateId { get; set; }
    public required string TemplateContent { get; set; }
}
