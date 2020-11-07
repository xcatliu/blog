---
categories:
  - 编程世界
tags:
  - VituralBox
  - Linux
  - Windows
links:
  v2ex: https://v2ex.com/t/274202
---

# 在 Windows 中配置 Linux 工作环境

> 由于我的大部分项目都是基于 Linux 的，所以在 Windows 中配置一个 Linux 工作环境是非常有必要的（别问我为什么不用 MacBook 了 T_T）

2016-05-20 更新：可以使用更加先进的 [Hyper-V + Samba 方案](http://blog.xcatliu.com/2016/05/20/setup-linux-workspace-in-windows-using-hyper-v/)。

要在 Windows 上使用 Linux，最方便最好用的就是装个虚拟机，再用 SSH 连上了。Linux 当然选择无图形界面的 Server 版，所以还需要能够方便的在 Windows 上访问到 Linux 上的文件。

其中每一项都可以有很多选择，不过都是大同小异了。这里我选择的是 VituralBox + Ubuntu + PuTTY + Shared Folders。

## VituralBox

官网：https://www.virtualbox.org/

无需多介绍，开源免费小巧。装无图形界面的 Linux 足矣。安装比较简单，直接默认选项即可。需要注意的是，之后**安装虚拟机的时候，最好存储在非系统盘**，因为虚拟机可能会占用空间比较大，而且非系统盘不容易丢失。

其他选择：[VMware](http://www.vmware.com/)

## Ubuntu

官网：http://www.ubuntu.com/server

Linux 中，Ubuntu 使用最广泛，比较适合新手，遇到问题基本都能 Google 出来。既然是在虚拟机中安装 Linux，那么图形界面实在没有多少用途了。纯命令行也很适合学习。

安装 LTS 版本的 Ubuntu，可以获得五年的支持。所以我选择的是 `ubuntu-14.04.4-server-amd64`，不过听说 `16.04 LTS` 也快出了，应该使用起来差别不大吧。

安装之前，**需要把 Network 设置为 Bridged Adapter**，这样子方便 Windows 端能够使用 PuTTY 连接上 Linux，也能够用浏览器通过 IP 访问 Linux 中的服务。

> Tip: 系统语言最好选英语，避免不必要的错误。

安装完成后，登录系统，输入 `ifconfig` 查询 IP，记录下来。

## PuTTY

官网：http://www.putty.org/

PuTTY 是 Windows 上用于 SSH 连接的工具，使用很方便，输入 IP 即可。

> Tip: 如果想要保存自定义的配置，登录之后，打开设置，配置好之后，点 Default Settings，然后点击 Save 即可。

> Tip: 推荐使用 [tmux](https://tmux.github.io/) 保存当前会话。

## Shared Folders

共享文件夹之后，就可以用 Windows 上的编辑器（IDE）编辑 Linux 上的文件了。这个步骤比较复杂，配置过程中还遇到诸多问题，所以详细记录一下。

### 配置 Shared Folder

1. 在 Windows 上创建一个 Folder `D:\Share`
2. 关闭 Linux 系统
3. 配置 Linux 的 Shared Folders，添加一项，配置为 `D:\Share`，**并且勾选 `Auto-mount`（重要）**，会自动挂载到 `/media/sf_Share`。

### 访问 Shared Folder

如果尝试在 Linux 中访问 `/media/sf_Share`，会说无权限访问，是因为访问 `/media/sf_Share` 需要管理员权限。所以**使用管理员权限运行** VituralBox 即可。

### 无法创建软链接

在 Shared Folder 中，默认是无法创建软链接的，google 一下可以找到解决方案，但是依然无法解决问题，后经过研究，应该按照如下方式配置：

1. 打开 Windows 中的 cmd，进入 `C:\Program Files\Oracle\VirtualBox`，然后执行 `VBoxManage setextradata ubuntu VBoxInternal2/SharedFoldersEnableSymlinksCreate/Share 1`。注意，`ubuntu` 是你的机器名字，`Share` 是你共享文件夹的名字。
2. 设置完之后，需要重新启动 VirtualBox。如果还是不行，可以尝试先用非管理员模式启动 VirtualBox，再使用管理员模式启动即可。

另外，取消刚刚的配置的命令是：`VBoxManage setextradata ubuntu VBoxInternal2/SharedFoldersEnableSymlinksCreate/Share`。
查看有哪些配置的命令是：`VBoxManage getextradata ubuntu enumerate`。

更多讨论请看：
https://github.com/mitchellh/vagrant/issues/713
https://www.virtualbox.org/ticket/10085

至此，Linux 工作环境已经已经配置完毕，可以愉快的体验了！

## Next Step

- [x] 软链接还存在问题，有时候 Git 会显示有 Unstaged Change，但其实那是为了兼容 Linux 和 Windows 的软链接，而使文件多了一行内容。这个 Unstaged Change 无法被 Commit，也无法被 Checkout，所以对开发影响不大。但是有的脚本或者有的命令要求工作区是 Clear 的，这种情况就只能不在 Shared Folder 开发了。
- [ ] 可以试试 win10 的 Linux subsystem [@beginor](https://v2ex.com/member/beginor)
- [x] 可以试试在 linux 上安装 samba 服务，通过 windows 中的 “映射网络驱动器” 挂载到本地 windows 中，看起来就像是本机磁盘。 PHP 、 Python 这种动态语言项目放到这个磁盘里面，本地 IDE 编写代码， linux 上运行代码 [@odirus](https://v2ex.com/member/odirus)
- [ ] Vagrant [@ljcarsenal](https://v2ex.com/member/ljcarsenal)
- [ ] 可以加个 VBoxHeadlessTray ，再也不用担心 Windows 10 自动重启了 [@ProjectAmber](https://v2ex.com/member/ProjectAmber)
- [x] 推荐用 samba 进行， sharefolder 中安装某些 nodejs npm 包也会出问题，还有文件权限也是个问题，除了普通文件共享，不建议使用 [@egen](https://v2ex.com/member/egen)
- [ ] babun 体验更佳 [@cyio](https://v2ex.com/member/cyio)
- [x] Windows 10 的话直接用系统自带的 Hyper-V 就行了 [@Kymair](https://v2ex.com/member/Kymair)
