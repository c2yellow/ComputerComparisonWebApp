# Computer Comparison Web App

This web app consists of a responsive and user-friendly SPA frontend and a backend that provides an API, working together to compare graphics cards and cloud compute solutions for machine learning training. The comparison is based on various parameters like cost, power consumption, and training throughput.

## Features

- Responsive design for desktop and mobile devices
- Fetch list of graphics cards from the backend API
- Display a full comparison between a specific graphics card combined with other components along with electricity cost versus the cheapest cloud compute solution

## Technologies

### Frontend
- HTML5
- CSS3
- JavaScript
- JSON
- Bootstrap 5
- jQuery
- AJAX

### Backend
- C#
- JSON
- ASP.NET Core 6.0 Web API
- Entity Framework Core 6.0
- SQL Server

## Installation

1. Install .NET SDK 6.0 or later from [here](https://dotnet.microsoft.com/download).
2. Clone this repository: `git clone https://github.com/c2yellow/ComputerComparisonBackend.git`
3. Change to the project directory: `cd ComputerComparisonBackend`
4. Run the following command to restore NuGet packages: `dotnet restore`
5. Set up a SQL Server instance, and create a new database for the application. Note down the server name, database name, and necessary credentials.
6. Update the connection string in `appsettings.json` with the server name, database name, and credentials. The connection string should look like this: `Server=<YourServerName>;Database=<YourDatabaseName>;User Id=<YourUsername>;Password=<YourPassword>;`.
7. Run the following command to apply the database migrations and create the necessary tables: `dotnet ef database update`.

Make sure you have the Entity Framework Core CLI tools installed. If not, you can install them by running this command:

```
dotnet tool install --global dotnet-ef
```

## Running the Application

1. From the project directory, run the following command to start the application: `dotnet run`
2. The application will start and listen on `https://localhost:7285`. Access the Swagger UI at `https://localhost:7285/swagger` to test the API endpoints. Access the frontend UI at `https://localhost:7285/index.html`.

## Usage

1. On the landing page, users can choose to let the app recommend the best graphics card or cloud compute solution, or they can select a specific graphics card to compare.
2. If the user chooses to let the app recommend the best solution, they can specify the amount of VRAM needed and whether to prioritize training efficiency or price.
3. The app will then display the best graphics card and cloud compute solution based on the user's input.
4. If the user chooses to select a specific graphics card, the app will display a comparison between the selected graphics card and the cheapest cloud compute solution, along with the total number of nonstop hours the rig needs to be running before it breaks even on its initial costs.

## API Endpoints

- `GET /api/graphics-cards`: Fetches the list of graphics cards stored on the backend
- `GET /api/comparison/{graphicsCardId}`: Gets a full comparison between a specific graphics card and the cheapest cloud compute solution
- `GET /api/comparison?vramSize={vramSize}&efficiency={efficiency}`: Finds the best graphics card and cloud compute solution based on minimum VRAM size and whether to prioritize efficiency or not, as opposed to price

## Updating App Constants

To update the `CostOfRig` and `CostOfElectricity` variables in `AppConstants.cs`, run the provided PowerShell script `UpdateAppConstants.ps1` with the following syntax:

```
.\UpdateAppConstants.ps1 -CostOfRig <CostOfRigValue> -CostOfElectricity <CostOfElectricityValue>
```