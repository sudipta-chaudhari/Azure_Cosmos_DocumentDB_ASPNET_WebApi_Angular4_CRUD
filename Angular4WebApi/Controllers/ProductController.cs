using Angular4WebApi.DBModel;
using Angular4WebApi.Models;
using Angular4WebApi.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using Microsoft.Azure.Documents;
using System;

namespace Angular4WebApi.Controllers
{
    public class ProductController : ApiController
    {
        #region GlobalVariables
        private IProductRepository _repository;
        private readonly InventoryEntities _context;
        #endregion

        #region C'tor
        public ProductController()
        {
            //_context = new InventoryEntities();
            //_repository = new ProductRepository();
        }
        //public ProductController(IProductRepository repository)
        //{
        //    _context = new InventoryEntities();

        //    if (repository == null)
        //    {
        //        _repository = new ProductRepository();
        //    }
        //    else
        //    {
        //        _repository = repository;
        //    }
        //}
        #endregion

        #region API Methods
        [Route("api/Product/GetProductsAsync")]
        public async Task<IEnumerable<ProductJSON>> GetProductsAsync()
        {
            return await DocumentDBRepository<ProductJSON>.GetItemsAsync(p => p.Id != string.Empty);
        }
        [Route("api/Product/GetProductAsync")]
        //api/Product/GetProductAsync/?id=ae270000-895a-5dbb-680f-20c68097789d
        //api/Product/GetProductAsync/?id=b89bd472-2b66-5c83-0712-7f25dafba0c3
        public async Task<ProductJSON> GetProductAsync([FromUri]string id)
        {
            return await DocumentDBRepository<ProductJSON>.GetItemAsync(id);
        }
        [HttpPost]
        [Route("api/Product/CreateItemAsync")]
        /*
        {
	        "Name":"N3", 
	        "Category":"C3",
	        "Price": 33
        }
        */
        public async Task<Document> CreateItemAsync([FromBody]object content)
        {
            ProductJSON product = new ProductJSON();
            product = JsonConvert.DeserializeObject<ProductJSON>(content.ToString());

            return await DocumentDBRepository<ProductJSON>.CreateItemAsync(product);
        }
        [HttpGet]
        [Route("api/Product/DeleteItemAsync")]
        //api/Product/DeleteItemAsync/?id=b89bd472-2b66-5c83-0712-7f25dafba0c3
        public async Task<bool> DeleteItemAsync([FromUri]string id)
        {
            try
            {
                var result = await DocumentDBRepository<ProductJSON>.DeleteItemAsync(id);

                return true;
            }
            catch (Exception)
            {
                return false;
            }       
        }
        [HttpPost]
        [Route("api/Product/UpdateItemAsync")]
        //api/Product/UpdateItemAsync/?id=ae270000-895a-5dbb-680f-20c68097789d
        //Post Body : 
        /*{
	        "Name":"N11", 
	        "Category":"C11",
	        "Price": 111
        }*/
        public async Task<Document> UpdateItemAsync([FromUri]string id,[FromBody] object content)
        {
            ProductJSON product = new ProductJSON();
            product = JsonConvert.DeserializeObject<ProductJSON>(content.ToString());
            product.Id = id;

            return await DocumentDBRepository<ProductJSON>.UpdateItemAsync(id,product);
        }
        //// POST api/<controller>
        ////public Product Post([FromBody]Product product)
        ////{
        ////    return _repository.Post(product);
        ////}
        //[Route("api/Product/AddProduct")]
        //[HttpPost]
        ///*
        // {
        // "Name":"Milk",
        // "Category":"Dairy",
        // "Price":44
        // }
        //*/
        //public bool AddProduct([FromBody]ProductJSON product)
        //{
        //    return _repository.AddProduct(product);
        //}
        //[Route("api/Product/UpdateProduct")]
        //[HttpPost]
        ////POST:api/Product/UpdateProduct
        //public bool UpdateProduct([FromBody]ProductJSON p)
        //{
        //    return _repository.UpdateProduct(p);
        //}
        //// DELETE api/<controller>/5
        //public bool Delete(int id)
        //{
        //    return _repository.Delete(id);
        //}
        #endregion
    }
}