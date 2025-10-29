# Color replacement script for entire website
# Primary color: Maroon (#800000)
# Accent color: Light Blue (#60A5FA)

$files = @(
    "src\components\HomePage.tsx",
    "src\components\LoginPage.tsx",
    "src\components\hod\HODDashboard.tsx",
    "src\components\faculty\FacultyDashboard.tsx",
    "src\components\faculty\FacultyProfile.tsx",
    "src\components\student\StudentDashboard.tsx",
    "src\components\student\StudentProfile.tsx",
    "src\components\student\StudentProfileModern.tsx",
    "src\components\common\DashboardSidebar.tsx",
    "src\components\common\StatsCard.tsx"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Processing $file..."
        $content = Get-Content $file -Raw
        
        # Replace blue colors with maroon
        $content = $content -replace '#1e3a8a', '#800000'
        $content = $content -replace '#1E3A8A', '#800000'
        $content = $content -replace '#3B82F6', '#800000'
        $content = $content -replace '#3b82f6', '#800000'
        $content = $content -replace '#2563eb', '#800000'
        $content = $content -replace '#1e40af', '#800000'
        $content = $content -replace '#1E40AF', '#800000'
        
        # Replace orange colors with maroon
        $content = $content -replace '#f97316', '#800000'
        $content = $content -replace '#F97316', '#800000'
        $content = $content -replace '#ea580c', '#800000'
        $content = $content -replace '#fb923c', '#800000'
        
        # Replace purple/indigo with maroon
        $content = $content -replace '#6366f1', '#800000'
        $content = $content -replace '#4f46e5', '#800000'
        $content = $content -replace '#7c3aed', '#800000'
        
        # Replace bg-blue with light blue for accents
        $content = $content -replace 'bg-blue-100', 'bg-blue-50'
        $content = $content -replace 'bg-blue-600', 'bg-[#800000]'
        $content = $content -replace 'bg-blue-500', 'bg-[#800000]'
        
        Set-Content $file $content -NoNewline
        Write-Host "  ✓ Updated $file"
    }
}

Write-Host "`nColor update complete!" -ForegroundColor Green
