using System;
using System.Collections.Generic;

namespace ExcelActions.Models;

public partial class AdditionalDetail
{
    public Guid Id { get; set; }

    public long? EmpId { get; set; }

    public string? MobileNo { get; set; }

    public string? Address { get; set; }

    public bool? Status { get; set; }

    public virtual ICollection<AspireEmployee> AspireEmployees { get; set; } = new List<AspireEmployee>();
}
