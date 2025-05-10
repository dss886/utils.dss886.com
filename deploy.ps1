# 设置脚本在出错时退出
$ErrorActionPreference = "Stop"

$dirty = ""
if (git status --porcelain) {
    Write-Host "`r`n$([char]27)[1;31mWarning: There are changes not committed.$([char]27)[0m"
    $dirty = " (dirty)"
}

$git_hash = git rev-parse --short HEAD
$commit_msg = "deploy github pages at commit: $git_hash$dirty"

Remove-Item -Recurse -Force dist
npm ci
npm run build

Set-Location dist
Copy-Item index.html 404.html
"utils.dss886.com" | Out-File -Encoding UTF8 CNAME

git init
git add -A
git commit -m "$commit_msg"
git push -f git@github.com:dss886/utils.dss886.com.git main:gh-pages

Write-Host "$([char]27)[1;32m`r`nGithub Pages Deploy Success!$([char]27)[0m`r`n"

Set-Location ..