namespace Tabloid.Models.DTOs;

    public class UserProfileDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime CreateDateTime { get; set; }
        public string ImageLocation { get; set; }
        public bool IsActivated { get; set; }
    }