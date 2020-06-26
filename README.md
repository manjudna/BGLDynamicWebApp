# BGLDynamicWebApp

ASP.NET Core React JS User interface with ASP.NET CORE Web API and Docker
Application designed to show the weather data from third party API, ASP.NET Core React JS and .NET Core API can be run in Docker containers and also running the Apps with Docker Compose
Install Docker Desktop for Mac or Docker Desktop for Windows.

Move to the BGLDynamicWebApp in the terminal window where you have the docker compose file:

Run docker-compose build

Run docker-compose up

Navigate to http://localhost:8080/fetch-data in your browser if you are running in docker hub to view the site where you can search the weather.

in case you are running in docker toolbox IP should be used eg. http://192.168.99.100:8080/fetch-data


Alternatively:

if we wan to build and run individual docker images, that can be done is below steps:
Navigate to project folder where 'Dockerfile' is present in command line and enter below commands
step1: docker build -t openweathermapapi:v1 . --for web api
step2: docker run -it --rm -p 8080:80 openweathermapapi:v1 -> navigate in browser http://192.168.99.100:8080/WeatherData/London
