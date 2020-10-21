using ActiveProbe.Domain.Models;
using ActiveProbe.Utils.ViewModel;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ActiveProbe.Services.Interfaces
{
    public interface IMessageService : IGenericService<MachineUssd>
    {
        Task<IEnumerable<MessageVm>> GetMessage(int machineId);
        Task<MessageVm> GetMessageById(int messageId);
        Task<int> Create(MessageVm message);
        Task<APIResult<bool>> Edit(MessageVm message);
        Task<APIResult<bool>> Delete(int messageId);
    }
}