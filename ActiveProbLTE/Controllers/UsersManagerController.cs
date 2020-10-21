
using ActiveProbe.Domain.Identity;
using ActiveProbe.Services;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.Extentions;
using ActiveProbe.Utils.ViewModel.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace ActiveProbeCore.Controllers
{
    [Authorize(Roles = ConstantRoles.Admin)]
    [DisplayName("کاربران")]
    [Route("api/[controller]")]
    public class UsersManagerController : ControllerBase
    {
        private const int DefaultPageSize = 10;
        private readonly IApcRoleManager _roleManager;
        private readonly IApcUserManager _userManager;
        private readonly ILogger<UsersManagerController> _logger;
        IApcSignInManager _signInManager;
        public UsersManagerController(
            IApcUserManager userManager,
            IApcRoleManager roleManager,
            ILogger<UsersManagerController> logger,
            IApcSignInManager signInManager)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(_userManager));
            _roleManager = roleManager ?? throw new ArgumentNullException(nameof(_roleManager));
            _logger = logger ?? throw new ArgumentNullException(nameof(_logger));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(_signInManager));
        }
        [HttpPut]       
        [Route("ChangeUserRoles/{userId}")]
        public async Task<IActionResult> ChangeUserRoles([FromRoute]int userId,[FromBody] int[] roleIds)
        {
            User thisUser = null;
            var result = await _userManager.AddOrUpdateUserRolesAsync(
                userId, roleIds, user => thisUser = user).ConfigureAwait(false);
            if (!result.Succeeded)
            {                
                return BadRequest(new { msg = result.DumpErrors(useHtmlNewLine: true) });
            }
            return Ok(new { msg = $"تغییر نقش کاربر با موفقیت انجام گردید" });
        }
        [Route("Index")]
        [DisplayName("لیست کاربران")]
        [HttpGet]
        public async Task<IActionResult> Index(
                    int? page = 1,
                    string field = "Id",
                    SortOrder order = SortOrder.Ascending)
        {
            var model = await _userManager.GetPagedUsersListAsync(
                pageNumber: page.Value - 1,
                recordsPerPage: DefaultPageSize,
                sortByField: field,
                sortOrder: order,
                showAllUsers: true).ConfigureAwait(false);

            return Ok(model);
        }
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User
                {
                    UserName = model.Username,
                    Email = model.Email,
                    FirstName = model.FirstName,
                    LastName = model.LastName
                };
                var result = await _userManager.CreateAsync(user, model.Password).ConfigureAwait(false);
                if (result.Succeeded)
                {                    
                    return Ok(new { msg = $"کاربری جدید با {user.UserName} با موفقیت ایجد گردید" });
                }
                return BadRequest(new { msg = result.Errors });

            }
            return BadRequest(new { msg = ModelState.Values });
        }
        [HttpGet]
        [Route("GetUserById/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userManager.FindByIdAsync(id.ToString()).ConfigureAwait(false);
            return Ok(user);
        }
        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit([FromBody]EditViewModel updateUser)
        
        {
            var user = await _userManager.FindByIdAsync(updateUser.id.ToString()).ConfigureAwait(false);
            if (user == null)
            {
                return BadRequest(new { msg = "کاربری با این مشخصات وجود ندارد" });
            }
            user.FirstName = updateUser.FirstName;
            user.LastName = updateUser.LastName;
            user.Email = updateUser.Email;
            user.UserName = updateUser.Username;
            var updateResult = await _userManager.UpdateAsync(user).ConfigureAwait(false);
            if (updateResult.Succeeded)
            {
                return Ok(new { msg = $" مشخصات کاربر {user.DisplayName} با موفقیت تغییر یافت" });
            }
            return BadRequest(new { msg = updateResult.Errors });
        }
        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody]ChangePasswordViewModel model)
        {
            
            var user = await _userManager.FindByIdAsync(model.id.ToString()).ConfigureAwait(false);
            if (user == null)
            {
                return BadRequest(new { msg = "کاربری با این مشخصات وجود ندارد" });
            }
            var result = await _userManager.UpdatePasswordHash(user, model.NewPassword, validatePassword: true)
                .ConfigureAwait(false);
            if (result.Succeeded)
            {
                await _userManager.UpdateSecurityStampAsync(user).ConfigureAwait(false);
                // reflect the changes in the Identity cookie
                await _signInManager.RefreshSignInAsync(user).ConfigureAwait(false);

                return Ok(new { msg=$"رمز عبور{user.DisplayName} با موفقیت تغییر یافت" });
            }
            return BadRequest(new { msg = result.Errors });
        }
        [HttpGet]
        [Route("userRoles/{id}")]
        public async Task<IActionResult> GetRoleByuserId(int id)
        {
            var rolesForUserId = _roleManager.GetRolesForUser(id);
            var allrole = await _roleManager.GetAllCustomRolesAsync().ConfigureAwait(false);
            var roles  =  allrole.Select(x => new {
                x.Id,
                x.Name,
                x.Description,
                selected= rolesForUserId.Contains(x) 
            });
            return Ok(new { roles });

        }
       
    }
}