using System;
using System.Collections.Generic;

namespace ExcelActions.Models;

public partial class Employee
{
    public Guid Id { get; set; }

    public long? EmpId { get; set; }

    public string? EmployeeNo { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<AspireEmployee> AspireEmployees { get; set; } = new List<AspireEmployee>();
}
