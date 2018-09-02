set -e
rm -rf dist
yarn build
cd dist
git init
git config user.name Gerald
git config user.email gera2ld@163.com
git add .
git commit -m 'Auto deploy to gh-pages'
git push -f git@github.com:intellilab/study-webgl.git master:gh-pages
