namespace Tabloid.Models.DTOs;

    public class UserProfileDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string ImageLocation { get; set; }
        public bool IsActivated { get; set; }
        public virtual List<PostReactionDTO> PostReactions { get; set; }
        public bool IsActive { get; set; }
         public List<Subscription> Subscriptions { get; set; }
     public List<Subscription> Subscribers { get; set; }
    }
