using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.Extensions.Options;
using MitraisRepo.Model;
using NPoco;


namespace MitraisRepo.Interface
{
    public class BaseRepository<T> : IRepository<T>
    {
        private string tName = typeof(T).Name;  
        
        //Connection Object  
        private IOptions<DBStringModel> settings;
        private IDatabase connection;

        public BaseRepository(IOptions<DBStringModel> settings)
        {
            this.settings = settings;
            connection = new Database(settings.Value._connString, DatabaseType.SqlServer2012, SqlClientFactory.Instance);
        }
               
        public List<T> FindAllByCondition(string where, params object[] args)
        {
            try
            {
                return connection.Fetch<T>(where, args);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }

        public virtual O FindByCondition<O>(string where, params object[] args)
        {
            try
            {
                return connection.SingleOrDefault<O>(where, args);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }
        
        public virtual T FindByCondition(string where, params object[] args)
        {
            try
            {
                string query = "";
                if (where.ToLower().Contains("select"))
                    query = where;
                else
                    query = "select * from [" + tName + "] " + where;

                return connection.SingleOrDefault<T>(query, args);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }

        public virtual List<T> DoSqlQuery(string query, params object[] args)
        {
            try
            {                              

                return connection.Fetch<T>(query, args);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message.ToString());
            }
        }

        public int Insert(string primaryKeyName, T entity)
        {
            int output = 0;
            try
            {
                connection.Insert<T>(tName, primaryKeyName, true, entity);
            }
            catch (Exception ex)
            {
                output = -1;
                throw ex;
                
            }
            return output;
        }

        public int Update(string primaryKeyName, T entity)
        {
            int output = 0;
            try
            {
                output = connection.Update(tName, primaryKeyName, entity);
            }
            catch (Exception ex)
            {
                output = -1;
                throw new Exception(ex.Message.ToString());
            }
            return output;
        }

         public int Count(string where, params object[] args)
        {
            throw new NotImplementedException();
        }

        public int Delete(string primaryKeyName, object id)
        {
            int output = 0;
            try
            {
                T obj = connection.FirstOrDefault<T>("where " + tName + "Id=@0", id.ToString());
                if (obj != null)
                {
                    output = connection.Delete<T>(id);
                }
            }
            catch (Exception ex)
            {
                output = -1;
                throw new Exception(ex.Message.ToString());
            }
            return output;
        }
    }
}