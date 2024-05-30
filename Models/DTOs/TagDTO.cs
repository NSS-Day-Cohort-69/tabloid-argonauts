namespace Tabloid.Models.DTOs;

    public class TagDTO
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        public virtual List<PostTagDTO> PostTags { get; set; }

    }

