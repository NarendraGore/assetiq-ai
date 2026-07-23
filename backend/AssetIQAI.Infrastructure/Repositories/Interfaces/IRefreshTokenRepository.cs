using System;
using System.Collections.Generic;
using System.Text;
using AssetIQAI.Domain.Entities;

namespace AssetIQAI.Infrastructure.Repositories.Interfaces
{
    public interface IRefreshTokenRepository : IGenericRepository<RefreshToken>
    {
     
        Task<RefreshToken?> GetByTokenAsync(string token);
      
    }
}
