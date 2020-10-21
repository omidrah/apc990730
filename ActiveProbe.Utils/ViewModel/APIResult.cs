
namespace ActiveProbe.Utils.ViewModel
{
    public class APIResult<T>
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }

}
