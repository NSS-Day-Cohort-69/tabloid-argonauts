using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models;

public class Post
    {
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        public string HeaderImage { get; set; }
        [Required]
        public string Content { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime PublicationDate { get; set; }
        public int CategoryId { get; set; }
        public int UserProfileId { get; set; }
        public bool IsApproved { get; set; }
        public virtual Category Category { get; set; }
        public virtual UserProfile UserProfile { get; set; }
        public virtual List<Comment> Comments { get; set; }
        public virtual List<PostReaction> PostReactions { get; set; }
        public virtual List<PostTag> PostTags { get; set; }
        public virtual List<Tag> Tags { get; set; }
         public double ReadTimeInMinutes
        {
            get
            {
                const int wordsPerMinute = 265;
                int wordCount = Content.Split(new char[] { ' ', '.', ',', '?', '!', '-' }, StringSplitOptions.RemoveEmptyEntries).Length;
                return (double)wordCount / wordsPerMinute;
            }
        }
    }