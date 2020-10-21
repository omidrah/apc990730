using System;
using System.Threading.Tasks;
using ActiveProbe.Domain.Identity;

namespace ActiveProbe.Services.Interfaces
{
    public interface IUsedPasswordsService
    {
        Task<bool> IsPreviouslyUsedPasswordAsync(User user, string newPassword);
        Task AddToUsedPasswordsListAsync(User user);
        Task<bool> IsLastUserPasswordTooOldAsync(int userId);
        Task<DateTime?> GetLastUserPasswordChangeDateAsync(int userId);
    }
}