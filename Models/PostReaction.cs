namespace Tabloid.Models;
public class PostReaction
{
    public int UserProfileId { get; set; }
    public int PostId { get; set; }
    public int ReactionId { get; set; }

    public virtual UserProfile UserProfile { get; set; }
    public virtual Post Post { get; set; }
    public virtual Reaction Reaction { get; set; }
}