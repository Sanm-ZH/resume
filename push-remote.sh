#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

branch=$(git symbolic-ref --short -q HEAD)

git push origin $branch:$branch
echo -e '\033[32m 已推送至sanm-zh.github.io \n'

git remote set-url origin git@gitee.com:sanm-zh/resume.git
git push origin $branch:$branch
echo -e '\033[32m 已推送至sanm-zh.gitee.io \n'

git remote set-url origin git@github.com:Sanm-ZH/resume.git
