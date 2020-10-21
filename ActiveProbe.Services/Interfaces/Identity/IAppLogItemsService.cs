﻿using System;
using System.Threading.Tasks;
using ActiveProbe.Utils.ViewModel.Identity;

namespace ActiveProbe.Services.Interfaces
{
    public interface IAppLogItemsService
    {
        Task DeleteAllAsync(string logLevel = "");
        Task DeleteAsync(int logItemId);
        Task DeleteOlderThanAsync(DateTime cutoffDateUtc, string logLevel = "");
        Task<int> GetCountAsync(string logLevel = "");
        Task<PagedAppLogItemsViewModel> GetPagedAppLogItemsAsync(int pageNumber, int pageSize, SortOrder sortOrder, string logLevel = "");
    }
}