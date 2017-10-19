using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Angular4WebApi.Controllers
{
    [ExcludeFromCodeCoverage]
    public class UploadController : ApiController
    {
        [HttpPost]
        public IHttpActionResult UploadFiles()
        {
            int i = 0;
            int cntSuccess = 0;
            var uploadedFileNames = new List<string>();
            string result = string.Empty;

            HttpResponseMessage response = new HttpResponseMessage();

            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[i];
                    var filePath = HttpContext.Current.Server.MapPath("~/UploadedFiles/" + postedFile.FileName);
                    try
                    {
                        postedFile.SaveAs(filePath);
                        uploadedFileNames.Add(httpRequest.Files[i].FileName);
                        cntSuccess++;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }

                    i++;
                }
            }

            result = cntSuccess.ToString() + " files uploaded succesfully.<br/>";

            result += "<ul>";

            foreach (var f in uploadedFileNames)
            {
                result += "<li>" + f + "</li>";
            }

            result += "</ul>";

            return Json(result);
        }
    }
}
