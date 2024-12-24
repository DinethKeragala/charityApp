using System;
using System.Net.Http;
using Newtonsoft.Json.Linq;

class Program
{
    static async System.Threading.Tasks.Task Main(string[] args)
    {
        using (HttpClient client = new HttpClient())
        {
            var response = await client.GetStringAsync("http://localhost:5000");
            Console.WriteLine(response);
        }
    }
}
