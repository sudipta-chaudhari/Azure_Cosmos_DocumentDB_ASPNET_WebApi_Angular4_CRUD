using System;
using System.Diagnostics.CodeAnalysis;
using System.Drawing.Imaging;
using System.IO;
using System.Net.Http;
using System.Web.Http;
using ZXing;
using ZXing.Common;

namespace Angular4WebApi.Controllers
{
    [ExcludeFromCodeCoverage]
    public class QRCodeController : ApiController
    {
        [HttpGet]
        //GET:api/QRCode/GetQRCode/?content="www.google.com"&alt="QR Code"&height=200&width=200&margin=0
        public string GetQRCode(string content, string alt = "QR Code", int height = 500, int width = 500, int margin = 0)
        {
            HttpResponseMessage result = new HttpResponseMessage();
            string qrResult = GenerateQRCode(content, alt, height, width, 0);

            return qrResult;
        }
        public static string GenerateQRCode(string url, string alt = "QR code", int height = 500, int width = 500, int margin = 0)
        {
            var qrWriter = new BarcodeWriter()
            {
                Format = BarcodeFormat.QR_CODE,
                Options = new EncodingOptions() { Height = height, Width = width, Margin = margin }
            };

            using (var q = qrWriter.Write(url))
            {
                using (var ms = new MemoryStream())
                {
                    q.Save(ms, ImageFormat.Png);
                    return Convert.ToBase64String(ms.ToArray());
                }
            }
        }
    }
}