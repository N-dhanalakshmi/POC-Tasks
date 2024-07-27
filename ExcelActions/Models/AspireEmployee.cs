using System;
using System.Collections.Generic;

namespace ExcelActions.Models;

public partial class AspireEmployee
{
    public Guid Id { get; set; }

    public long? EmpId { get; set; }

    public Guid? AdditionalDetailsId { get; set; }

    public Guid? RoleId { get; set; }

    public Guid? DomainId { get; set; }

    public Guid? EmployeeId { get; set; }

    public virtual AdditionalDetail? AdditionalDetails { get; set; }

    public virtual Domain? Domain { get; set; }

    public virtual Employee? Employee { get; set; }

    public virtual Role? Role { get; set; }
}
