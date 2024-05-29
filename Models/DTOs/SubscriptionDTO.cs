namespace Tabloid.Models.DTOs;

    public class SubscriptionDTO
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int FollowedUserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public UserProfile UserProfile {get; set;}
        public UserProfile FollowedUser {get; set;}
    }
