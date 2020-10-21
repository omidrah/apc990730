using ActiveProbe.Utils.ViewModel.Identity.Settings;
using Microsoft.EntityFrameworkCore;

namespace ASPNETCoreIdentitySample.DataLayer.Config
{
    public static class IdentityMappings
    {        
        public static void AddCustomIdentityMappings(this ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(IdentityMappings).Assembly);            
        }
    }
}