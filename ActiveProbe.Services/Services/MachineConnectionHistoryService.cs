
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using ActiveProbe.Utils.ViewModel;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActiveProbe.Services
{
    public class MachineConnectionHistoryService : GenericService<MachineConnectionHistory>, IMachineConnectionHistoryService
    {
        private readonly ConfigurationsVm _config;
        public MachineConnectionHistoryService(IUnitOfWork uow, IOptions<ConfigurationsVm> config) : base(uow)
        {
            _config = config.Value;
        }

        public async Task<APIResult<bool>> DeleteOldData()
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };
            try
            {

                //---------------------------------------------------------------------------------------
                //var oldDataList = _tEntities.GroupBy(t => t.MachineId)
                //                        .SelectMany(t => t.OrderByDescending(u => u.CreatedDate)
                //                                          .Skip(1)
                //                                    ).ToList();
                //Client side GroupBy is not supported 
                //https://stackoverflow.com/questions/58138556/client-side-groupby-is-not-supported
                //---------------------------------------------------------------------------------------

                //var histories = _tEntities.Select(t => t).ToList();
                var histories = _tEntities.Take(_config.Properties.HistoryDeletePacketSize).ToList();

                var machineHistories = histories.GroupBy(t => t.MachineId);
                var oldMachineHistorys = machineHistories.SelectMany(t => t.OrderByDescending(u => u.CreatedDate)
                                                          .Skip(_config.Properties.HistoryDeleteExceptRows) // نگهداری دو ردیف آخر برای تشخیص آخرین اتصال دستگاه
                                                    ).ToList();


                //var historyCount = oldMachineHistorys.Count;
                //var nSize = 100;

                //for (int i = 0; i < historyCount; i += nSize)
                //{
                //    _tEntities.RemoveRange(oldMachineHistorys.GetRange(i, Math.Min(nSize, historyCount - i)));
                //    await _uow.SaveChangesAsync().ConfigureAwait(false);
                //}

                _tEntities.RemoveRange(oldMachineHistorys);
                await _uow.SaveChangesAsync().ConfigureAwait(false);

                result.Result = true;
                result.Succeed = true;

            }
            catch (System.Exception ex)
            {
                result.Result = false;
                result.Succeed = false;
                result.Message = ex.Message;
            }

            return result;
        }

        public async Task<APIResult<List<MachineConnectionHistory>>> GetAllData()
        {
            var result = new APIResult<List<MachineConnectionHistory>>()
            {
                Result = new List<MachineConnectionHistory>(),
                Message = "",
                Succeed = false
            };

            var allData = _tEntities.Select(t => t)
                                    .OrderByDescending(t => t.CreatedDate)
                                    .ToList();
            if (allData != null)
            {
                result.Result = allData;
                result.Succeed = true;
            }
            else
                result.Succeed = false;


            return result;
        }
    }
}