
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.AspNetCore.Http;


namespace ActiveProbe.Services
{
    public class RepeatTypeService : GenericService<RepeatType>, IRepeatTypeService
    {
        public RepeatTypeService(IUnitOfWork uow) : base(uow)
        {
        }
    }
}