using ActiveProbe.DataLayer.Context;
using ActiveProbe.Domain.Enums;
using ActiveProbe.Domain.Models;
using ActiveProbe.Services.Interfaces;
using ActiveProbe.Services.Services;
using ActiveProbe.Utils.Tools.Mail;
using ActiveProbe.Utils.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActiveProbe.Services
{
    public class NotificationService : GenericService<Notification>, INotificationService
    {
        DbSet<NotificationParameter> _notificationParameter;
        DbSet<NotificationFilter> _notificationFilter;
        DbSet<SendedNotification> _sendedNotification;

        DbSet<TestResult> _testResult;
        DbSet<Machine> _machine;

        private readonly IMailService _mailService;

        public NotificationService(IUnitOfWork uow, IMailService mailService) : base(uow)
        {
            _notificationFilter = _uow.Set<NotificationFilter>();
            _notificationParameter = _uow.Set<NotificationParameter>();
            _sendedNotification = _uow.Set<SendedNotification>();

            _testResult = _uow.Set<TestResult>();
            _machine = _uow.Set<Machine>();

            _mailService = mailService;
        }

        public async Task<APIResult<int>> Create(NotificationVm notification)
        {
            return await createNotif(notification);
        }

        public async Task<APIResult<bool>> Delete(int notificationId)
        {
            return await deleteNotif(notificationId);
        }

        public async Task<APIResult<bool>> Edit(NotificationVm notification)
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            try
            {

                //ToDo :: Mostafa :: Begin Transaction

                var deleteResult = await deleteNotif(notification.id);
                if (deleteResult.Succeed == true && deleteResult.Result == true)
                {
                    var createResult = await createNotif(notification);
                    if (createResult.Succeed == true && createResult.Result > 0)
                    {
                        result.Result = true;
                        result.Succeed = true;

                        // ToDo :: Mostafa :: Commite Transaction
                    }
                }
            }
            catch (Exception ex)
            {
                // ToDo :: Mostafa :: Roleback Transaction
                result.Succeed = false;
                result.Result = false;
                result.Message = ex.Message;
            }
            return result;
        }

        public async Task<IEnumerable<NotificationVm>> GetNotifications()
        {
            var res = _tEntities.Select(t => new NotificationVm
            {
                id = t.Id,
                activation = t.Activation,
                email = t.Email,
                messageContent = t.MessageContent,
                mobile = t.Mobile,
                name = t.Name,
                notificationType = t.NotificationType,
                sendEndTime = t.SendEndTime,
                sendStartTime = t.SendStartTime,
                title = t.Title,
                maxSend = t.MaxSend,
                timeIntervalToNextSend = t.TimeIntervalToNextSend
            });

            return await res.ToListAsync();
        }

        public async Task<NotificationVm> GetNotificationById(int notificationId)
        {

            var notif = _tEntities.Include(t => t.NotificationParameters)
                              .ThenInclude(u => u.NotificationFilters)
                              .FirstOrDefault(t => t.Id == notificationId);

            var res = new NotificationVm()
            {
                id = notif.Id,
                activation = notif.Activation,
                email = notif.Email,
                messageContent = notif.MessageContent,
                mobile = notif.Mobile,
                name = notif.Name,
                notificationType = notif.NotificationType,
                sendEndTime = notif.SendEndTime,
                sendStartTime = notif.SendStartTime,
                title = notif.Title,
                maxSend = notif.MaxSend,
                timeIntervalToNextSend = notif.TimeIntervalToNextSend,

                notificationParameters = notif.NotificationParameters.Select(t => new NotificationParameterVm()
                {
                    Id = t.Id,
                    functionTypeId = t.FunctionTypeId,
                    groupId = t.GroupId,
                    machineId = t.MachineId,
                    networkTypeId = t.NetworkTypeId,
                    operatorTypeId = t.OperatorTypeId,
                    parameterTypeId = t.ParameterTypeId,
                    logicalSymbolTypeId = t.LogicalSymbolTypeId,
                    searchEndDate = t.SearchEndDate,
                    searchStartDate = t.SearchStartDate,
                    zoneId = t.ZoneId,

                    NotificationFilters = t.NotificationFilters.Select(u => new NotificationFilterVm()
                    {
                        Id = u.Id,
                        conditionalValueTypeId = u.ConditionalValueTypeId,
                        filterlogicalSymbol = u.FilterlogicalSymbol,
                        logicalSymbolTypeId = u.LogicalSymbolTypeId
                    }).ToList()

                }).ToList()
            };

            return res;
        }

        public async Task<APIResult<bool>> PushNotification()
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            try
            {
                //ToDo :: Mostafa :: Begin Transaction

                //Get All Avalable Notif to start push notif

                var nowTime = DateTime.Now.TimeOfDay;
                var now = DateTime.Now;

                var notifs = _tEntities.Where(t => t.Activation);
                notifs = _tEntities.Where(t => (t.NotificationType == NotificationType.OnTime)
                                                ||
                                                (
                                                    t.NotificationType == NotificationType.InTimeRange &&
                                                    t.SendStartTime <= nowTime && nowTime < t.SendEndTime
                                                )
                                                ||
                                                (
                                                    t.NotificationType == NotificationType.OnceADay &&
                                                    !t.SendedNotifications.Any(u => u.SendDate <= now.AddDays(-1))
                                                )
                                            );

                notifs = notifs.Where(t => t.SendedNotifications.Count < t.MaxSend);
                notifs = notifs.Where(t => !t.SendedNotifications.Any(u => u.SendDate <= now.AddMinutes(t.TimeIntervalToNextSend)));

                notifs = notifs.Where(t => t.NotificationParameters.Any(u => u.SearchStartDate <= now &&
                                                                           now <= u.SearchEndDate));

                notifs = notifs.Include(t => t.NotificationParameters)
                               .ThenInclude(t => t.NotificationFilters)
                               .Include(t => t.SendedNotifications);

                var notifList = notifs.ToList();

                //Get All Parameter and value for each condition

                var notificationMustBeSent = new List<Notification>();

                notifList.ForEach(t =>
                {
                    var boolParameterResult = true;

                    t.NotificationParameters.ToList().ForEach(u =>
                    {
                        var testQuery = _testResult.Where(z => u.SearchStartDate <= z.CreateDate && z.CreateDate <= u.SearchEndDate);

                        switch (u.OperatorTypeId)
                        {
                            case OperatorType.MCI:
                                testQuery = testQuery.Where(z => z.Mnc == 11);
                                break;
                            case OperatorType.Irancell:
                                testQuery = testQuery.Where(z => z.Mnc == 35);
                                break;
                            case OperatorType.Rightell:
                                testQuery = testQuery.Where(z => z.Mnc == 4);
                                break;
                            default:
                                break;
                        }

                        switch (u.NetworkTypeId)
                        {
                            case NetworkType.GSM:
                                testQuery = testQuery.Where(z => z.SystemMode == 1 || z.SystemMode == 2 || z.SystemMode == 3);
                                break;
                            case NetworkType.WCDMA:
                                testQuery = testQuery.Where(z => z.SystemMode == 4 || z.SystemMode == 5 || z.SystemMode == 6 || z.SystemMode == 7);
                                break;
                            case NetworkType.LTE:
                                testQuery = testQuery.Where(z => z.SystemMode == 8);
                                break;
                            default:
                                break;
                        }

                        if (u.MachineId != 0)
                            testQuery = testQuery.Where(z => z.MachineId == u.MachineId);
                        else
                        {
                            var machineIds = _machine.Where(z => z.MachineGroupId == u.GroupId)
                                            .Select(z => z.Id)
                                            .ToList();
                            testQuery = testQuery.Where(z => machineIds.Contains(u.MachineId));
                        }


                        if (u.ZoneId > 0)
                        {
                            // ToDo :: Mostafa :: Add Zone to search
                        }

                        double? parameter = null;

                        switch (u.FunctionTypeId)
                        {
                            case FunctionType.Min:

                                switch (u.ParameterTypeId)
                                {
                                    case ParameterType.RSRP:
                                        parameter = testQuery.Min(z => z.Rsrp);
                                        break;
                                    case ParameterType.RXLevel:
                                        parameter = testQuery.Min(z => z.Rxlevel);
                                        break;
                                    case ParameterType.RSRQ:
                                        parameter = testQuery.Min(z => z.Rsrq);
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case FunctionType.Max:

                                switch (u.ParameterTypeId)
                                {
                                    case ParameterType.RSRP:
                                        parameter = testQuery.Max(z => z.Rsrp);
                                        break;
                                    case ParameterType.RXLevel:
                                        parameter = testQuery.Max(z => z.Rxlevel);
                                        break;
                                    case ParameterType.RSRQ:
                                        parameter = testQuery.Max(z => z.Rsrq);
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case FunctionType.Sum:

                                switch (u.ParameterTypeId)
                                {
                                    case ParameterType.RSRP:
                                        parameter = testQuery.Sum(z => z.Rsrp);
                                        break;
                                    case ParameterType.RXLevel:
                                        parameter = testQuery.Sum(z => z.Rxlevel);
                                        break;
                                    case ParameterType.RSRQ:
                                        parameter = testQuery.Sum(z => z.Rsrq);
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case FunctionType.Count:

                                switch (u.ParameterTypeId)
                                {
                                    case ParameterType.RSRP:
                                        parameter = testQuery.Count(z => z.Rsrp != null);
                                        break;
                                    case ParameterType.RXLevel:
                                        parameter = testQuery.Count(z => z.Rxlevel != null);
                                        break;
                                    case ParameterType.RSRQ:
                                        parameter = testQuery.Count(z => z.Rsrq != null);
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case FunctionType.First:

                                switch (u.ParameterTypeId)
                                {
                                    case ParameterType.RSRP:
                                        parameter = testQuery.OrderBy(z => z.Id).Select(z => z.Rsrp).FirstOrDefault();
                                        break;
                                    case ParameterType.RXLevel:
                                        parameter = testQuery.OrderBy(z => z.Id).Select(z => z.Rxlevel).FirstOrDefault();
                                        break;
                                    case ParameterType.RSRQ:
                                        parameter = testQuery.OrderBy(z => z.Id).Select(z => z.Rsrq).FirstOrDefault();
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case FunctionType.Last:
                                switch (u.ParameterTypeId)
                                {
                                    case ParameterType.RSRP:
                                        parameter = testQuery.OrderBy(z => z.Id).Select(z => z.Rsrp).LastOrDefault();
                                        break;
                                    case ParameterType.RXLevel:
                                        parameter = testQuery.OrderBy(z => z.Id).Select(z => z.Rxlevel).LastOrDefault();
                                        break;
                                    case ParameterType.RSRQ:
                                        parameter = testQuery.OrderBy(z => z.Id).Select(z => z.Rsrq).LastOrDefault();
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case FunctionType.Avgrage:

                                switch (u.ParameterTypeId)
                                {
                                    case ParameterType.RSRP:
                                        parameter = testQuery.Average(z => z.Rsrp);
                                        break;
                                    case ParameterType.RXLevel:
                                        parameter = testQuery.Average(z => z.Rxlevel);
                                        break;
                                    case ParameterType.RSRQ:
                                        parameter = testQuery.Average(z => z.Rsrq);
                                        break;
                                    default:
                                        break;
                                }
                                break;
                            case FunctionType.Mean:
                                break;
                            default:
                                break;
                        }

                        var boolFilterResult = true;
                        u.NotificationFilters.ToList().ForEach(x =>
                        {
                            var filterlogicalSymbol = (double?)Convert.ToDouble(x.FilterlogicalSymbol);
                            switch (x.ConditionalValueTypeId)
                            {
                                case ConditionalValueType.LessThan:
                                    if (x.LogicalSymbolTypeId == LogicalSymbolType.And)
                                        boolFilterResult = boolFilterResult && (parameter < filterlogicalSymbol);
                                    else
                                        boolFilterResult = boolFilterResult || (parameter < filterlogicalSymbol);
                                    break;
                                case ConditionalValueType.LessThanOrEqualTo:
                                    if (x.LogicalSymbolTypeId == LogicalSymbolType.And)
                                        boolFilterResult = boolFilterResult && (parameter <= filterlogicalSymbol);
                                    else
                                        boolFilterResult = boolFilterResult || (parameter <= filterlogicalSymbol);
                                    break;
                                case ConditionalValueType.GreaterThan:
                                    if (x.LogicalSymbolTypeId == LogicalSymbolType.And)
                                        boolFilterResult = boolFilterResult && (parameter > filterlogicalSymbol);
                                    else
                                        boolFilterResult = boolFilterResult || (parameter > filterlogicalSymbol);
                                    break;
                                case ConditionalValueType.GreaterThanOrEqualTo:
                                    if (x.LogicalSymbolTypeId == LogicalSymbolType.And)
                                        boolFilterResult = boolFilterResult && (parameter >= filterlogicalSymbol);
                                    else
                                        boolFilterResult = boolFilterResult || (parameter >= filterlogicalSymbol);
                                    break;
                                case ConditionalValueType.EqualTo:
                                    if (x.LogicalSymbolTypeId == LogicalSymbolType.And)
                                        boolFilterResult = boolFilterResult && (parameter == filterlogicalSymbol);
                                    else
                                        boolFilterResult = boolFilterResult || (parameter == filterlogicalSymbol);
                                    break;
                                case ConditionalValueType.NotEqualTo:
                                    if (x.LogicalSymbolTypeId == LogicalSymbolType.And)
                                        boolFilterResult = boolFilterResult && (parameter != filterlogicalSymbol);
                                    else
                                        boolFilterResult = boolFilterResult || (parameter != filterlogicalSymbol);
                                    break;
                            }
                        });


                        //accept this filters for totif parameter
                        if (u.LogicalSymbolTypeId == LogicalSymbolType.And)
                            boolParameterResult = boolParameterResult && boolFilterResult;
                        else
                            boolParameterResult = boolParameterResult || boolFilterResult;
                    });

                    //accept this parameters for totifs
                    if (boolParameterResult)
                        notificationMustBeSent.Add(t);

                });

                #region Push Notif and Save pushed notif at sendNotif Table
                
                var sendedNotification = new List<SendedNotification>();
                notificationMustBeSent.ForEach(t =>
                {
                    //Push Notif
                    var mailRequest = new MailRequest()
                    {
                        Subject = t.Title
                    };
                    _mailService.SendEmailAsync(mailRequest);

                    sendedNotification.Add(new SendedNotification()
                    {
                        NotifId = t.Id,
                        CreateDate = now,
                        Email = t.Email,
                        Mobile = t.Mobile,
                        SendDate = DateTime.Now
                    });

                });

                #endregion

                _sendedNotification.AddRange(sendedNotification);

                result.Result = await _uow.SaveChangesAsync().ConfigureAwait(false) > 0;
                result.Succeed = true;

                // ToDo :: Mostafa :: Commite Transaction

                //}
            }
            catch (Exception ex)
            {
                // ToDo :: Mostafa :: Roleback Transaction
                result.Succeed = false;
                result.Result = false;
                result.Message = ex.Message;
            }
            return result;
        }

        #region Private Methods

        private async Task<APIResult<int>> createNotif(NotificationVm notification)
        {

            var result = new APIResult<int>()
            {
                Result = 0,
                Message = "",
                Succeed = false
            };

            try
            {
                var notif = new Notification
                {
                    Activation = notification.activation,
                    Email = notification.email,
                    MessageContent = notification.messageContent,
                    Mobile = notification.mobile,
                    Name = notification.name,
                    NotificationType = notification.notificationType,
                    SendEndTime = notification.sendEndTime,
                    SendStartTime = notification.sendStartTime,
                    Title = notification.title,
                    MaxSend = notification.maxSend,
                    TimeIntervalToNextSend = notification.timeIntervalToNextSend,

                    NotificationParameters = new List<NotificationParameter>()
                };

                var notifParam = new List<NotificationParameter>();
                notification.notificationParameters.ForEach(t =>
                {

                    var notificationParameter = new NotificationParameter
                    {
                        FunctionTypeId = t.functionTypeId,
                        GroupId = t.groupId,
                        MachineId = t.machineId,
                        NetworkTypeId = t.networkTypeId,
                        OperatorTypeId = t.operatorTypeId,
                        ParameterTypeId = t.parameterTypeId,
                        LogicalSymbolTypeId = t.logicalSymbolTypeId,
                        SearchEndDate = t.searchEndDate,
                        SearchStartDate = t.searchStartDate,
                        ZoneId = t.zoneId,
                        NotificationFilters = new List<NotificationFilter>()
                    };
                    var notificationFilters = t.NotificationFilters.Select(u => new NotificationFilter()
                    {
                        ConditionalValueTypeId = u.conditionalValueTypeId,
                        FilterlogicalSymbol = u.filterlogicalSymbol,
                        LogicalSymbolTypeId = u.logicalSymbolTypeId
                    }).ToList();

                    notificationFilters.ForEach(u =>
                    {
                        notificationParameter.NotificationFilters.Add(u);
                    });

                    notifParam.Add(notificationParameter);
                });

                notifParam.ForEach(t =>
                {
                    notif.NotificationParameters.Add(t);
                });

                _tEntities.Add(notif);

                result.Result = await _uow.SaveChangesAsync().ConfigureAwait(false);
                result.Succeed = true;

            }
            catch (Exception ex)
            {
                result.Succeed = false;
                result.Result = -1;
                result.Message = ex.Message;
            }
            return result;
        }

        private async Task<APIResult<bool>> deleteNotif(int notificationId)
        {
            var result = new APIResult<bool>()
            {
                Result = false,
                Message = "",
                Succeed = false
            };

            var curmsg = _tEntities.FirstOrDefault(t => t.Id == notificationId);
            if (curmsg != null)
            {
                _tEntities.Remove(curmsg);
                await _uow.SaveChangesAsync().ConfigureAwait(false);

                result.Result = true;
                result.Succeed = true;
            }
            else
            {
                result.Result = false;
                result.Succeed = true;
                result.Message = "CannotFindNotification";
            }

            return result;
        }

        //private IQueryable<TestResult> parameterTypeFilter(IQueryable<TestResult> testResults, ParameterType parameterType, FunctionType function)
        //{

        //    IQueryable<NotifTestResult> xxxx =null;

        //    var type = Utils.ViewModel.Type.NullableDouble;

        //    switch (parameterType)
        //    {
        //        case ParameterType.RSRP:
        //            xxxx = testResults.Select(t => new NotifTestResult { NullableDouble = t.Rsrp, NullableCreateDate = t.CreateDate });
        //            type = Utils.ViewModel.Type.NullableDouble;
        //            break;
        //        case ParameterType.RXLevel:
        //            xxxx = testResults.Select(t => new NotifTestResult { NullableDouble = t.Rxlevel, NullableCreateDate = t.CreateDate });
        //            type = Utils.ViewModel.Type.NullableDouble;
        //            break;
        //        case ParameterType.RSRQ:
        //            xxxx = testResults.Select(t => new NotifTestResult { NullableDouble = t.Rsrq, NullableCreateDate = t.CreateDate });
        //            type = Utils.ViewModel.Type.NullableDouble;
        //            break;
        //        default:
        //            break;
        //    }

        //    var xx = functionFilter(xxxx, type, function);
        //}

        //private IQueryable<TestResult> functionFilter(IQueryable<NotifTestResult> xxxx, Utils.ViewModel.Type type, FunctionType function)
        //{
        //    switch (function)
        //    {
        //        case FunctionType.Min:

        //            var x = xxxx.Min(t=>t.)


        //            break;
        //        case FunctionType.Max:
        //            break;
        //        case FunctionType.Sum:
        //            break;
        //        case FunctionType.Count:
        //            break;
        //        case FunctionType.First:
        //            break;
        //        case FunctionType.Last:
        //            break;
        //        case FunctionType.Avgrage:
        //            break;
        //        case FunctionType.Mean:
        //            break;
        //        default:
        //            break;
        //    }
        //}
        #endregion
    }
}