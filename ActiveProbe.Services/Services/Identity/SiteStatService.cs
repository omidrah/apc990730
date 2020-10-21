using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Identity;

namespace ActiveProbe.Services
{
    public class SiteStatService : ISiteStatService
    {
        private readonly IUnitOfWork _uow;
        private readonly IApcUserManager _userManager;
        private readonly DbSet<User> _users;

        public SiteStatService(
            IApcUserManager userManager,
            IUnitOfWork uow)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(_userManager));
            _uow = uow ?? throw new ArgumentNullException(nameof(_uow));
            _users = uow.Set<User>();
        }

        public Task<List<User>> GetOnlineUsersListAsync(int numbersToTake, int minutesToTake)
        {
            var now = DateTime.UtcNow;
            var minutes = now.AddMinutes(-minutesToTake);
            return _users.AsNoTracking()
                         .Where(user => user.LastVisitDateTime != null && user.LastVisitDateTime.Value <= now
                                        && user.LastVisitDateTime.Value >= minutes)
                         .OrderByDescending(user => user.LastVisitDateTime)
                         .Take(numbersToTake)
                         .ToListAsync();
        }
     
        public async Task UpdateUserLastVisitDateTimeAsync(ClaimsPrincipal claimsPrincipal)
        {
            var user = await _userManager.GetUserAsync(claimsPrincipal);
            user.LastVisitDateTime = DateTime.UtcNow;
            await _userManager.UpdateAsync(user);
        }
    }
}