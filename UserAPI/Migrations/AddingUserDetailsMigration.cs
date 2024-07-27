using FluentMigrator;
namespace UserAPI.Migrations;
[Migration(20210602)]
public class AddingUserDetailsMigration : Migration
{
    public override void Up()
    {
        Execute.EmbeddedScript("InsertUser.sql");
    }

    public override void Down()
    {
        Execute.Sql("truncate table Users");
    }
}

