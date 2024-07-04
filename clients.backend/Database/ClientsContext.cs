using clients.api.Database.Entities;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace clients.api.Database
{
    public partial class ClientsContext : DbContext
    {
        public ClientsContext(DbContextOptions <ClientsContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Client> Clients { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            new ClientEntityTypeConfiguration().Configure(modelBuilder.Entity<Client>());

            OnModelCreatingPartial(modelBuilder);
        }

        public async Task<List<Client>> SpGetAllClients(int page, int size)
        {
            var pageParam = new SqlParameter("@page", SqlDbType.Int);
            pageParam.Value = page;

            var sizeParam = new SqlParameter("@size", SqlDbType.Int);
            sizeParam.Value = size;

            var data = await this.Clients
                .FromSqlInterpolated($"EXEC GetAllClients @page={pageParam},@size={sizeParam}")
                .ToListAsync();
            return data;
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}