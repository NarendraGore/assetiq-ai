using AssetIQAI.Domain.Common;
using AssetIQAI.Domain.Entities;
using AssetIQAI.Infrastructure.Security;
using Microsoft.EntityFrameworkCore;

namespace AssetIQAI.Infrastructure.Data;

public class ApplicationDbContext : DbContext
{
    private readonly ICurrentUserService? _currentUserService;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        ICurrentUserService? currentUserService = null)
        : base(options)
    {
        _currentUserService = currentUserService;
    }

    private Guid? CurrentUserId => _currentUserService?.UserId;


    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Supplier> Suppliers => Set<Supplier>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();

    public DbSet<PasswordResetToken> PasswordResetTokens => Set<PasswordResetToken>();

    public DbSet<Product> Products => Set<Product>();

    public DbSet<StockTransaction> StockTransactions => Set<StockTransaction>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        ConfigureUser(modelBuilder);
        ConfigureRole(modelBuilder);
        ConfigureRefreshToken(modelBuilder);
        ConfigurePasswordResetToken(modelBuilder);
        ConfigureCategory(modelBuilder);
        ConfigureSupplier(modelBuilder);
        ConfigureProduct(modelBuilder);
        ConfigureStockTransaction(modelBuilder);

        modelBuilder.Entity<Category>()
            .HasQueryFilter(x => x.OwnerId == CurrentUserId);

        modelBuilder.Entity<Supplier>()
            .HasQueryFilter(x => x.OwnerId == CurrentUserId);

        modelBuilder.Entity<Product>()
            .HasQueryFilter(x => x.OwnerId == CurrentUserId);

        modelBuilder.Entity<StockTransaction>()
            .HasQueryFilter(x => x.OwnerId == CurrentUserId);

        modelBuilder.ApplyConfigurationsFromAssembly(
       typeof(ApplicationDbContext).Assembly);
    }


    private static void ConfigureUser(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(x => x.FirstName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(x => x.LastName)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(x => x.Email)
                .HasMaxLength(150)
                .IsRequired();

            entity.HasIndex(x => x.Email)
                .IsUnique();

            entity.Property(x => x.PasswordHash)
                .IsRequired();

            entity.Property(x => x.PhoneNumber)
                .HasMaxLength(20);

            entity.HasOne(x => x.Role)
                .WithMany(x => x.Users)
                .HasForeignKey(x => x.RoleId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }

    private static void ConfigureRole(ModelBuilder modelBuilder)
    {


        modelBuilder.Entity<Role>(entity =>
        {
            entity.Property(x => x.Name)
                .HasMaxLength(50)
                .IsRequired();

            entity.HasIndex(x => x.Name)
                .IsUnique();

            entity.Property(x => x.Description)
                .HasMaxLength(250);
        });
    }

    private static void ConfigureRefreshToken(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.Property(x => x.Token)
                .IsRequired();

            entity.HasIndex(x => x.Token)
                .IsUnique();

            entity.HasOne(x => x.User)
                .WithMany(x => x.RefreshTokens)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private static void ConfigurePasswordResetToken(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<PasswordResetToken>(entity =>
        {
            entity.Property(x => x.TokenHash)
                .IsRequired();

            entity.HasIndex(x => x.TokenHash);

            entity.HasOne(x => x.User)
                .WithMany(x => x.PasswordResetTokens)
                .HasForeignKey(x => x.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }

    private static void ConfigureCategory(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(x => x.Name)
                .HasMaxLength(100)
                .IsRequired();

            entity.Property(x => x.Description)
                .HasMaxLength(500);

            entity.HasIndex(x => new { x.OwnerId, x.Name })
                .IsUnique();
        });
    }

    private static void ConfigureSupplier(ModelBuilder modelBuilder)
    {

        modelBuilder.Entity<Supplier>(entity =>
        {
            entity.Property(x => x.CompanyName)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(x => x.ContactPerson)
                .HasMaxLength(100);

            entity.Property(x => x.Email)
                .HasMaxLength(150);

            entity.Property(x => x.Phone)
                .HasMaxLength(20);

            entity.HasIndex(x => x.OwnerId);
        });
    }

    private static void ConfigureProduct(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>(entity =>
        {
            entity.Property(x => x.Name)
                .HasMaxLength(150)
                .IsRequired();

            entity.Property(x => x.SKU)
                .HasMaxLength(50)
                .IsRequired();

            entity.HasIndex(x => new { x.OwnerId, x.SKU })
                .IsUnique();

            entity.Property(x => x.Description)
                .HasMaxLength(500);

            entity.Property(x => x.UnitPrice)
                .HasColumnType("decimal(18,2)");

            entity.Property(x => x.StockQuantity)
                .IsRequired();

            entity.Property(x => x.MinimumStock)
                .IsRequired();

            entity.Property(x => x.ImageUrl)
                .HasMaxLength(500);

            entity.Property(x => x.IsActive)
                .HasDefaultValue(true);

            entity.HasOne(x => x.Category)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            entity.HasOne(x => x.Supplier)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.SupplierId)
                .OnDelete(DeleteBehavior.Restrict);
        });
    }

    private static void ConfigureStockTransaction(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<StockTransaction>(entity =>
        {
            entity.HasIndex(x => x.OwnerId);
        });
    }

    public override Task<int> SaveChangesAsync(
        CancellationToken cancellationToken = default)
    {
        ApplyOwnership();
        return base.SaveChangesAsync(cancellationToken);
    }

    public override int SaveChanges()
    {
        ApplyOwnership();
        return base.SaveChanges();
    }

    private void ApplyOwnership()
    {
        var userId = CurrentUserId;
        if (!userId.HasValue)
        {
            return;
        }

        foreach (var entry in ChangeTracker.Entries<IOwnedEntity>())
        {
            if (entry.State == EntityState.Added &&
                entry.Entity.OwnerId == Guid.Empty)
            {
                entry.Entity.OwnerId = userId.Value;
            }
        }
    }
}
