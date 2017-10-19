using System;
using System.Collections.Generic;
using System.Linq;
using Angular4WebApi.DBModel;
using Angular4WebApi.Models;
using System.Diagnostics.CodeAnalysis;

namespace Angular4WebApi.Repositories
{
    [ExcludeFromCodeCoverage]
    public class ProductRepository //: IProductRepository
    {
        //private readonly InventoryEntities _context;
        //public ProductRepository()
        //{
        //    _context = new InventoryEntities();
        //}
        //public bool Delete(int id)
        //{
        //    using (var ctx = new InventoryEntities())
        //    {
        //        Product products = ctx.Product.Find(id);
        //        ctx.Product.Remove(products);

        //        int rowsAffected = ctx.SaveChanges();

        //        return rowsAffected > 0 ? true : false;
        //    }
        //}
        //public IList<ProductJSON> GetProducts()
        //{
        //    IQueryable<ProductJSON> products = _context.Product.Select(
        //            p => new ProductJSON
        //            {
        //                Id = p.Id,
        //                Name = p.Name,
        //                Category = p.Category,
        //                Price = p.Price
        //            });
        //    return products.ToList();
        //}
        //public bool AddProduct(ProductJSON product)
        //{
        //    if (product == null)
        //    {
        //        throw new ArgumentNullException("product");
        //    }

        //    Product newProduct = new Product();

        //    try
        //    {
        //        newProduct.Name = product.Name;
        //        newProduct.Category = product.Category;
        //        newProduct.Price = product.Price;
        //        _context.Product.Add(newProduct);
        //        int rowsAffected = _context.SaveChanges();

        //        return rowsAffected > 0 ? true : false;
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //}
        //public bool UpdateProduct(ProductJSON p)
        //{
        //    if (p == null)
        //    {
        //        throw new ArgumentNullException("product");
        //    }

        //    using (var ctx = new InventoryEntities())
        //    {
        //        var product = _context.Product.Single(a => a.Id == p.Id);
                
        //        if (product != null)
        //        {
        //            product.Name = p.Name;
        //            product.Category = p.Category;
        //            product.Price = p.Price;

        //            int rowsAffected = _context.SaveChanges();

        //            return rowsAffected > 0 ? true : false;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //}
    }
}