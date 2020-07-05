using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using OpenWeatherMapApi.Models.Error;
using OpenWeatherMapApi.Services;
using RestSharp;

namespace OpenWeatherMapApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
       

        private readonly ILogger<WeatherForecastController> _logger;


        private readonly IWeatherService _weatherService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger,IWeatherService weatherService)
        {
            _weatherService = weatherService;
            _logger = logger;
        }

        
        /// <summary>
        /// Gets the weatherdata from OpenMap Weather API. 
        /// </summary>
        /// <param name="city"></param>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("/WeatherData/{city}")]
        public async Task<IActionResult> GetWeatherData(string city)
        {
            _logger.Log(LogLevel.Information, "GetWeatherData function entered");

            if (city == null )
                return BadRequest("City not found");

            var weatherdata = await _weatherService.GetWeatherData(city);      
            
            if(!weatherdata.IsSuccess)
                return BadRequest();
            if (weatherdata.weatherData == null)
                return NotFound(new ErrorDetails {Message="City Not Found",StatusCode = Convert.ToInt32( System.Net.HttpStatusCode.NotFound) });

            return Ok(weatherdata.weatherData);
        }

    }
}
