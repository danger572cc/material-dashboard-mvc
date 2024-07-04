using clients.api.Database.Entities;

namespace clients.api.Models
{
    public class ClientResponse
    {
        public List<Client> Data { get; set; }
        public int Limit { get; set; }
        public int Page { get; set; }
        public int Total { get; set; }

        public ClientResponse()
        {
            Data = new List<Client>();
        }
    }
}
