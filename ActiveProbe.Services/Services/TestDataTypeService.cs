
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.AspNetCore.Http;


namespace ActiveProbe.Services
{
    public class TestDataTypeService : GenericService<TestDataType>, ITestDataTypeService
    {
        public TestDataTypeService(IUnitOfWork uow) : base(uow)
        {
        }
    }
}