using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

  public class Reaction
    {
        public int Id { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public int PostId { get; set; }
        [Required]
        public int UserProfileId { get; set; }

        public virtual Post Post { get; set; }
        public virtual UserProfile UserProfile { get; set; }
        public virtual List<PostReaction> PostReactions { get; set; }
    }