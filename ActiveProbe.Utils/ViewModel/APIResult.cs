
namespace ActiveProbe.Utils.ViewModel
{
	//Hi omid
    public class APIResult<T>
    {
        public bool Succeed { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }

}
