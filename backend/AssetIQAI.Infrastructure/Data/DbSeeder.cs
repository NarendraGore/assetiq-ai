using AssetIQAI.Domain.Entities;
using AssetIQAI.Domain.Enums;
using AssetIQAI.Infrastructure.Security;
using Microsoft.EntityFrameworkCore;

namespace AssetIQAI.Infrastructure.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.MigrateAsync();

        var roles = await SeedRolesAsync(context);
        var demoUser = await SeedDemoUserAsync(context, roles);

        if (demoUser is not null)
        {
            var categories = await SeedCategoriesAsync(context, demoUser.Id);
            var suppliers = await SeedSuppliersAsync(context, demoUser.Id);
            var products = await SeedProductsAsync(context, demoUser.Id, categories, suppliers);

            await SeedStockTransactionsAsync(context, demoUser.Id, products);
        }
    }

    private static async Task<Dictionary<string, Role>> SeedRolesAsync(
        ApplicationDbContext context)
    {
        var seedRoles = new[]
        {
            new Role { Name = "Admin", Description = "System Administrator" },
            new Role { Name = "Manager", Description = "Department Manager" },
            new Role { Name = "Employee", Description = "Regular Employee" },
        };

        var roles = new Dictionary<string, Role>();
        var anyAdded = false;

        foreach (var role in seedRoles)
        {
            var existing = await context.Roles.FirstOrDefaultAsync(r => r.Name == role.Name);

            if (existing is null)
            {
                role.Id = Guid.NewGuid();
                context.Roles.Add(role);
                existing = role;
                anyAdded = true;
            }

            roles[role.Name] = existing;
        }

        if (anyAdded)
        {
            await context.SaveChangesAsync();
        }

        return roles;
    }

    private static async Task<User?> SeedDemoUserAsync(
        ApplicationDbContext context,
        Dictionary<string, Role> roles)
    {
        const string email = "admin@assetiq.ai";

        var existing = await context.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (existing is not null)
        {
            return null;
        }

        var user = new User
        {
            Id = Guid.NewGuid(),
            FirstName = "AssetIQ",
            LastName = "Admin",
            Email = email,
            PasswordHash = new PasswordHasher().HashPassword("Demo@12345"),
            PhoneNumber = "+1 555 010 0000",
            IsActive = true,
            EmailVerified = true,
            RoleId = roles["Admin"].Id,
            CreatedBy = "system",
            UpdatedBy = "system",
        };

        context.Users.Add(user);
        await context.SaveChangesAsync();

        return user;
    }

    private static async Task<Dictionary<string, Category>> SeedCategoriesAsync(
        ApplicationDbContext context,
        Guid ownerId)
    {
        var seedCategories = new[]
        {
            ("Electronics", "Computers, peripherals and electronic devices"),
            ("Office Supplies", "Stationery and office consumables"),
            ("Furniture", "Workstations, chairs and desks"),
            ("Networking", "Routers, switches and network infrastructure"),
            ("Accessories", "Cables, stands and add-on accessories"),
        };

        var categories = new Dictionary<string, Category>();
        var anyAdded = false;

        foreach (var (name, description) in seedCategories)
        {
            var existing = await context.Categories
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(c => c.OwnerId == ownerId && c.Name == name);

            if (existing is null)
            {
                existing = new Category
                {
                    Id = Guid.NewGuid(),
                    Name = name,
                    Description = description,
                    OwnerId = ownerId,
                    CreatedBy = "system",
                    UpdatedBy = "system",
                };

                context.Categories.Add(existing);
                anyAdded = true;
            }

            categories[name] = existing;
        }

        if (anyAdded)
        {
            await context.SaveChangesAsync();
        }

        return categories;
    }

    private static async Task<Dictionary<string, Supplier>> SeedSuppliersAsync(
        ApplicationDbContext context,
        Guid ownerId)
    {
        var seedSuppliers = new[]
        {
            ("TechNova Distributors", "Rajesh Kumar", "sales@technova.com", "+1 555 011 2200", "12 Innovation Drive, Austin, TX"),
            ("OfficeMax Supplies", "Sarah Mitchell", "orders@officemax.com", "+1 555 011 3300", "88 Commerce Blvd, Denver, CO"),
            ("Furniture World", "Daniel Ross", "contact@furnitureworld.com", "+1 555 011 4400", "5 Lakeside Ave, Chicago, IL"),
            ("Global Parts Co.", "Maya Patel", "support@globalparts.com", "+1 555 011 5500", "310 Harbor Road, Seattle, WA"),
            ("Pacific Imports", "James Wong", "hello@pacificimports.com", "+1 555 011 6600", "77 Bayfront St, San Francisco, CA"),
        };

        var suppliers = new Dictionary<string, Supplier>();
        var anyAdded = false;

        foreach (var (companyName, contactPerson, email, phone, address) in seedSuppliers)
        {
            var existing = await context.Suppliers
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(s => s.OwnerId == ownerId && s.CompanyName == companyName);

            if (existing is null)
            {
                existing = new Supplier
                {
                    Id = Guid.NewGuid(),
                    CompanyName = companyName,
                    ContactPerson = contactPerson,
                    Email = email,
                    Phone = phone,
                    Address = address,
                    OwnerId = ownerId,
                    CreatedBy = "system",
                    UpdatedBy = "system",
                };

                context.Suppliers.Add(existing);
                anyAdded = true;
            }

            suppliers[companyName] = existing;
        }

        if (anyAdded)
        {
            await context.SaveChangesAsync();
        }

        return suppliers;
    }

    private static async Task<Dictionary<string, Product>> SeedProductsAsync(
        ApplicationDbContext context,
        Guid ownerId,
        Dictionary<string, Category> categories,
        Dictionary<string, Supplier> suppliers)
    {
        var seedProducts = new[]
        {
            ("Laptop Pro 15", "ELEC-001", "Electronics", "TechNova Distributors", 1199.99m, 25, 10),
            ("Wireless Mouse", "ELEC-002", "Electronics", "TechNova Distributors", 29.99m, 120, 30),
            ("Mechanical Keyboard", "ELEC-003", "Electronics", "Pacific Imports", 89.99m, 8, 15),
            ("27-Inch 4K Monitor", "ELEC-004", "Electronics", "TechNova Distributors", 299.99m, 40, 10),
            ("A4 Printer Paper (10 Reams)", "OFFC-001", "Office Supplies", "OfficeMax Supplies", 12.49m, 195, 50),
            ("Ballpoint Pens (Box of 50)", "OFFC-002", "Office Supplies", "OfficeMax Supplies", 9.99m, 150, 40),
            ("Ergonomic Desk Chair", "FRNT-001", "Furniture", "Furniture World", 189.99m, 15, 8),
            ("Standing Desk", "FRNT-002", "Furniture", "Furniture World", 449.99m, 5, 6),
            ("Wi-Fi 6 Router", "NETW-001", "Networking", "Global Parts Co.", 79.99m, 0, 10),
            ("8-Port Network Switch", "NETW-002", "Networking", "Global Parts Co.", 129.99m, 22, 8),
            ("USB-C Cable (2m)", "ACCE-001", "Accessories", "Pacific Imports", 7.99m, 300, 60),
            ("Aluminium Laptop Stand", "ACCE-002", "Accessories", "Pacific Imports", 34.99m, 60, 15),
        };

        var products = new Dictionary<string, Product>();
        var anyAdded = false;

        foreach (var (name, sku, categoryName, supplierName, unitPrice, stock, minStock) in seedProducts)
        {
            var existing = await context.Products
                .IgnoreQueryFilters()
                .FirstOrDefaultAsync(p => p.OwnerId == ownerId && p.SKU == sku);

            if (existing is null)
            {
                existing = new Product
                {
                    Id = Guid.NewGuid(),
                    Name = name,
                    SKU = sku,
                    Description = $"{name} managed by ASSETIQ AI.",
                    CategoryId = categories[categoryName].Id,
                    SupplierId = suppliers[supplierName].Id,
                    UnitPrice = unitPrice,
                    StockQuantity = stock,
                    MinimumStock = minStock,
                    IsActive = true,
                    OwnerId = ownerId,
                    CreatedBy = "system",
                    UpdatedBy = "system",
                };

                context.Products.Add(existing);
                anyAdded = true;
            }

            products[sku] = existing;
        }

        if (anyAdded)
        {
            await context.SaveChangesAsync();
        }

        return products;
    }

    private static async Task SeedStockTransactionsAsync(
        ApplicationDbContext context,
        Guid ownerId,
        Dictionary<string, Product> products)
    {
        var now = DateTime.UtcNow;

        var anyStockTransaction = await context.StockTransactions
            .IgnoreQueryFilters()
            .AnyAsync(t => t.OwnerId == ownerId);

        if (anyStockTransaction)
        {
            return;
        }

        var transactions = new List<StockTransaction>
        {
            Transaction(products["ELEC-001"], StockTransactionType.StockIn, 25, 0, 25, "Initial stock", now.AddDays(-30)),
            Transaction(products["ELEC-002"], StockTransactionType.StockIn, 120, 0, 120, "Bulk restock", now.AddDays(-20)),
            Transaction(products["ELEC-003"], StockTransactionType.StockIn, 20, 0, 20, "Initial stock", now.AddDays(-14)),
            Transaction(products["ELEC-003"], StockTransactionType.StockOut, 12, 20, 8, "Project order", now.AddDays(-3)),
            Transaction(products["ELEC-004"], StockTransactionType.StockIn, 40, 0, 40, "Initial stock", now.AddDays(-18)),
            Transaction(products["OFFC-001"], StockTransactionType.StockIn, 200, 0, 200, "Initial stock", now.AddDays(-28)),
            Transaction(products["OFFC-001"], StockTransactionType.Adjustment, -5, 200, 195, "Damaged stock write-off", now.AddDays(-8)),
            Transaction(products["OFFC-002"], StockTransactionType.StockIn, 150, 0, 150, "Initial stock", now.AddDays(-22)),
            Transaction(products["FRNT-001"], StockTransactionType.StockIn, 15, 0, 15, "Initial stock", now.AddDays(-16)),
            Transaction(products["FRNT-002"], StockTransactionType.StockIn, 12, 0, 12, "Initial stock", now.AddDays(-10)),
            Transaction(products["FRNT-002"], StockTransactionType.StockOut, 7, 12, 5, "Office refurbishment", now.AddDays(-2)),
            Transaction(products["NETW-001"], StockTransactionType.StockIn, 25, 0, 25, "Initial stock", now.AddDays(-25)),
            Transaction(products["NETW-001"], StockTransactionType.StockOut, 25, 25, 0, "Sold out to field office", now.AddDays(-5)),
            Transaction(products["NETW-002"], StockTransactionType.StockIn, 22, 0, 22, "Initial stock", now.AddDays(-9)),
            Transaction(products["ACCE-001"], StockTransactionType.StockIn, 300, 0, 300, "Initial stock", now.AddDays(-26)),
            Transaction(products["ACCE-002"], StockTransactionType.StockIn, 60, 0, 60, "Initial stock", now.AddDays(-12)),
        };

        context.StockTransactions.AddRange(transactions);
        await context.SaveChangesAsync();
    }

    private static StockTransaction Transaction(
        Product product,
        StockTransactionType type,
        int quantity,
        int previousQuantity,
        int newQuantity,
        string remarks,
        DateTime occurredAt)
    {
        return new StockTransaction
        {
            Id = Guid.NewGuid(),
            ProductId = product.Id,
            TransactionType = type,
            Quantity = quantity,
            PreviousQuantity = previousQuantity,
            NewQuantity = newQuantity,
            Remarks = remarks,
            OwnerId = product.OwnerId,
            CreatedBy = "system",
            UpdatedBy = "system",
            CreatedAt = occurredAt,
            UpdatedAt = occurredAt,
        };
    }
}
