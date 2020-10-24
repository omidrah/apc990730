using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ActiveProbe.Utils.ViewModel
{
    public class Token
    {
        [JsonPropertyName("refreshToken")]
        [Required]
        public string RefreshToken { get; set; }
    }
}
