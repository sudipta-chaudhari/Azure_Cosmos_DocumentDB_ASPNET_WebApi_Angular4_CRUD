using Angular4WebApi.Models;
using System.Collections.Generic;

namespace Angular4WebApi.Repositories
{
    public interface IProductRepository
    {
        IList<ProductJSON> GetProducts();
        bool AddProduct(ProductJSON product);
        bool UpdateProduct(ProductJSON p);
        bool Delete(int id);
    }
}
