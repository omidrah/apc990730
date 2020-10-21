
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.AspNetCore.Http;


namespace ActiveProbe.Services
{
    public class IPTypeService : GenericService<Iptype>, IIPTypeService
    {
        public IPTypeService(IUnitOfWork uow) : base(uow)
        {
        }
    }
}