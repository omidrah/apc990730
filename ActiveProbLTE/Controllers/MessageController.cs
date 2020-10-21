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
    [DisplayName("SMS/USS")]
    public class MessageController : ControllerBase
    {

        private IMessageService _message;        

        public MessageController(IMessageService message)
        {
            _message = message;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">MachineId</param>
        /// <returns></returns>
        [HttpGet]
        [Route("IndexWithMachineId/{id}")]
        [DisplayName("لیست")]
        public async Task<IEnumerable<MessageVm>> IndexWithMachineId(int id)
        {
            return await _message.GetMessage(id).ConfigureAwait(false);
        }

        [HttpGet]
        [Route("GetMessageById/{id}")]
        [DisplayName("جزییات")]
        public async Task<MessageVm> GetMessageById(int id)
        {
            return await _message.GetMessageById(id).ConfigureAwait(false);
        }

        [HttpPost]
        [Route("Create")]
        [DisplayName("افزودن")]
        public async Task<int> Create([FromBody] MessageVm message)
        {
            return await _message.Create(message).ConfigureAwait(false);
        }
        
        [HttpPut]
        [Route("Edit")]
        [DisplayName("ویرایش")]
        public async Task<APIResult<bool>> Edit([FromBody] MessageVm message)
        {
            return await _message.Edit(message).ConfigureAwait(false);
        }

        [HttpDelete]
        [Route("Delete/{id}")]
        [DisplayName("حذف")]
        public async Task<APIResult<bool>> Delete(int id)
        {
            return await _message.Delete(id).ConfigureAwait(false);
        }
    }
}