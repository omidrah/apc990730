
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.AspNetCore.Http;


namespace ActiveProbe.Services
{
    public class OTTServiceTestService : GenericService<OttserviceTest>, IOTTServiceTest
    {
        public OTTServiceTestService(IUnitOfWork uow) : base(uow)
        {
        }
    }
}