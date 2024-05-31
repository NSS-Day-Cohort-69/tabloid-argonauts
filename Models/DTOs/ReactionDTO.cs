namespace Tabloid.Models.DTOs;

    public class ReactionDTO
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public virtual List<PostReactionDTO> PostReactions { get; set; }

    }
