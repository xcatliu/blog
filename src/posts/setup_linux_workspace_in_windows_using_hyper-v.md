---
categories:
  - 编程世界
tags:
  - Hyper-V
  - Samba
  - Windows
---

# 在 Windows 中配置 Linux 工作环境（使用 Hyper-V）

> [上次使用 Vitural Box 安装了 Ubuntu](http://blog.xcatliu.com/2016/04/21/setup-linux-workspace-in-windows/)，结果一个月之后挂了，这次试试上次被推荐的 Hyper-V 吧。

基于[上次 v2ex 上的建议](https://v2ex.com/t/274202)，这次选择的方案是：Hyper-V + Ubuntu + PuTTY + Samba。

## Hyper-V

Hyper-V 是微软的一款虚拟化产品。Windows Server 2008 或者 Windows 7 以上就可以使用了。

如果你使用的是 Windows 7，按如下方式开启（中文请自行对应）：

1. 打开 Control Panel => Programs => Uninstall a program => Turn Windows features on or off
2. 勾选 Hyper-V => OK
3. 安装好之后，需要重启系统

如果是 Windows 10，按如下方式开启：

1. 搜索 Turn Windows features on or off，打开对应的结果
2. 勾选 Hyper-V => OK
3. 安装好之后，需要重启系统

## Ubuntu

官网：http://www.ubuntu.com/server

Linux 中，Ubuntu 使用最广泛，比较适合新手，遇到问题基本都能 Google 出来。既然是在虚拟机中安装 Linux，那么图形界面实在没有多少用途了。纯命令行也很适合学习。

安装 LTS 版本的 Ubuntu，可以获得五年的支持。Ubuntu 16.04 LTS 已出，所以我选择的是 `ubuntu-16.04-server-amd64`。

安装之前，需要在 Hyper-V 中配置一个 Vitural Switch，使 Ubuntu 可以共享 Windows 的网络。步骤如下：

1. 打开 Hyper-V Manager => Vitural Switch Manager
2. 选择 New virtual network switch => External => Create Virtual Switch => 默认配置 => OK
3. 安装 Ubuntu 的时候，选择刚刚新建的 Virutal Switch

> Tip: 安装过程中，请勾选 SSH Service、Samba Service，可以省去自己安装的麻烦。

安装完成后，登录系统，输入 `ifconfig` 查询 IP，记录下来。

## PuTTY

官网：http://www.putty.org/

PuTTY 是 Windows 上用于 SSH 连接的工具，使用很方便，输入 IP 即可。

> Tip: 如果想要保存自定义的配置，登录之后，打开设置，配置好之后，点 Default Settings，然后点击 Save 即可。

> Tip: 推荐使用 [tmux](https://tmux.github.io/) 保存当前会话。

## Samba

官网：https://www.samba.org/

Samba 是 Linux 上在局域网共享文件的服务。之前安装 Ubuntu 的时候，已经选择了安装 Samba Service，如果没有选择，则需要手动安装一下：

```shell
sudo apt-get update
sudo apt-get install samba
```

下一步需要配置共享文件夹，这里有篇[参考文章][Samba Configuration]，解释的非常详细。我这里做一个简单的介绍：

### 1. 为 Samba 配置一个用户

```shell
sudo smbpasswd -a <user_name>
```

> Tip: Samba 的用户和 Linux 系统的用户是独立的。这里建议可以设置为同样的用户名。

> Tip: 这里设置的用户名密码用于在主系统（Windows）访问共享文件时的权限认证。

### 2. 创建一个共享文件夹

```shell
mkdir /home/<user_name>/<folder_name>
```

### 3. 将 Samba 配置文件备份

```shell
sudo cp /etc/samba/smb.conf /etc/samba/smb.conf.bak
```

### 4. 修改 Samba 配置

```shell
sudo vi /etc/samba/smb.conf
```

在末尾添加以下内容：

```shell
[<folder_name>]
path = /home/<user_name>/<folder_name>
valid users = <user_name>
read only = no
```

> Tip: 注意等号左右必须有一个空格

### 5. 重启 Samba 服务

```shell
sudo service smbd restart
```

### 6. 测试 smb.conf 配置有没有错误

```shell
testparm
```

## 在 Windows 中访问共享文件夹

1. 打开资源管理器，在地址栏中输入 `\\<linux_ip>` 回车
2. 输入刚刚配置的用户名和密码
3. 将共享的文件夹收藏到 Quick access，或者添加快捷方式到桌面

> Tip: 可以把 ip 配置到 hosts 中，方便访问

## 使用体验

- 解决了 Vitural Box 软链接的问题
- 某些 IDE 里面（比如 Atom）如果想要删除文件，只能 Move to trash，不能 Delete，这时会删除失败

感谢 [@odirus](https://v2ex.com/member/odirus) [@egen](https://v2ex.com/member/egen) [@Kymair](https://v2ex.com/member/Kymair) 提供的建议！

## Links

- [Samba Configuration][]

[Samba Configuration]: https://help.ubuntu.com/community/How%20to%20Create%20a%20Network%20Share%20Via%20Samba%20Via%20CLI%20(Command-line%20interface/Linux%20Terminal)%20-%20Uncomplicated,%20Simple%20and%20Brief%20Way!
