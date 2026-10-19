# ShellDocs docs site. Build from the repo root; the trailing "." is the build context.
#
#   docker build -f .\Dockerfile -t docker.zuluville.com/shelldocs-docs -t docker.zuluville.com/shelldocs-docs:1.0.0 .
#   docker run --rm -p 8080:8080 docker.zuluville.com/shelldocs-docs

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["global.json", "ShellDocs.Site.csproj", "./"]
RUN dotnet restore "./ShellDocs.Site.csproj"
COPY . .
RUN dotnet build "./ShellDocs.Site.csproj" -c $BUILD_CONFIGURATION -o /app/build

# Publish copies content/ and the demo .razor sources next to the app (see the csproj).
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./ShellDocs.Site.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ShellDocs.Site.dll"]
