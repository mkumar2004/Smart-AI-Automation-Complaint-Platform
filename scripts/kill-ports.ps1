param(
  [int[]] $Ports = @(5000, 3000, 8000)
)

foreach ($port in $Ports) {
  $pids = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
    Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($procId in $pids) {
    if ($procId) {
      Stop-Process -Id $procId -Force -ErrorAction SilentlyContinue
      Write-Host "Stopped PID $procId on port $port"
    }
  }
}

Write-Host "Ports cleared: $($Ports -join ', ')"
