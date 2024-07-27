using FluentMigrator;
namespace UserAPI.Migrations;
[Migration(20210601)]
public class CreateUsersTable : Migration
{
    public override void Up()
    {
        // Execute.Sql("CREATE DATABASE UserDetails"); 
        Create.Table("Users")
            .WithColumn("EmployeeId").AsInt32().PrimaryKey().Identity().NotNullable()
            .WithColumn("Name").AsString().NotNullable()
            .WithColumn("Email").AsString().NotNullable()
            .WithColumn("Password").AsString().NotNullable()
            .WithColumn("DOB").AsString().NotNullable()
            .WithColumn("Designation").AsString().NotNullable()
            .WithColumn("Department").AsString().NotNullable()
            .WithColumn("Address").AsString().NotNullable()
            .WithColumn("PhoneNumber").AsString().NotNullable()
            .WithColumn("Salary").AsDecimal().NotNullable()
            .WithColumn("DOJ").AsString().NotNullable();
    }

    public override void Down()
    {
        // Execute.Sql("DROP DATABASE UserDetails");
        Delete.Table("Users");
    }
}

