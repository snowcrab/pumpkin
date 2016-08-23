using System;
using Microsoft.AspNetCore.Mvc;

namespace Pumpkin.Web
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}