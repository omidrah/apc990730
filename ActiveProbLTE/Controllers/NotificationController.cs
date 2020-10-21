using System.Collections.Generic;
using System.ComponentModel;
using System.Threading.Tasks;
using ActiveProbe.Services;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Utils.ViewModel;
using ActiveProbeCore.BL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ActiveProbeCore.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy=ConstantPolicies.dynKkomAuthorization)]
    [ApiController]
    [DisplayName("Notification")]
    public class NotificationController : ControllerBase
    {

        private INotificationService _notification;        

        public NotificationController(INotificationService notification)
        {
            _notification = notification;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">MachineId</param>
        /// <returns></returns>
        [HttpGet]
        [Route("Index")]
        [DisplayName("لیست")]
        public async Task<IEnumerable<NotificationVm>> Index()
        {
            return await _notification.GetNotifications().ConfigureAwait(false);
        }

        [HttpGet]
        [Route("GetNotificationById/{id}")]
        [DisplayName("جزییات")]
        public async Task<NotificationVm> GetNotificationById(int id)
        {
            return await _notification.GetNotificationById(id).ConfigureAwait(false);
        }

        [HttpPost]
        [Route("Create")]
        [DisplayName("افزودن")]
        public async Task<APIResult<int>> Create([FromBody] NotificationVm Notification)
        {
            return await _notification.Create(Notification).ConfigureAwait(false);
        }
        
        [HttpPut]
        [Route("Edit")]
        [DisplayName("ویرایش")]
        public async Task<APIResult<bool>> Edit([FromBody] NotificationVm Notification)
        {
            return await _notification.Edit(Notification).ConfigureAwait(false);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        [DisplayName("حذف")]
        public async Task<APIResult<bool>> Delete(int id)
        {
            return await _notification.Delete(id).ConfigureAwait(false);
        }
    }
}