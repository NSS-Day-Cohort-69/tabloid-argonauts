namespace Tabloid.Models.DTOs;

    public class PostTagDTO
    {
        public int PostId { get; set; }
        public int TagId { get; set; }
        public Post Post {get; set;}
        public Tag Tag {get; set;}
    }
