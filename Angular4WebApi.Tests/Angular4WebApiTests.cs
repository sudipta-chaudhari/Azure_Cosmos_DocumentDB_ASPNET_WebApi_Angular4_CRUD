using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Angular4WebApi.Repositories;
using Angular4WebApi.Models;
using System.Collections.Generic;
using System.Linq;
using Angular4WebApi.Controllers;

namespace Angular4WebApi.Tests
{
    /// <summary>
    /// Unit Test for Angular4WebApi project's Web Api Controller's Repository methods using MoQ
    /// </summary>
    [TestClass]
    public class Angular4WebApiTests
    {
        //List<ProductJSON> expectedProducts;
        //Mock<IProductRepository> mockProductRepository;
        //ProductController productController;

        //[TestInitialize]
        //public void InitializeTestData()
        //{
        //    //Setup test data
        //    expectedProducts = GetExpectedProducts();
        //    //Arrange
        //    mockProductRepository = new Mock<IProductRepository>();
        //    productController = new ProductController(mockProductRepository.Object);

        //    //Setup
        //    mockProductRepository.Setup(m => m.GetProducts()).Returns(expectedProducts);

        //    mockProductRepository.Setup(m => m.AddProduct(It.IsAny<ProductJSON>())).Returns(
        //        (ProductJSON target) =>
        //        {
        //            expectedProducts.Add(target);

        //            return true;
        //        });

        //    mockProductRepository.Setup(m => m.UpdateProduct(It.IsAny<ProductJSON>())).Returns(
        //       (ProductJSON target) =>
        //       {
        //           var product = expectedProducts.Where(p => p.Id == target.Id).FirstOrDefault();

        //           if (product == null)
        //           {
        //               return false;
        //           }

        //           product.Name = target.Name;
        //           product.Category = target.Category;
        //           product.Price = target.Price;

        //           return true;
        //       });

        //    mockProductRepository.Setup(m => m.Delete(It.IsAny<int>())).Returns(
        //       (int productId) =>
        //       {
        //           var product = expectedProducts.Where(p => p.Id == productId).FirstOrDefault();

        //           if (product == null)
        //           {
        //               return false;
        //           }

        //           expectedProducts.Remove(product);

        //           return true;
        //       });
        //}

        //[TestMethod]
        //public void Get_All_Products()
        //{
        //    //Act
        //    //var actualProducts = mockProductRepository.Object.GetProducts();
        //    var actualProducts = productController.GetProductsAsync();

        //    //Assert
        //    Assert.AreSame(expectedProducts, actualProducts);
        //}
        //[TestMethod]
        //public void Add_Product()
        //{
        //    //int productCount = mockProductRepository.Object.GetProducts().Count;
        //    int productCount = productController.GetProductsAsync().Count;

        //    Assert.AreEqual(2, productCount);

        //    //Prepare
        //    ProductJSON newProduct = GetNewProduct("N3", "C3", 33.55M);
        //    //Act
        //    //mockProductRepository.Object.AddProduct(newProduct);
        //    productController.AddProduct(newProduct);

        //    //productCount = mockProductRepository.Object.GetProducts().Count;
        //    productCount = productController.GetProductsAsync().Count;
        //    //Assert
        //    Assert.AreEqual(3, productCount);
        //}
        //[TestMethod]
        //public void Update_Product()
        //{
        //    ProductJSON product = new ProductJSON()
        //    {
        //        Id = 2,
        //        Name = "N22",//Changed Name
        //        Category = "P2",
        //        Price = 22
        //    };

        //    //mockProductRepository.Object.UpdateProduct(product);
        //    productController.UpdateProduct(product);

        //    // Verify the change
        //    //Assert.AreEqual("N22", mockProductRepository.Object.GetProducts()[1].Name);
        //    Assert.AreEqual("N22", productController.GetProductsAsync()[1].Name);
        //}
        //[TestMethod]
        //public void Delete_Product()
        //{
        //    //Assert.AreEqual(2, mockProductRepository.Object.GetProducts().Count);
        //    Assert.AreEqual(2, productController.GetProductsAsync().Count);

        //    //mockProductRepository.Object.Delete(1);
        //    productController.Delete(1);

        //    // Verify the change
        //    //Assert.AreEqual(1, mockProductRepository.Object.GetProducts().Count);
        //    Assert.AreEqual(1, productController.GetProductsAsync().Count);
        //}

        //[TestCleanup]
        //public void CleanUpTestData()
        //{
        //    expectedProducts = null;
        //    mockProductRepository = null;
        //}

        //#region HelperMethods
        //private static List<ProductJSON> GetExpectedProducts()
        //{
        //    return new List<ProductJSON>()
        //    {
        //        new ProductJSON()
        //        {
        //            Id = 1,
        //            Name = "N1",
        //            Category = "C1",
        //            Price = 11
        //        },
        //        new ProductJSON()
        //        {
        //            Id = 2,
        //            Name = "N2",
        //            Category = "C2",
        //            Price = 22
        //        }
        //    };
        //}
        //private static ProductJSON GetNewProduct(string name, string category, decimal price)
        //{
        //    return new ProductJSON()
        //    {
        //        Name = name,
        //        Category = category,
        //        Price = price
        //    };
        //}
        //#endregion
    }
}
