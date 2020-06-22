#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 81
EXPOSE 443


FROM node:10-alpine as build-node
WORKDIR /ClientApp
COPY DynamicWebAppCore/ClientApp/package.json .
COPY DynamicWebAppCore/ClientApp/package-lock.json .
RUN npm install
COPY DynamicWebAppCore/ClientApp/ . 
#RUN npm run build  

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
ENV BuildingDocker true

WORKDIR /src
COPY ["DynamicWebAppCore/DynamicWebAppCore.csproj", "DynamicWebAppCore/"]
RUN dotnet restore "DynamicWebAppCore/DynamicWebAppCore.csproj"
COPY . .

RUN dotnet build "DynamicWebAppCore/DynamicWebAppCore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DynamicWebAppCore/DynamicWebAppCore.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DynamicWebAppCore.dll"]
