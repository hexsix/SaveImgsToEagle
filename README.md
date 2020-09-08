# SaveImgsToEagle

Save twitter.com/pixiv.net/yande.re images to eagle(a design library app).

## Requirements

- Chrome & Tempermonkey
- python3 (pixiv)

## Usages

1. 把脚本拷贝到 Tempermonkey 里，修改配置（包括 Eagle 的端口号、server 的端口号、要保存在 Eagle 的文件夹 ID
2. （pixiv）在用户 Downloads 文件夹下运行 serverOfSaveImgsToEagle.py，默认端口号为 8024
3. 访问目标网站
    1. Pixiv: 在 artworks 页点开大图，等待加载完毕后右键选择 Tempermonkey > Save Pixiv Images to Eagle
    2. Twitter: 在 twitter 任意页面点开大图，右键选择 Tempermonkey > Save Twitter Images to Eagle
	3. Yande：在 post/show/ 页点击 View Larger Version 后，右键选择 Tempermonkey > Save Yande.re Images to Eagle

> **我该怎么找到文件夹 ID：**
>> 用浏览器访问 http://localhost:41595/api/folder/list （默认）
>> 
>> 使用组合键 Ctrl+F 查找你要保存的文件夹名字，前面那串 "id": "xxxxxxxxxx" 就是了

> **为什么 pixiv 需要第 2 步操作：**
>> 因为 pixiv 原图存放的服务器在 i.pximg.net，我们平时访问的是 pixiv.net
>> 
>> 访问 i.pximg.net 时必须带 referer 才不会被网站拒绝
>> 
>> 使用从 url 导入 Eagle api 保存原图时 Eagle 会直接请求 i.pximg.net，从而得到一个 403 Forbidden

> **那调用从本地文件导入 Eagle api 就行了，为什么要起一个 Server：**
>> 因为从本地文件导入 Eagle 那个 api 是个残废，不能加 tag

>【已完成、尚未发布】Eagle API 添加图片功能支持自定义 HTTP headers 属性，绕过特定网站保护机制（例 pixiv）【2020年8月】
>> 这是 Eagle 未来要发布的计划，等待这个功能上线就可以脱离本地文件了

> **为什么是 Downloads 文件夹下：**
>> 因为 GM_downloads 只能下载到这个文件夹

> **Twitter 多图能不能只保存其中一张：**
>> 页面里所有图都加载的，我也不知道右键的是哪一张
>> 
>> \<ul\> 里 $style="transform3d(0px, 0px, 0px)"$ 控制当前展示哪一张，建议有能 man 提一个 pr

## todo

- [x] yande.re

## why Eagle

试了很多图片管理，包括 google 的 picasa、kde 的 digiKam、adobe 的 Bridge、Billfish、Tropy、XnViewMP，最后选了 Eagle

- 同步方便，我用 OD 做同步，Eagle 可以把整个库扔进去，而且每次同步不用同步整个数据库
- 迁移方便，我看到很多人说用了 Eagle 就是绑定了，但实际上 Eagle 在每个图片的路径写了一个 json，这个 json 文件非常好懂，如果新的目标软件开放导入 api，我想迁移不是问题
- 有 api，我可以自动爬图写入标签

还存在一些问题

- 和我的安卓手机同步（syncthing）时非文件夹结构造成的不便
