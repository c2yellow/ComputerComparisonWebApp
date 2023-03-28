param(
    [Parameter(Mandatory=$true)][int]$CostOfRig,
    [Parameter(Mandatory=$true)][int]$CostOfElectricity
)

$AppConstantsFilePath = ".\models\AppConstants.cs"

$Content = Get-Content -Path $AppConstantsFilePath

$UpdatedContent = $Content -replace '(?<=public static int CostOfRig { get; set; } = )\d+', $CostOfRig
$UpdatedContent = $UpdatedContent -replace '(?<=public static int CostOfElectricity { get; set; } = )\d+', $CostOfElectricity

Set-Content -Path $AppConstantsFilePath -Value $UpdatedContent