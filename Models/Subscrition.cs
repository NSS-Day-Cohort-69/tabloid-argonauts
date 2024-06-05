using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;
 
 public class Subscription
    {
        [Required]
        public int CreatorId { get; set; }
       
        [Required]
        public int FollowerId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public  UserProfile Creator { get; set; }
        public UserProfile Follower { get; set; }
    }