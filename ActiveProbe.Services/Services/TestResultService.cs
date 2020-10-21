
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class TestResultService  : GenericService<TestResult>, ITestResultService 
    {        
        public TestResultService (IUnitOfWork uow) : base(uow)
        {
            
        }
    }
}