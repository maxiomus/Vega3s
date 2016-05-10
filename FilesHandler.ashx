<%@ WebHandler Language="C#" Class="FilesHandler" %>

using System;
using System.IO;
using System.Web;
using System.Linq;
using Ionic.Zip;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using Bluprint;
using Bluprint.Data;

public class FilesHandler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context)
    {
        HttpResponse response = context.Response;
        HttpRequest request = context.Request;        
                
        string items = string.Empty;
        if (!string.IsNullOrEmpty(request["items"]))
        {
            items = request["items"].ToString();
        }

        JArray ja = JArray.Parse(items);
        int[] ids = ja.Select(t => (int)t).ToArray();

        var media = (from m in Accessing.DBContext.BLPTMedias
                     where ids.Contains(m.ID)
                     select String.Concat(m.F_LINK, m.F_LOCATION, m.F_EXT).Replace("DLIB/", "").Replace("/", "\\"));

        using (ZipFile zip = new ZipFile())
        {
            foreach (var fileName in media)
            {
                string filePath = Path.Combine(FileUtilities.GetFilePath("~/DLIB"), fileName);
                FileInfo fileInfo = new FileInfo(filePath);

                if (!fileInfo.Exists)
                {
                    throw new Exception("Error!");
                }

                zip.AddFile(filePath, "");
            }

            zip.Save(response.OutputStream);                
        }

        response.Clear();
        response.ContentType = "application/zip";
        
        response.AppendHeader("content-disposition", "attachment; filename=downloadedFiles.zip");
        response.End();
    }
 
    public bool IsReusable
    {
        get {
            return false;
        }
    }

}