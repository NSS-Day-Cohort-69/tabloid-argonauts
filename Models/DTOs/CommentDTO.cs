namespace Tabloid.Models.DTOs;

    public class CommentDTO
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfileDTO UserProfiile {get; set;}
        public int PostId { get; set; }
        public PostDTO Post {get; set;}
        public string Content { get; set; }
        public string Subject { get; set; }
        public DateTime DateOfComment { get; set; }
   
        
    }
