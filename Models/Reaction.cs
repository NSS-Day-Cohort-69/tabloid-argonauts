using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

  public class Reaction
    {
        public int Id { get; set; }
        [Required]
        public string Image { get; set; }
        [Required]
        public string Name { get; set; }

        public virtual List<PostReaction> PostReactions { get; set; }
    }