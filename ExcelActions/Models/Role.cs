using System;
using System.Collections.Generic;

namespace ExcelActions.Models;

public partial class Role
{
    public Guid Id { get; set; }

    public string? RoleName { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<AspireEmployee> AspireEmployees { get; set; } = new List<AspireEmployee>();
}
