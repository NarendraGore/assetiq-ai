using AssetIQAI.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AssetIQAI.Infrastructure.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.MigrateAsync();
        if (!await context.Roles.AnyAsync())
        {
            var roles = new List<Role>
            {
                new Role
                {
                    Id = Guid.NewGuid(),
                    Name = "Admin",
                    Description = "System Administrator"
                },
                new Role
                {
                    Id = Guid.NewGuid(),
                    Name = "Manager",
                    Description = "Department Manager"
                },
                new Role
                {
                    Id = Guid.NewGuid(),
                    Name = "Employee",
                    Description = "Regular Employee"
                }
            };

            await context.Roles.AddRangeAsync(roles);
            await context.SaveChangesAsync();
        }
    }
}