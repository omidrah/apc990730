
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class DateTestModelService : GenericService<DateTestModel>, IDateTestModelService
    {        
        public DateTestModelService(IUnitOfWork uow) : base(uow)
        {
     
        }        
    }
}