using ActiveProbe.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ActiveProbe.Utils.ViewModel;
using Microsoft.Extensions.Options;

namespace ActiveProbeCore.HostedService
{
    internal class TimedHostedService : IHostedService, IDisposable
    {
        private readonly ILogger _logger;
        private IServiceScopeFactory _provider;
        private readonly ConfigurationsVm _config;

        private Timer _connectionHistoryTimer;
        private Timer _notificationTimer;

        public TimedHostedService(ILogger<TimedHostedService> logger, IServiceScopeFactory provider, IOptions<ConfigurationsVm> config)
        {
            _logger = logger;
            _provider = provider;

            _config = config.Value;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {

            if (_config.Properties.HistoryDeleteActive)
            {
                _logger.LogInformation("Timed Background Service is starting.");
                _connectionHistoryTimer = new Timer(DeleteOldConnectionHistory, null, TimeSpan.Zero,
                    TimeSpan.FromSeconds(_config.Properties.HistoryDeleteInterval));
            }

            if (_config.Properties.PushNotificationActive)
            {
                _logger.LogInformation("----------------------------------------------------------------PushNotificationTimed Background Service is starting.");
                _notificationTimer = new Timer(PushNotification, null, TimeSpan.Zero,
                    TimeSpan.FromSeconds(_config.Properties.PushNotificationInterval));
            }

            return Task.CompletedTask;
        }

        private async void DeleteOldConnectionHistory(object state)
        {
            var result = await _provider.CreateScope().ServiceProvider.GetRequiredService<IMachineConnectionHistoryService>().DeleteOldData().ConfigureAwait(false);
            if (result.Succeed)
                _logger.LogInformation("Delete Old MachineConnectionHistory Date ----------------------------------------------");

            else
                _logger.LogInformation("server error ::---------------------------------------------->> " + result.Message);
        }

        private async void PushNotification(object state) {

            var result = await _provider.CreateScope().ServiceProvider.GetRequiredService<INotificationService>().PushNotification().ConfigureAwait(false);
            if (result.Succeed)
                _logger.LogInformation("PushNotification ----------------------------------------------");

            else
                _logger.LogInformation("server error ::---------------------------------------------->> " + result.Message);

        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            if (_config.Properties.HistoryDeleteActive)
            {
                _logger.LogInformation("---------------------------------------------------------------------------Timed Background Service is stopping.");
                _connectionHistoryTimer?.Change(Timeout.Infinite, 0);
            }

            if (_config.Properties.PushNotificationActive)
            {
                _logger.LogInformation("----------------------------------------------------------------PushNotificationTimed Background Service is stopping.");
                _notificationTimer?.Change(Timeout.Infinite, 0);
            }

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _connectionHistoryTimer?.Dispose();
            _notificationTimer?.Dispose();
        }
    }
}
