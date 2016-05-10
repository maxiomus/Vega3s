<%@ WebHandler Language="C#" Class="PDFHandler" %>

using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Web;
using System.Web.SessionState;
using System.IO;

public class PDFHandler : IHttpHandler, IReadOnlySessionState
{

    public void ProcessRequest(HttpContext context)
    {
        HttpResponse response = context.Response;
        HttpRequest request = context.Request;

        response.Clear();

        int index = 0;
        if (!string.IsNullOrEmpty(request["index"]))
        {
            index = int.Parse(request["index"]);
        }

        DateTime dt = new DateTime();
        if (!string.IsNullOrEmpty(request["date"]))
        {
            dt = DateTime.Parse(request["date"]);
        }

        string filename = string.Empty;
        if (!string.IsNullOrEmpty(request["file"]))
        {
            filename = request["file"].ToString();
        }

        WriteImage(response, index, dt, filename);

        response.Flush();
        response.Close();

    }

    private void WriteImage(HttpResponse response, int index, DateTime dt, string filename)
    {
        using (MemoryStream imageStream = ReadFile(dt, string.Concat(filename, filename.Contains(".pdf") ? "" : ".pdf")))
        {
            if (imageStream != null)
            {
                response.AddHeader("Content-Length", imageStream.ToArray().Length.ToString());
                response.ContentType = index == 1 ? "jpg" : "application/pdf";
                response.BinaryWrite(imageStream.ToArray());
            }
        }
    }

    private MemoryStream ReadFile(DateTime dt, string fileName)
    {
        string filePath = HttpContext.Current.Server.MapPath(string.Format("~/POWS/{0}_{1} POW/{2}_{3}", string.Format("{0:yyyy}", dt), string.Format("{0:MM}", dt), string.Format("{0:MM}", dt), string.Format("{0:dd}", dt)));

        MemoryStream oStream = null;
        try
        {
            if (File.Exists(filePath + "\\" + fileName))
            {
                oStream = new MemoryStream(ReadLocalFile(filePath + "\\" + fileName));
                return oStream;
            }
        }
        catch (IOException ex)
        {
            throw (ex);
        }

        return oStream;
    }

    private byte[] ReadLocalFile(string file)
    {
        byte[] returnValue = null;
        byte[] returnBytes = null;
        try
        {
            using (FileStream filestream = new FileStream(file, FileMode.Open, FileAccess.Read))
            {
                returnBytes = new byte[Convert.ToInt32(filestream.Length) + 1];
                filestream.Read(returnBytes, 0, Convert.ToInt32(filestream.Length));

            }
        }
        catch (Exception generatedExceptionName)
        {
            returnBytes = null;
        }
        returnValue = returnBytes;
        return returnValue;
    }

    public bool IsReusable
    {
        get { return false; }
    }

}