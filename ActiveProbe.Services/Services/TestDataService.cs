
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.AspNetCore.Http;


namespace ActiveProbe.Services
{
    public class TestDataService : GenericService<TestData>, ITestDataService
    {
        public TestDataService(IUnitOfWork uow) : base(uow)
        {
        }
    }
}