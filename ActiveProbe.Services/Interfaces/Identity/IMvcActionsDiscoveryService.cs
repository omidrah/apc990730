using System.Collections.Generic;

namespace ActiveProbe.Services.Interfaces
{
    public interface IMvcActionsDiscoveryService
    {
        ICollection<MvcControllerViewModel> MvcControllers { get; }
        ICollection<MvcControllerViewModel> GetAllSecuredControllerActionsWithPolicy(string policyName);

    }

}