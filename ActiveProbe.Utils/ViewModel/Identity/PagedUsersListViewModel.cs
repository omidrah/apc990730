using System.Collections.Generic;
using ActiveProbe.Domain.Identity;
using cloudscribe.Web.Pagination;

namespace ActiveProbe.Utils.ViewModel.Identity
{
    public class PagedUsersListViewModel
    {        
        public List<User> Users { get; set; }

        public List<Role> Roles { get; set; }      
    }
}
