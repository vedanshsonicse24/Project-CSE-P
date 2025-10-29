$file = "src\components\student\StudentManagement.tsx"
$content = Get-Content $file -Raw
$content = $content -replace '#ff7b00', '#800000'
Set-Content $file $content -NoNewline
Write-Host "Colors replaced successfully!"
