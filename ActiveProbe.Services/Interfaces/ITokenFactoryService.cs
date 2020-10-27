using ActiveProbe.Domain.Identity;
using ActiveProbe.Utils.ViewModel;

using System.Threading.Tasks;

namespace ActiveProbe.Services.Interfaces
{
    public interface ITokenFactoryService
    {
        Task<JwtTokensData> CreateJwtTokensAsync(User user,string roleClaimType);
        string GetRefreshTokenSerial(string refreshTokenValue);
    }
}
