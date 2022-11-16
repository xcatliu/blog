---
date: 2022-11-15
categories:
  - 编程世界
tags:
  - Linux
---

# Linux 常用命令

这些命令总是忘，每次都得去谷歌一遍。现记录下来：

## 挂载硬盘

```shell
# 查看硬盘列表
fdisk -l
# 对硬盘进行分区，依次选择 n p w
# 注意选择 p primary，意为主分区
fdisk /dev/vdc
# 完成分区，再次查看硬盘列表
fdisk -l
# 格式化分区
mkfs -t ext4 /dev/vdc1
# 创建根目录
mkdir /data-new-disk
# 挂载分区到目录上（如果要挂载分区到已有的目录会很复杂，不如新建目录挂载，然后软链过去）
mount /dev/vdc1 /data-new-dist
```

参考：https://www.jianshu.com/p/a7bdbff46e44

## 查看目录大小

```shell
# 查看整个系统的硬盘概况
df -h
# 查看当前目录下的所有子目录大小，并按从大到小排序，仅显示前十名
du -h --max-depth=1 | sort -hr | head
```

## git clone 单分支单历史

```shell
git clone --depth=1 --single-branch --branch=master git@github.com:xcatliu/blog.git
```
