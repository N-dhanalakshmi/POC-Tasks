using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ExcelActions.Models;

public partial class EmployeesDbContext : DbContext
{
    public EmployeesDbContext()
    {
    }

    public EmployeesDbContext(DbContextOptions<EmployeesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdditionalDetail> AdditionalDetails { get; set; }

    public virtual DbSet<AspireEmployee> AspireEmployees { get; set; }

    public virtual DbSet<Domain> Domains { get; set; }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<EmployeeDetails> EmployeeDetails { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdditionalDetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Addition__3214EC07D7309976");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.EmpId).HasColumnName("EmpID");
            entity.Property(e => e.MobileNo).HasMaxLength(20);
        });

        modelBuilder.Entity<AspireEmployee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AspireEm__3214EC076DBBB9DA");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.AdditionalDetailsId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("AdditionalDetails_Id");
            entity.Property(e => e.DomainId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("Domain_Id");
            entity.Property(e => e.EmpId).HasColumnName("EmpID");
            entity.Property(e => e.EmployeeId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("Employee_Id");
            entity.Property(e => e.RoleId)
                .HasDefaultValueSql("(newid())")
                .HasColumnName("Role_Id");

            entity.HasOne(d => d.AdditionalDetails).WithMany(p => p.AspireEmployees)
                .HasForeignKey(d => d.AdditionalDetailsId)
                .HasConstraintName("FK__AspireEmp__Addit__4BAC3F29");

            entity.HasOne(d => d.Domain).WithMany(p => p.AspireEmployees)
                .HasForeignKey(d => d.DomainId)
                .HasConstraintName("FK__AspireEmp__Domai__4D94879B");

            entity.HasOne(d => d.Employee).WithMany(p => p.AspireEmployees)
                .HasForeignKey(d => d.EmployeeId)
                .HasConstraintName("FK__AspireEmp__Emplo__05D8E0BE");

            entity.HasOne(d => d.Role).WithMany(p => p.AspireEmployees)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__AspireEmp__Role___4CA06362");
        });

        modelBuilder.Entity<Domain>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Domain__3214EC0745D3841A");

            entity.ToTable("Domain");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Employee__3214EC0731B138DA");

            entity.ToTable("Employee");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.EmpId).HasColumnName("EmpID");
            entity.Property(e => e.EmployeeNo).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC07DB0EB931");

            entity.ToTable("Role");

            entity.Property(e => e.Id).HasDefaultValueSql("(newid())");
            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
