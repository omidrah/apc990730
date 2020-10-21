
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;

namespace ActiveProbe.Services
{
    public class LogErrService : GenericService<Errors>, ILogErrService
    {        
        public LogErrService(IUnitOfWork uow) : base(uow)
        {
            
        }
        public async Task<int> LogErrorAsync(System.Exception exception, string business, string ip = null)
        {
            string methdeName = "";
            string moduleName = "";
            try
            {
                var st = new StackTrace(exception, true);
                var frame = st.GetFrame(0);
                methdeName = $"{frame.GetMethod().DeclaringType.FullName}.{exception.TargetSite.ToString()}";
                moduleName = exception.TargetSite.DeclaringType.Module.Name;
                var assemblyName = exception.TargetSite.DeclaringType.Assembly.FullName;
            }
            catch { }
            string json = null;
            if (exception.Data.Count > 0)
            {
                json = exception.Data.ToString();
            }
            _tEntities.Add(new Errors{

                Business= business,
                Date = DateTime.Now,
                Module=moduleName,
                Methode= methdeName,
                Message= exception.Message,
                RawError = exception.ToString(),
                ExtraData= ip?? exception.Source
            });
            return await _uow.SaveChangesAsync();
        }
        
    }
    
}