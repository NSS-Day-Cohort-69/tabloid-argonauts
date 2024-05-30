namespace Tabloid.Models.DTOs;
public class PostReactionDTO
{
    public int UserProfileId { get; set; }
    public int PostId { get; set; }
    public int ReactionId { get; set; }

    public UserProfileDTO userProfile { get; set; }
    public PostDTO Post { get; set; }
    public ReactionDTO Reaction { get; set; }
}