# SaveImgsToEagle

Save twitter.com/pixiv.net/yande.re images to eagle(a design library app).

## Requirements

- Chrome & Tempermonkey

## Usages

1. 把脚本拷贝到 Tempermonkey 里，修改配置（包括 Eagle 的端口号、server 的端口号、要保存在 Eagle 的文件夹 ID
2. 访问目标网站
    1. Pixiv: 在 artworks 页点开大图，等待加载完毕后右键选择 Tempermonkey > Save Pixiv Images to Eagle
    2. Twitter: 在 twitter 任意页面点开大图，右键选择 Tempermonkey > Save Twitter Images to Eagle
	1. Yande：在 post/show/ 页点击 View Larger Version 后，右键选择 Tempermonkey > Save Yande.re Images to Eagle

> **要使用最新的 pixiv 脚本，请更新 1.11.0(build39)**

> **我该怎么找到文件夹 ID：**
>> 用浏览器访问 http://localhost:41595/api/folder/list （默认）
>> 
>> 使用组合键 Ctrl+F 查找你要保存的文件夹名字，前面那串 "id": "xxxxxxxxxx" 就是了

> **Twitter 多图能不能只保存其中一张：**
>> 页面里所有图都加载的，我也不知道右键的是哪一张
>> 
>> \<ul\> 里 $style="transform3d(0px, 0px, 0px)"$ 控制当前展示哪一张，建议有能 man 提一个 pr

## todo

- [x] yande.re
- [x] 等 pixiv 上线 api 自定义 headers 功能后更新 pixiv 脚本
- [ ] pixiv 脚本存在一个 BUG，这个 BUG 导致收藏的标签会被加入所有保存的文件的 tag 里

## why Eagle

试了很多图片管理，包括 google 的 picasa、kde 的 digiKam、adobe 的 Bridge、Billfish、Tropy、XnViewMP，最后选了 Eagle

- 我没有设计师那么多图，所以 Eagle 的性能问题在我看来影响并不大
- 同步方便，我用 OD 做同步，Eagle 可以把整个库扔进去，而且每次同步不用同步整个数据库
- 迁移方便，我看到很多人说用了 Eagle 就是绑定了，但实际上 Eagle 在每个图片的路径写了一个 json，这个 json 文件非常好懂，如果新的目标软件开放导入 api，我想迁移不是问题
- 有 api，我可以自动爬图写入标签

还存在一些问题

- 和我的安卓手机同步（syncthing）时非文件夹结构造成的不便
