title: Trying Let’s Encrypt
permalink: trying-lets-encrypt
date: 2015-12-04 10:52:30
categories:
- Full Stack
- Draft
- English
tags:
- Let's Encrypt
- https
---

*Let's Encrypt* was [entering public beta](https://letsencrypt.org/2015/12/03/entering-public-beta.html) yesterday, let's encrypt!

<!-- more -->

## What is *Let's Encrype*

> Let’s Encrypt is a free, automated, and open certificate authority brought to you by the Internet Security Research Group (ISRG).

## Installing Let's Encrypt

As [docs](https://letsencrypt.org/howitworks/) saying, running scripts below to getting start:

```shell
$ git clone https://github.com/letsencrypt/letsencrypt
$ cd letsencrypt
$ ./letsencrypt-auto --help
```

If you are using Mac OS, probably you will get the same WARNING:

```
grep: /etc/os-release: No such file or directory
WARNING: Mac OS X support is very experimental at present...
if you would like to work on improving it, please ensure you have backups
and then run this script again with the --debug flag!
```

OK, let's running with the `--debug` flag:

```shell
$ ./letsencrypt-auto --help --debug
```

After installing lots of dependencies with `Homebrew`, it finally finished.

Tips: you may need to install [Homebrew](http://brew.sh/) before using Let's Encrypt.

We got help message here:

```
letsencrypt [SUBCOMMAND] [options] [-d domain] [-d domain] ...

The Let's Encrypt agent can obtain and install HTTPS/TLS/SSL certificates.  By
default, it will attempt to use a webserver both for obtaining and installing
the cert. Major SUBCOMMANDS are:

(default) run        Obtain & install a cert in your current webserver
certonly             Obtain cert, but do not install it (aka "auth")
install              Install a previously obtained cert in a server
revoke               Revoke a previously obtained certificate
rollback             Rollback server configuration changes made during install
config_changes       Show changes made to server config during installation
plugins              Display information about installed plugins

Choice of server plugins for obtaining and installing cert:

--apache          Use the Apache plugin for authentication & installation
--standalone      Run a standalone webserver for authentication
(nginx support is experimental, buggy, and not installed by default)
--webroot         Place files in a server's webroot folder for authentication

OR use different plugins to obtain (authenticate) the cert and then install it:

--authenticator standalone --installer apache

More detailed help:

-h, --help [topic]    print this message, or detailed help on a topic;
                      the available topics are:

 all, automation, paths, security, testing, or any of the subcommands or
 plugins (certonly, install, nginx, apache, standalone, webroot, etc)
```

## `standalone` mode

TBC
