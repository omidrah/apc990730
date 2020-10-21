using System;
using System.Collections.Generic;

namespace ActiveProbe.Domain.Models
{
    public partial class TestType
    {
        public TestType()
        {
            DefinedTest = new HashSet<DefinedTest>();
        }

        public short Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<DefinedTest> DefinedTest { get; set; }
    }
}
