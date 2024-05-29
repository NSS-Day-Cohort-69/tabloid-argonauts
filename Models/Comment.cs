using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Comment
    {
        public int Id { get; set; }
        [Required]
        public int UserProfileId { get; set; }
        [Required]
        public int PostId { get; set; }
        [Required]
        public string Content { get; set; }
        [Required]
        public string Subject { get; set; }
        public DateTime DateOfComment { get; set; }

        public virtual UserProfile UserProfile { get; set; }
        public virtual Post Post { get; set; }
    }
