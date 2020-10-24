using System;
namespace ActiveProbe.Services.Interfaces
{
    public interface ISecurityService
    {
        string GetSha256Hash(string input);
        Guid CreateCryptographicallySecureGuid();
    }
}
