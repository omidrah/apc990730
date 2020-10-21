using System;
using System.Collections.Generic;
using System.Text;

namespace ActiveProbe.Domain.Enums
{
    public enum CommandStatus
    {
        SendFromServerToDevice,
        GetByDevice,
        RecieveFromDeviceToServer
    }
}
