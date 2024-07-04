using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations.Schema;

namespace clients.api.Database.Entities
{
    public class Client
    {
        public int Id { get; set; }

        public string Firstname { get; set; } = string.Empty;

        public string Lastname { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;
    }

    public class ClientEntityTypeConfiguration : IEntityTypeConfiguration<Client>
    {
        public void Configure(EntityTypeBuilder<Client> builder)
        {
            builder
                .Property(c => c.Id)
                .IsRequired()
                .UseIdentityColumn(seed: 1, increment: 1);

            builder.HasKey(c => c.Id);
        }
    }
}
