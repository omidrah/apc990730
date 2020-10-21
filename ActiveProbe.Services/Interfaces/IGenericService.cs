using System;
using System.Collections.Generic;

namespace ActiveProbe.Services.Interfaces
{
  public interface IGenericService<T>: IDisposable where T : class
    {        
        T Add(T entity);
        //void Update(T entity);
        void Delete(T entity);
        void Delete(IList<T> entity);
        T Find(Func<T, bool> predicate);       
        IList<T> GetAll();
        IList<T> GetAll(Func<T, bool> predicate);
        IList<T> GetAllByPages(int pageNumbers,int recordPerPage);
    }
}