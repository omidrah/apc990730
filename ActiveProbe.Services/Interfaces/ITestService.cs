using System.Collections.Generic;
using System.Threading.Tasks;
using ActiveProbe.Utils.ViewModel;

namespace ActiveProbe.Services.Interfaces
{
    public interface ITestService:IGenericService<ActiveProbe.Domain.Models.DefinedTest>
    {   
        Task<List<DefinedTestVm>> GetAllAsync();
        DefinedTestVm GetByIdAsync(int Id);      
    }
}