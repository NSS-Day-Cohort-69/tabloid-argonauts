using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;
 
 public class Subscription
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
       
        [Required]
        public int FollowedUserId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public  UserProfile UserProfile { get; set; }
        public UserProfile FollowedUser { get; set; }
    }