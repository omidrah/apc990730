using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace ActiveProbe.Utils.ViewModel.Identity
{
    public class RoleViewModel
    {
        [HiddenInput]
        public string Id { set; get; }

        [Required(ErrorMessage = "(*)")]
        [Display(Name = "نام نقش")]
        public string Name { set; get; }

        
        [Display(Name = "توصیف نقش")]
        public string Description { set; get; }
    }
}