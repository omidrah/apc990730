using System.Threading.Tasks;
using ActiveProbe.Domain.Models;

namespace ActiveProbe.Services.Interfaces
{
    public interface ILogErrService:IGenericService<Errors>
    {   
        Task<int> LogErrorAsync(System.Exception exception, string business, string ip = null);
    }
}