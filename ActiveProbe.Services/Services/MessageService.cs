using System;
using System.Linq;
using System.Collections.Generic;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using ActiveProbe.Utils.ViewModel;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace ActiveProbe.Services
{
    public class MessageService : GenericService<MachineUssd>, IMessageService
    {
        public MessageService(IUnitOfWork uow) : base(uow)
        {
        }

        public async Task<int> Create(MessageVm message)
        {
            _tEntities.Add(new MachineUssd
            {
                Machineid = message.Machineid,
                Modem = message.Modem,
                Sim = message.Sim,
                body = message.body,
                CreatedDate = DateTime.Now,
                DateFromDevice = DateTime.Now,
                Status = 0,
                msg = "USS"
            });
            return await _uow.SaveChangesAsync().ConfigureAwait(false);
        }

        public async Task<APIResult<bool>> Delete(int messageId)
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            var curmsg = _tEntities.FirstOrDefault(t => t.Id == messageId && t.Status == 0);
            if (curmsg != null)
            {
                _tEntities.Remove(curmsg);
                await _uow.SaveChangesAsync().ConfigureAwait(false);

                result.Result = true;
                result.Succeed = true;
            }
            else
            {
                result.Result = false;
                result.Succeed = true;
                result.Message = "CannotDeleteSendMessage";
            }

            return result;
        }

        public async Task<APIResult<bool>> Edit(MessageVm message)
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            var curmsg = _tEntities.FirstOrDefault(t => t.Id == message.Id && t.Status == 0);
            if (curmsg != null)
            {
                curmsg.body = message.body;
                curmsg.CreatedDate = message.CreatedDate;
                curmsg.Modem = message.Modem;
                curmsg.Sim = message.Sim;
                curmsg.CreatedDate = DateTime.Now;
                curmsg.DateFromDevice = DateTime.Now;

                await _uow.SaveChangesAsync().ConfigureAwait(false);

                result.Result = true;
                result.Succeed = true;
            }
            else
            {
                result.Result = false;
                result.Succeed = true;
                result.Message = "CannotUpdateSendMessage";
            }

            return result;
        }

        public async Task<IEnumerable<MessageVm>> GetMessage(int machineId)
        {

            var res =
            from parent in _tEntities
            join chl in _tEntities on parent.Id equals chl.ParentId into childs
            from child in childs.DefaultIfEmpty()
            where parent.Machineid == machineId && parent.ParentId == null
            orderby child.CreatedDate ?? parent.CreatedDate descending
            select new MessageVm
            {
                Id = parent.Id,
                Modem = parent.Modem,
                Sim = parent.Sim,
                Iccid = child.Iccid ?? parent.Iccid,
                msg = parent.msg,
                Status = child.Status ?? parent.Status,
                CreatedDate = child.CreatedDate ?? parent.CreatedDate,
                DateFromDevice = child.DateFromDevice ?? parent.CreatedDate,
                SimBody = child.SimBody,
                SendMessage = parent.Status == null ? child.body : parent.body,
                ReceiveMessage = parent.Status == null ? parent.body : child.body
            };

            return await res.ToListAsync();
        }

        public async Task<MessageVm> GetMessageById(int messageId)
        {
            var res =
            from message in _tEntities
            where message.Id == messageId && message.Status == 0
            select new MessageVm
            {
                Id = message.Id,
                Modem = message.Modem,
                Sim = message.Sim,
                Iccid = message.Iccid,
                msg = message.msg,
                Status = message.Status,
                CreatedDate = message.CreatedDate,
                DateFromDevice = message.CreatedDate,
                SimBody = message.SimBody,
                body = message.body,
                Imei1 = message.Imei1,
                Imei2 = message.Imei2,
                Machineid = message.Machineid,
                ParentId = message.ParentId
            };

            return await res.FirstOrDefaultAsync();
        }
    }
}