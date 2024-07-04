using clients.api.Database;
using clients.api.Interfaces;
using clients.api.Models;
using Microsoft.EntityFrameworkCore;

namespace clients.api.Services
{
    public class ClientService : IClientService
    {
        private readonly ClientsContext _dbContext;

        public ClientService(ClientsContext db)
        {
            _dbContext = db;
        }

        public async Task<ClientResponse> GetAllAsync(int page, int pageSize)
        {
            var queryResult = new ClientResponse
            {
                Page = page,
                Limit = pageSize,
                Total = await GetTotalRecordsAsync()
            };
            var query = await _dbContext.Clients.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
            queryResult.Data = query;
            queryResult.Data.ForEach(i => { i.Phone = i.Phone.Replace(" ", ""); });
            return queryResult;
        }

        public async Task<ClientResponse> GetAllFromSPAsync(int page, int pageSize)
        {
            var queryResult = new ClientResponse
            {
                Page = page,
                Limit = pageSize,
                Total = await GetTotalRecordsAsync(),
                Data = await _dbContext.SpGetAllClients(page, pageSize)
            };
            queryResult.Data.ForEach(i => { i.Phone = i.Phone.Replace(" ", ""); });
            return queryResult;
        }

        private async Task<int> GetTotalRecordsAsync() 
        {
            return await _dbContext.Clients.CountAsync();
        }
    }
}
