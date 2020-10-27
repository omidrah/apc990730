using ActiveProbe.Domain.Identity;
using ActiveProbe.Domain.Models;
using System;

using System.Threading.Tasks;

namespace ActiveProbe.Services.Interfaces
{
    public interface ITokenStoreService
    {
        Task AddUserTokenAsync(Token userToken);
        Task AddUserTokenAsync(User user, string refreshTokenSerial, string accessToken, string refreshTokenSourceSerial);
        Task<bool> IsValidTokenAsync(string accessToken, int userId);
        Task DeleteExpiredTokensAsync();
        Task<Token> FindTokenAsync(string refreshTokenValue);
        Task DeleteTokenAsync(string refreshTokenValue);
        Task DeleteTokensWithSameRefreshTokenSourceAsync(string refreshTokenIdHashSource);
        Task InvalidateUserTokensAsync(int userId);
        Task RevokeUserBearerTokensAsync(string userIdValue, string refreshTokenValue);
    }
}
