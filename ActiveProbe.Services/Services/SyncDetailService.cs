
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class SyncDetailService : GenericService<SyncDetail>, ISyncDetailService
    {        
        public SyncDetailService(IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}