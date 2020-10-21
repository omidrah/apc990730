
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class SyncMasterService : GenericService<SyncMaster>, ISyncMasterService
    {        
        public SyncMasterService(IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}