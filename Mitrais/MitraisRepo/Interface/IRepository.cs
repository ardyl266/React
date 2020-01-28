using System.Data;
using System.Collections.Generic; 
using NPoco;
namespace MitraisRepo.Interface
{
    public interface IRepository<T>
    {
        //  List<T> GetAll();
         int Insert(string primaryKeyName, T entity);

        int Update(string primaryKeyName, T entity);

        int Delete(string primaryKeyName, object id);

        int Count(string where, params object[] args);

        O FindByCondition<O>(string where, params object[] args);

        List<T> FindAllByCondition (string where, params object[] args);

        // List<O> FindAllByCondition<O> (string where, params object[] args);

    }
}