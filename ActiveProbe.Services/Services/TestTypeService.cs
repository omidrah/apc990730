
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.AspNetCore.Http;


namespace ActiveProbe.Services
{
    public class TestTypeService : GenericService<TestType>, ITestTypeService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        public TestTypeService(IUnitOfWork uow, IHttpContextAccessor contextAccessor) : base(uow)
        {
            _contextAccessor = contextAccessor;
        }
    }
}