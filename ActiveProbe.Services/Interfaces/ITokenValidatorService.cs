using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ActiveProbe.Services.Interfaces
{
    public interface ITokenValidatorService
    {
        Task ValidateAsync(TokenValidatedContext context);
    }
}
