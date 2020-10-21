using System.Collections.Generic;
using System.Threading.Tasks;
using ActiveProbe.Domain.Identity;
using System.Security.Claims;

namespace ActiveProbe.Services.Interfaces
{
    public interface ISiteStatService
    {
        Task<List<User>> GetOnlineUsersListAsync(int numbersToTake, int minutesToTake);
      
        Task UpdateUserLastVisitDateTimeAsync(ClaimsPrincipal claimsPrincipal);
       
    }
}