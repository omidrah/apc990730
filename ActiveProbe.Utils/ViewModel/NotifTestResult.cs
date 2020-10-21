using System;
using System.Collections.Generic;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace ActiveProbe.Utils.ViewModel
{
    public class NotifTestResult
    {
        public double Double { get; set; }
        public double? NullableDouble { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime? NullableCreateDate { get; set; }

    }

    public enum Type { 
        Int=1,
        NullableInt = 2,
        Double =3,
        NullableDouble = 4,

        DateTime =5,
        NullableDateTime = 6,
    }
}
