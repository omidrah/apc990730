
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class FieldColorThresholdService : GenericService<FieldColorThreshold>, IFieldColorThresholdService
    {        
        public FieldColorThresholdService(IUnitOfWork uow) : base(uow)
        {
     
        }
    }
}