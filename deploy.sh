npm run deploy
cd ./website/dist
git init
git add *
git remote add origin git@gitee.com:lxfriday/juejin-spider.git
git checkout -b ge-pages
git commit -m "update: data"
git push -u -f origin ge-pages

echo "go to deploy"
echo "https://gitee.com/lxfriday/juejin-spider/pages"

echo "opening browser"

../../openbrowser.js
