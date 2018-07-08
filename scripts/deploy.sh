set -e
rm -rf dist
yarn build
cd dist
git init
git config user.name Gerald
git config user.email gera2ld@163.com
git add .
git commit -m 'Auto deploy to gitee-pages'
git push -f git@gitee.com:gerald/study-webgl.git master:pages
