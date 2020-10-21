
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using Microsoft.AspNetCore.Http;


namespace ActiveProbe.Services
{
    public class LogFilePartitionTypeService : GenericService<LogFilePartitionType>, ILogFilePartitionTypeService
    {
        public LogFilePartitionTypeService(IUnitOfWork uow) : base(uow)
        {
        }
    }
}