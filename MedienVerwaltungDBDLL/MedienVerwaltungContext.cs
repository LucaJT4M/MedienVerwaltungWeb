using MedienVerwaltungDLL.Models.Actor;
using MedienVerwaltungDLL.Models.Book;
using MedienVerwaltungDLL.Models.Interpret;
using MedienVerwaltungDLL.Models.Item;
using MedienVerwaltungDLL.Models.Movie;
using MedienVerwaltungDLL.Models.MusicAlbum;
using MedienVerwaltungDLL.Models.Song;
using Microsoft.EntityFrameworkCore;

namespace MedienVerwaltungDBDLL;

public partial class MedienVerwaltungContext : DbContext
{
    public MedienVerwaltungContext(DbContextOptions<MedienVerwaltungContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Actor> Actors { get; set; }
    public virtual DbSet<Book> Books { get; set; }
    public virtual DbSet<Interpret> Interprets { get; set; }
    public virtual DbSet<Item> Items { get; set; }
    public virtual DbSet<Movie> Movies { get; set; }
    public virtual DbSet<MusicAlbum> MusicAlbums { get; set; }
    public virtual DbSet<Song> Songs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ConnectionStrings:DefConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Actor>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_AllActors");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.MovieIds).HasColumnName("MovieIDs");
        });

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(e => e.Isbn);

            entity.Property(e => e.Isbn).HasColumnName("ISBN");
            entity.Property(e => e.InterpretId).HasColumnName("InterpretID");
        });

        modelBuilder.Entity<Interpret>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
        });

        modelBuilder.Entity<Item>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_AllItems");

            entity.Property(e => e.Id).HasColumnName("ID");
        });

        modelBuilder.Entity<Movie>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.ActorIDs).HasColumnName("ActorIDs");
        });

        modelBuilder.Entity<MusicAlbum>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.InterpretId).HasColumnName("InterpretID");
        });

        modelBuilder.Entity<Song>(entity =>
        {
            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.InterpretId).HasColumnName("InterpretID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
