#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git push origin master:master
echo -e '\033[32m 已推送至sanm-zh.github.io \n'

git remote set-url origin git@gitee.com:sanm-zh/resume.git
git push origin master:master
echo -e '\033[32m 已推送至sanm-zh.gitee.io \n'

git remote set-url origin git@github.com:Sanm-ZH/resume.git
