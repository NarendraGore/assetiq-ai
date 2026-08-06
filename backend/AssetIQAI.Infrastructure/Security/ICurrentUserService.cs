namespace AssetIQAI.Infrastructure.Security;

/// <summary>
/// Provides the identity of the user making the current request. Backed by the
/// JWT claims on the active HttpContext, so services and the DbContext can scope
/// data to whoever is logged in without threading the user id through every call.
/// </summary>
public interface ICurrentUserService
{
    /// <summary>The logged-in user's id, or null when unauthenticated.</summary>
    Guid? UserId { get; }

    /// <summary>True when a valid user id is present on the request.</summary>
    bool IsAuthenticated { get; }
}
