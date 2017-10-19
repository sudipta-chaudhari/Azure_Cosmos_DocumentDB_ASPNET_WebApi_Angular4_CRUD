using Newtonsoft.Json;

namespace Angular4WebApi.Models
{
    public class ProductJSON
    {
        //public int Id { get; set; }
        [JsonProperty(PropertyName ="id")]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
    }
}