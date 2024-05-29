namespace Tabloid.Models.DTOs;

    public class ReactionDTO
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public int PostId { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile {get; set;}
    }
