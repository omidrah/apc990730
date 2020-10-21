using System;
using System.Collections.Generic;
using System.Text;

namespace ActiveProbe.Domain.Enums
{
    public enum FunctionType
    {
        Min = 0,
        Max = 1,
        Sum = 2,
        Count = 3,
        First = 4,
        Last = 5,
        Avgrage = 6,

        // ToDo :: Mostafa :: Ask from dr.Vahidpour :: Mean or median 
        Mean = 7 
    }
}
