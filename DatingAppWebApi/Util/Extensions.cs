using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DatingAppWebApi.Util
{
    public static class Extensions
    {
        public static void AddApplicationErro( this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            
        }

        public static int CalculateAge( this DateTime BirthDate)
        {
            var age = DateTime.Today.Year - BirthDate.Year;

            if(BirthDate.AddYears(age) > DateTime.Today)
            {
                age--;
            }
            return age;
        }
    }
}
