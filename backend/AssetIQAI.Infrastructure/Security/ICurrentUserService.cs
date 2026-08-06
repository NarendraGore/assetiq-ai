namespace AssetIQAI.Infrastructure.Security;

public interface ICurrentUserService
{

    Guid? UserId { get; }


    bool IsAuthenticated { get; }
}
