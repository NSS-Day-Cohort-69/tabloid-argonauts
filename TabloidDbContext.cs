using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Tabloid.Models;


namespace Tabloid.Data
{
    public class TabloidDbContext : IdentityDbContext<IdentityUser>
    {
        private readonly IConfiguration _configuration;

        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<PostTag> PostTags { get; set; }
        public DbSet<PostReaction> postReactions { get; set; }

        public TabloidDbContext(DbContextOptions<TabloidDbContext> options, IConfiguration config) : base(options)
        {
            _configuration = config;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PostReaction>().HasKey(pr => new {pr.UserProfileId, pr.PostId, pr.ReactionId});
            modelBuilder.Entity<PostTag>().HasKey(pt => new {pt.PostId, pt.TagId});

            modelBuilder.Entity<PostReaction>()
            .HasOne(pr => pr.Post)
            .WithMany(p => p.PostReactions)
            .HasForeignKey(pr => pr.PostId);
            modelBuilder.Entity<PostReaction>()
            .HasOne(pr => pr.Reaction)
            .WithMany(r => r.PostReactions)
            .HasForeignKey(pr => pr.ReactionId);
            modelBuilder.Entity<PostReaction>()
            .HasOne(pr => pr.UserProfile)
            .WithMany(p => p.PostReactions)
            .HasForeignKey(pr => pr.UserProfileId);

            modelBuilder.Entity<PostTag>()
            .HasOne(pt => pt.Post)
            .WithMany(p => p.PostTags)
            .HasForeignKey(pt => pt.PostId);
            modelBuilder.Entity<PostTag>()
            .HasOne(pt => pt.Tag)
            .WithMany(t => t.PostTags)
            .HasForeignKey(pt => pt.TagId);

            
            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                Name = "Admin",
                NormalizedName = "admin"
            });

            
            modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser[]
            {
                new IdentityUser
                {
                    Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                    UserName = "Administrator",
                    Email = "admina@strator.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                    UserName = "JohnDoe",
                    Email = "john@doe.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                    UserName = "JaneSmith",
                    Email = "jane@smith.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                    UserName = "AliceJohnson",
                    Email = "alice@johnson.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                    UserName = "BobWilliams",
                    Email = "bob@williams.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
                new IdentityUser
                {
                    Id = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                    UserName = "EveDavis",
                    Email = "Eve@Davis.comx",
                    PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
                },
            });

           
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>[]
            {
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
                },
                new IdentityUserRole<string>
                {
                    RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
                    UserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df"
                },
            });

            
            modelBuilder.Entity<UserProfile>().HasData(new UserProfile[]
            {
                new UserProfile
                {
                    Id = 1,
                    IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
                    FirstName = "Admina",
                    LastName = "Strator",
                    ImageLocation = "https://robohash.org/numquamutut.png?size=150x150&set=set1",
                    IsActive = true,
                    CreateDateTime = new DateTime(2022, 1, 25)
                },
                new UserProfile
                {
                    Id = 2,
                    FirstName = "John",
                    LastName = "Doe",
                    CreateDateTime = new DateTime(2023, 2, 2),
                    ImageLocation = "https://robohash.org/nisiautemet.png?size=150x150&set=set1",
                    IsActive = true,
                    IdentityUserId = "d8d76512-74f1-43bb-b1fd-87d3a8aa36df",
                },
                new UserProfile
                {
                    Id = 3,
                    FirstName = "Jane",
                    LastName = "Smith",
                    CreateDateTime = new DateTime(2022, 3, 15),
                    ImageLocation = "https://robohash.org/molestiaemagnamet.png?size=150x150&set=set1",
                    IsActive = true,
                    IdentityUserId = "a7d21fac-3b21-454a-a747-075f072d0cf3",
                },
                new UserProfile
                {
                    Id = 4,
                    FirstName = "Alice",
                    LastName = "Johnson",
                    CreateDateTime = new DateTime(2023, 6, 10),
                    ImageLocation = "https://robohash.org/deseruntutipsum.png?size=150x150&set=set1",
                    IsActive = true,
                    IdentityUserId = "c806cfae-bda9-47c5-8473-dd52fd056a9b",
                },
                new UserProfile
                {
                    Id = 5,
                    FirstName = "Bob",
                    LastName = "Williams",
                    CreateDateTime = new DateTime(2023, 5, 15),
                    ImageLocation = "https://robohash.org/quiundedignissimos.png?size=150x150&set=set1",
                    IsActive = true,
                    IdentityUserId = "9ce89d88-75da-4a80-9b0d-3fe58582b8e2",
                },
                new UserProfile
                {
                    Id = 6,
                    FirstName = "Eve",
                    LastName = "Davis",
                    CreateDateTime = new DateTime(2022, 10, 18),
                    ImageLocation = "https://robohash.org/hicnihilipsa.png?size=150x150&set=set1",
                    IsActive = true,
                    IdentityUserId = "d224a03d-bf0c-4a05-b728-e3521e45d74d",
                }
            });

            
            modelBuilder.Entity<Category>().HasData(new Category[]
            {
                new Category { Id = 1, CategoryName = "Category 1" },
                new Category { Id = 2, CategoryName = "Category 2" },
                new Category { Id = 3, CategoryName = "Category 3" },
                new Category { Id = 4, CategoryName = "Category 4" },
                new Category { Id = 5, CategoryName = "Category 5" },
            });

          
            modelBuilder.Entity<Post>().HasData(new Post[]
            {
                new Post
                {
                    Id = 1,
                    Title = "Post 1",
                    HeaderImage = "https://via.placeholder.com/150",
                    Content = "Content for Post 1",
                    CreationDate = DateTime.Now,
                    PublicationDate = DateTime.Now,
                    CategoryId = 1,
                    UserProfileId = 1,
                    IsApproved = true
                },
                new Post
                {
                    Id = 2,
                    Title = "Post 2",
                    HeaderImage = "https://via.placeholder.com/150",
                    Content = "Content for Post 2",
                    CreationDate = DateTime.Now,
                    PublicationDate = DateTime.Now,
                    CategoryId = 2,
                    UserProfileId = 2,
                    IsApproved = true
                },
                new Post
                {
                    Id = 3,
                    Title = "Post 3",
                    HeaderImage = "https://via.placeholder.com/150",
                    Content = "Content for Post 3",
                    CreationDate = DateTime.Now,
                    PublicationDate = DateTime.Now,
                    CategoryId = 3,
                    UserProfileId = 3,
                    IsApproved = true
                },
                new Post
                {
                    Id = 4,
                    Title = "Post 4",
                    HeaderImage = "https://via.placeholder.com/150",
                    Content = "Content for Post 4",
                    CreationDate = DateTime.Now,
                    PublicationDate = DateTime.Now,
                    CategoryId = 4,
                    UserProfileId = 4,
                    IsApproved = true
                },
                new Post
                {
                    Id = 5,
                    Title = "Post 5",
                    HeaderImage = "https://via.placeholder.com/150",
                    Content = "Content for Post 5",
                    CreationDate = DateTime.Now,
                    PublicationDate = DateTime.Now,
                    CategoryId = 5,
                    UserProfileId = 5,
                    IsApproved = true
                },
            });

        
            modelBuilder.Entity<Tag>().HasData(new Tag[]
            {
                new Tag { Id = 1, TagName = "Tag 1" },
                new Tag { Id = 2, TagName = "Tag 2" },
                new Tag { Id = 3, TagName = "Tag 3" },
                new Tag { Id = 4, TagName = "Tag 4" },
                new Tag { Id = 5, TagName = "Tag 5" },
            });

            
            modelBuilder.Entity<Comment>().HasData(new Comment[]
            {
                new Comment
                {
                    Id = 1,
                    UserProfileId = 1,
                    PostId = 1,
                    Content = "Comment 1",
                    Subject = "Subject 1",
                    DateOfComment = DateTime.Now
                },
                new Comment
                {
                    Id = 2,
                    UserProfileId = 2,
                    PostId = 2,
                    Content = "Comment 2",
                    Subject = "Subject 2",
                    DateOfComment = DateTime.Now
                },
                new Comment
                {
                    Id = 3,
                    UserProfileId = 3,
                    PostId = 3,
                    Content = "Comment 3",
                    Subject = "Subject 3",
                    DateOfComment = DateTime.Now
                },
                new Comment
                {
                    Id = 4,
                    UserProfileId = 4,
                    PostId = 4,
                    Content = "Comment 4",
                    Subject = "Subject 4",
                    DateOfComment = DateTime.Now
                },
                new Comment
                {
                    Id = 5,
                    UserProfileId = 5,
                    PostId = 5,
                    Content = "Comment 5",
                    Subject = "Subject 5",
                    DateOfComment = DateTime.Now
                },
            });

           
            modelBuilder.Entity<Reaction>().HasData(new Reaction[]
            {
                new Reaction
                {
                    Id = 1,
                    Image = "https://cdn-icons-png.freepik.com/256/3702/3702712.png?semt=ais_hybrid",
                    Name = "Reaction 1"
                },
                new Reaction
                {
                    Id = 2,
                    Image = "https://www.shareicon.net/data/256x256/2017/06/05/886712_facebook_512x512.png",
                    Name = "Reaction 2",
                
                },
                new Reaction
                {
                    Id = 3,
                    Image = "https://cdn.iconscout.com/icon/free/png-256/free-like-2387659-1991059.png",
                    Name = "Reaction 3"
                },
                new Reaction
                {
                    Id = 4,
                    Image = "https://cdn.iconscout.com/icon/free/png-256/free-wow-2387663-1991062.png",
                    Name = "Reaction 4",
                },
                new Reaction
                {
                    Id = 5,
                    Image = "https://via.placeholder.com/150",
                    Name = "Reaction 5"
                },
            });

          
            modelBuilder.Entity<Subscription>().HasData(new Subscription[]
            {
                new Subscription
                {
                    Id = 1,
                    UserProfileId = 1,
                    FollowedUserId = 2,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(30)
                },
                new Subscription
                {
                    Id = 2,
                    UserProfileId = 2,
                    FollowedUserId = 3,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(30)
                },
                new Subscription
                {
                    Id = 3,
                    UserProfileId = 3,
                    FollowedUserId = 4,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(30)
                },
                new Subscription
                {
                    Id = 4,
                    UserProfileId = 4,
                    FollowedUserId = 5,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(30)
                },
                new Subscription
                {
                    Id = 5,
                    UserProfileId = 5,
                    FollowedUserId = 1,
                    StartDate = DateTime.Now,
                    EndDate = DateTime.Now.AddDays(30)
                },
            });
        }
    }
}
