using System.Collections.Generic;
using ActiveProbe.Domain.Identity;

namespace ActiveProbe.Utils.ViewModel.Identity
{
    public class RoleManagerViewModel
    {
        public string[] ActionIds { set; get; }

        public int RoleId { set; get; }

        public Role RoleIncludeRoleClaims { set; get; }

        public ICollection<MvcControllerViewModel> SecuredControllerActions { set; get; }
    }
}