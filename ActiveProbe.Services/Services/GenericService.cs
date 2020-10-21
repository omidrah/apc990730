using System;
using System.Collections.Generic;
using System.Linq;
using ActiveProbe.DataLayer.Context;
using ActiveProbe.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ActiveProbe.Services.Services
{
  
    public class GenericService<TEntity>:IGenericService<TEntity>  where TEntity:class
    {
        protected IUnitOfWork _uow;   
        protected DbSet<TEntity> _tEntities;
        public GenericService(IUnitOfWork uow)
        {
            _uow = uow;
            _tEntities = _uow.Set<TEntity>();
        }
        public virtual TEntity Add(TEntity entity)
        {
            return   _tEntities.Add(entity).Entity;
        }
        public void Delete(TEntity entity)
        {
            _tEntities.Remove(entity);
        }
        public void Delete(IList<TEntity> entity)
        {
            _tEntities.RemoveRange(entity);
        }
        public TEntity Find(Func<TEntity, bool> predicate)
        {
           return  _tEntities.Where(predicate).FirstOrDefault();
        }       
        public IList<TEntity> GetAll()
        {
            return _tEntities.ToList();
        }
        public IList<TEntity> GetAll(Func<TEntity, bool> predicate)
        {
            return _tEntities.Where(predicate).ToList();
        }
        public IList<TEntity> GetAllByPages(int pageNumbers, int recordPerPage)
        {
            return 
            _tEntities.Skip(pageNumbers).Take(recordPerPage).ToList();
        }
        
        #region IDisposable Members
        public void Dispose()
        {
            // ToDo :: Mostafa :: Ask rahimi for what
            //throw new Exception();
        }

        #endregion
    }
}