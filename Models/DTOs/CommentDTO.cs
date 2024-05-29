namespace Tabloid.Models.DTOs;

    public class CommentDTO
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfiile {get; set;}
        public int PostId { get; set; }
        public Post Post {get; set;}
        public string Content { get; set; }
        public string Subject { get; set; }
        public DateTime DateOfComment { get; set; }
    }
