using clients.api.Database.Entities;
using clients.api.Models;

namespace clients.api.Interfaces
{
    public interface IClientService
    {
        Task<ClientResponse> GetAllAsync(int page, int pageSize);

        Task<ClientResponse> GetAllFromSPAsync(int page, int pageSize);
    }
}
