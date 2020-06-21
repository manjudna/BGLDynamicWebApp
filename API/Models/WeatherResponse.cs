﻿using System.Collections.Generic;

namespace OpenWeatherMapApi
{

    /// <summary>
    /// 
    /// </summary>
    public class WeatherResponse
    {       
        public List<Weather> Weather { get; set; }
        public string Base { get; set; }
        public Main Main { get; set; }
        public int Visibility { get; set; }        
        public int Dt { get; set; }
        public Sys Sys { get; set; }
        public int Timezone { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Cod { get; set; }

    }
}
