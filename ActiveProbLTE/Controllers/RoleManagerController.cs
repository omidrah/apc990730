using System.ComponentModel.DataAnnotations;
using System;
using System.Threading.Tasks;
using ActiveProbe.Domain.Identity;
using ActiveProbe.Services;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.Extentions;
using ActiveProbe.Utils.ViewModel;
using ActiveProbe.Utils.ViewModel.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

namespace ActiveProbeCore.Controllers
{
    [Authorize(Roles = ConstantRoles.Admin)]
    [ApiController]
    [DisplayName("نقش ها")]
    [Route("api/[controller]")]    
    public class RoleManagerController : Controller
    {
        private const string RoleNotFound = "نقش درخواستی یافت نشد.";
        private const int DefaultPageSize = 7;

        private readonly IApcRoleManager _roleManager;
        private readonly IMvcActionsDiscoveryService _mvcActionsDiscoveryService;


        public RoleManagerController(IApcRoleManager roleManager,IMvcActionsDiscoveryService mvcActionsDiscoveryService)
        {
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(_roleManager));
            _mvcActionsDiscoveryService = mvcActionsDiscoveryService ?? throw new ArgumentNullException(nameof(_mvcActionsDiscoveryService));

        }
        [Route("Index")]
        [HttpGet]
        [DisplayName("لیست")]
        public IActionResult Index()
        {
            var roles = _roleManager.GetAllCustomRolesAndUsersCountList();
            return Ok(roles);
        }
        [HttpGet]
        [Route("AccessControl")]
        [DisplayName("سطح دسترسی")]
        public async Task<IActionResult> AccessControl(int id){             
                 var role = await _roleManager.FindRoleIncludeRoleClaimsAsync(id);
                if (role == null)
                {
                    return BadRequest(RoleNotFound);                     
                }
            var securedControllerActions = _mvcActionsDiscoveryService.GetAllSecuredControllerActionsWithPolicy(ConstantPolicies.dynKkomAuthorization);
            return Ok(
            new DynamicRoleClaimsManagerViewModel
            {
                SecuredControllerActions = securedControllerActions,
                RoleIncludeRoleClaims = role
            });
        }
        [HttpPost]
        [Route("UpdateAccess/{id}")]
        public async Task<IActionResult> UpdateAccess(int id,[FromBody]string[] actions)
        {
            var result = await _roleManager.AddOrUpdateRoleClaimsAsync(                
                roleId: id,
                roleClaimType: ConstantPolicies.dynKkomAuthorizationClaimType,
                selectedRoleClaimValues: actions).ConfigureAwait(false);
            if (!result.Succeeded)
            {
                return BadRequest(new { msg= result.DumpErrors(useHtmlNewLine: true) });
            }
            return Ok(new { msg = $"دسترسی های نقش مورد نظر بروزرسانی گردید" });
        }
        [HttpGet]
        [Route("GetRoleById/{id}")]
        public async Task<ActionResult> GetRoleById(int id)
        {
            if (ModelState.IsValid)
            {
                var role = await _roleManager.FindByIdAsync(id.ToString()).ConfigureAwait(false);
                if (role == null)
                {
                    return BadRequest(new { msg = "نقش موردنظر وجود ندارد" });                    
                }
                else
                {
                    return Ok(role);
                }
            }
            return BadRequest(new { msg = ModelState.Values});
        }
        [HttpPost]   
        [Route("Edit")]   
        [DisplayName("ویرایش")] 
        public async Task<IActionResult> EditRole(RoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var role = await _roleManager.FindByIdAsync(model.Id).ConfigureAwait(false);
                if (role == null)
                {
                    ModelState.AddModelError("", RoleNotFound);
                }
                else
                {
                    role.Name = model.Name;
                    role.Description = model.Description;
                    var result = await _roleManager.UpdateAsync(role).ConfigureAwait(false);
                    if (result.Succeeded)
                    {
                        return Ok(new { msg = $"نقش {role.Name} با موفقیت بروزرسانی گردید" });
                    }
                    return BadRequest(new { msg = result.Errors });

                }
            }
            return BadRequest(new { msg = ModelState.Values });
        }
        [HttpPost]      
        [Route("Create")]      
        [DisplayName("افزودن")]
        public async Task<IActionResult> AddRole(RoleViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _roleManager.CreateAsync(new Role(model.Name,model.Description)).ConfigureAwait(false);
                if (result.Succeeded)
                {
                    return Ok(new { msg = $"نقش با عنوان  {model.Name} با موفقیت افزوده شد" });
                }
                return BadRequest(new { msg = result.Errors});
            }
            return BadRequest(new { msg = ModelState.Values });
        }


        [HttpDelete]
        [Route("Delete/{id}")]    
        [DisplayName("حذف")]
        public async Task<IActionResult> Delete(int id)
        {            
            var role = await _roleManager.FindByIdAsync(roleId:id.ToString()).ConfigureAwait(false);
            if (role == null)
            {
                return BadRequest(new { msg = "نقشی با این عنوان وجود ندارد" });
            }
            else
            {
                var result = await _roleManager.DeleteAsync(role).ConfigureAwait(false);
                if (result.Succeeded)
                {
                    return Ok(new { msg = $"نقش با عنوان  {role.Name} با موفقیت حذف گردید" });
                }
                return BadRequest(new { msg = result.Errors});

            }
        }
        [HttpGet]
        [Route("UsersInRole")]
        [DisplayName("کاربران نقش")]
        public async Task<IActionResult> UsersInRole(int? id, int? page = 1, string field = "Id", SortOrder order = SortOrder.Ascending)
        {
            if (id == null)
            {
                return BadRequest(new { msg = "درخواست نامناسب" });
            }

            var model = await _roleManager.GetPagedUsersInRoleListAsync(
                roleId: id.Value,
                pageNumber: page.Value - 1,
                recordsPerPage: DefaultPageSize,
                sortByField: field,
                sortOrder: order,
                showAllUsers: true).ConfigureAwait(false);
            return Ok(model);
        }
    }   
}