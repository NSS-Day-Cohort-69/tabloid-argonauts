namespace Tabloid.Models.DTOs;

    public class SubscriptionDTO
    {
        public int CretorId { get; set; }
        public int FollowerId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public UserProfileDTO CreatorProfile {get; set;}
        public UserProfileDTO Follower {get; set;}
    }
