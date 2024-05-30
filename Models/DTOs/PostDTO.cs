namespace Tabloid.Models.DTOs;

    public class PostDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string HeaderImage { get; set; }
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime PublicationDate { get; set; }
        public int CategoryId { get; set; }
        public Category Category {get; set;}
        public int UserProfileId { get; set; }
        public UserProfile UserProfile {get; set;}
        public bool IsApproved { get; set; }
         public virtual List<PostReactionDTO> PostReactions { get; set; }
        public virtual List<PostTagDTO> PostTags { get; set; }
        public virtual List<TagDTO> Tags { get; set; }
    }
