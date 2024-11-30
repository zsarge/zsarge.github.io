Title: How to host Square CTF for practice
Preview: How to host Square CTF for practice
Date: 2023-11-08
Tags: nkcyber, cybersecurity, python

Next Friday (Nov 17, 2023) is the [2023 Square CTF](https://2023.squarectf.com/), and I've decided that [my school's cybersecurity club](https://www.nku.edu/academics/informatics/beyond/student-organizations/nkcyber.html) is going to participate. In an effort to prepare, we're going to work through a selection of the [2022 challenges](https://squarectf.com/2022/index.html). 

I want to sincerely say thank you to all of [the Square CTF contributors](https://squarectf.com/#:~:text=Credits) for hosting such a great event. 🙏

<aside>
**Warning:**
This is a stream-of-consciousness work log, for use as future reference, mostly written while waiting for Docker images to build on underpowered hardware.
</aside>

## The challenges we're going to host:

Spoiler! I wasn't able to get all of the challenges to host easily. I've specifically chosen:

- [EZ pwn 1](https://squarectf.com/2022/ezpwn1.html)
- [EZ pwn 2](https://squarectf.com/2022/ezpwn2.html)
- [Developer's Hubris](https://squarectf.com/2022/developershubris.html)
- [Huge Primes](https://squarectf.com/2021/hugeprimes.html)
- [Korean Space Program](https://squarectf.com/2021/koreanspaceprogram.html) A.K.A. Inv-characters

It's very possible that I'm missing something obvious, and that I shouldn't've had the errors I did. I'm still putting this document out there, just for future reference. 

Future club members may find these modified challenges zipped in <u>NKCyber Documents/CST/Meeting Resources/2023-11-10</u>.



-----------

## Getting the zip files

Square has generously provided archives of past challenges as zip files:

```
https://squarectf.com/2022/data/ezpwn1.zip
https://squarectf.com/2022/data/ezpwn2.zip
https://squarectf.com/2022/data/ezre1.zip
https://squarectf.com/2022/data/emojihunt.zip
https://squarectf.com/2022/data/squarepaymentterminal.zip
https://squarectf.com/2022/data/hardcopy.zip
https://squarectf.com/2022/data/roplikeeasy.zip
https://squarectf.com/2022/data/roplikemedium.zip
https://squarectf.com/2022/data/roplikehard.zip
https://squarectf.com/2022/data/threeitemmenu.zip
https://squarectf.com/2022/data/itsrightthere.zip
https://squarectf.com/2022/data/yetanotherreversingactivity.zip
https://squarectf.com/2022/data/alexhanlonhastheflag.zip
https://squarectf.com/2022/data/xark.zip
https://squarectf.com/2022/data/goinginblind.zip
https://squarectf.com/2022/data/nojs.zip
https://squarectf.com/2022/data/developershubris.zip
https://squarectf.com/2022/data/blockchain.zip
```

<aside>
This list was obtained by running:

```javascript
console.log(
	Array.from(document.getElementsByClassName('text-muted'))
   	 .map(e => e.firstChild).filter(e => e.href)
  	 .map(e=>e.href.replace('.html', '.zip'))
   	 .join('\n'))
```

on <https://squarectf.com/2022/index.html>, and filtering out the Pulse Check and changing `3itemmenu` to `threeitemmenu`, and then adding `/data` after `2022`.
</aside>

We can download all of the zip files and extract them with this script:

```python
import requests
import zipfile
import os
from pathlib import Path

square_zips = """
https://squarectf.com/2022/data/ezpwn1.zip
https://squarectf.com/2022/data/ezpwn2.zip
https://squarectf.com/2022/data/ezre1.zip
https://squarectf.com/2022/data/emojihunt.zip
https://squarectf.com/2022/data/squarepaymentterminal.zip
https://squarectf.com/2022/data/hardcopy.zip
https://squarectf.com/2022/data/roplikeeasy.zip
https://squarectf.com/2022/data/roplikemedium.zip
https://squarectf.com/2022/data/roplikehard.zip
https://squarectf.com/2022/data/threeitemmenu.zip
https://squarectf.com/2022/data/itsrightthere.zip
https://squarectf.com/2022/data/yetanotherreversingactivity.zip
https://squarectf.com/2022/data/alexhanlonhastheflag.zip
https://squarectf.com/2022/data/xark.zip
https://squarectf.com/2022/data/goinginblind.zip
https://squarectf.com/2022/data/nojs.zip
https://squarectf.com/2022/data/developershubris.zip
https://squarectf.com/2022/data/blockchain.zip
""".strip().split('\n')

prefix = 'https://squarectf.com/2022/'

zip_dir = './zips'
unzip_dir = './unzips'
Path(zip_dir).mkdir(parents=True, exist_ok=True) # make directory if it doesn't exist
Path(unzip_dir).mkdir(parents=True, exist_ok=True)

def download(url):
	os.system(f'wget --directory-prefix "{zip_dir}" {url}') # string interpolation into shell commands is dangerous, fyi.

for url in square_zips: # download all zip files
	download(url)

for file in os.listdir(zip_dir): # unzip all zip files
	downloaded_file = os.path.join(zip_dir, file)
	with zipfile.ZipFile(downloaded_file, 'r') as zip_ref:
		zip_ref.extractall(unzip_dir)
```

## Using Docker?

Of these, it's important to note that not every directory comes with a Dockerfile. We can check this with Python:

```python
for file in os.listdir(unzip_dir): # unzip all zip files
    target = os.path.join(unzip_dir, file)
    has_dockerfile = len(list(Path(target).glob('**/Dockerfile'))) > 0
    dockerfile_status = '✅' if has_dockerfile else '❌'
    print(dockerfile_status, file)
```

```
✅ ez-pwn-1
✅ ez-pwn-2
❌ ez-re-1
❌ emoji_hunt
❌ sqUARe_paymenT_terminal_pt1
❌ hard-copy
✅ ROPlike-easy
✅ ROPlike-medium
✅ ROPlike-hard
✅ three_item_menu
❌ its-right-there
❌ yet-another-reversing-activity
✅ AlexHanlonHasTheFlag
✅ xark
✅ GoingInBlind
✅ nojs
✅ DevelopersHubris
❌ BLOCKchain
```

Given that my club is only going to have a few hours to work through the problems, I've chosen to not worry about hosting the challenges that don't come with Docker containers.

So, what happens if we host one of these Dockerfiles?

Let's start with `ez-pwn-1` as an example.

There are a couple files:

```bash
$ file *
dist:                directory
Dockerfile:          ASCII text
ez-pwn-1:            ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 3.2.0, BuildID[sha1]=26217945613bd2e86e73d01ae50a82c592549ccc, not stripped
ez-pwn-1.c:          C source, ASCII text
README.md:           HTML document, ASCII text, with very long lines (460)
run.sh:              Bourne-Again shell script, ASCII text executable
the_flag_is_in_here: directory
```

And if we are in the directory, we can build it with:

```bash
$ docker build -t ez-pwn-1 . 
$ docker run --rm -d -p 8001:8000 ez-pwn-1
```

Visiting the url hosted by the Docker container returns `ERR_INVALID_HTTP_RESPONSE`, and populates the logs with:

```
: not found.1
sh: 2: Host:: not found
```

I don't know why this is. 

We can try again with `ez-pwn-2`. Let's use the `run.sh`:

```bash
#!/bin/bash

docker build . -t ez-pwn-2
docker run -d -p ${HOST_PORT}:8000 ez-pwn-2
```

So, we can use:

```bash
$ export HOST_PORT=8001
$ chmod +x run.sh
$ ./run.sh
```

This has the same issue, and returns:

```bash
$ curl -v 127.0.0.1:8001
*   Trying 127.0.0.1:8001...
* Connected to 127.0.0.1 (127.0.0.1) port 8001 (#0)
> GET / HTTP/1.1
> Host: 127.0.0.1:8001
> User-Agent: curl/7.85.0
> Accept: */*
>
* Received HTTP/0.9 when not allowed
* Closing connection 0
curl: (1) Received HTTP/0.9 when not allowed
```

Let's check how many actually host a web interface with Docker:

```
❌ ez-pwn-1
❌ ez-pwn-2
❌ ROPlike-easy
❌ ROPlike-medium
❌ ROPlike-hard
❌ three_item_menu
✅ AlexHanlonHasTheFlag - works with docker compose up
✅ xark - works with docker compose up
✅ GoingInBlind - works with docker compose up
✅ nojs - works after modifying Dockerfile (see below)
✅ DevelopersHubris - worked first try, ironically
```

### nojs modifications

`nojs` errored out in the Dockerfile on line `ADD keys/deploy_id_rsa /root/.ssh/id_rsa`, but after commenting out the lines 5-8, it then errored out on installing `openjdk-11-jre`. I removed the requirement for `openjdk-11-jre`, and it worked perfectly. I'm not sure why these were required, but everything seems to work fine without them. I ran with `./run.sh` with no errors. **Spoiler: it would not *always* work without errors.**

<aside>
At this point I must mention it's very possible I'm doing something blatantly wrong here. I'm not sure why so many Docker images are failing to work. However, given that we aren't going to have time to get through many challenges, I only need a couple to work.
</aside>

Great! We now have the 5 challenges we're going to do this Friday.

We can move them into a separate directory with:

```python
import shutil                                                                                     
approved = ('AlexHanlonHasTheFlag', 'xark', 'GoingInBlind', 'nojs', 'DevelopersHubris')
approved_dir = './approved'
Path(approved_dir).mkdir(parents=True, exist_ok=True) # make directory if it doesn't exist

for folder in approved:
    source = os.path.join(unzip_dir, folder)
    destination = os.path.join(approved_dir, folder)
    shutil.move(source, destination)
```

So, we get the list:

```
approved/
├── AlexHanlonHasTheFlag
├── DevelopersHubris
├── GoingInBlind
├── nojs
└── xark
```

All of these have a `run.sh` except for `xark`.

So, we can add a `run.sh` to the `xark` folder:

```bash
$ pwd
approved/xark
$ cat > run.sh << 'EOF'
#!/bin/bash
docker compose up -d
EOF
$ chmod +x run.sh
```

## Deployment fights back

From there, I copied the file to a [Digital Ocean Droplet](https://www.digitalocean.com/products/droplets) to host for this Friday.

```bash
scp -r Square2022Approved.zip root@ctfd.zack.fyi:/root/square_ctf
```

(Where `Square2022Approved.zip` contains all of the modifications described above)

```bash
unzip Square2022Approved.zip
touch host.py
```

On the Digital Ocean Droplet, I then wrote the script:

```python
import os

host_ports = {
    "AlexHanlonHasTheFlag": 8001,
    "GoingInBlind": 8002,
    "DevelopersHubris": 8003,
    "nojs": 8004,
    "xark": 8005,
}

for folder, port in host_ports.items():
    print(f"running {folder} on port :{port}")
    os.system(f"cd approved/{folder} && chmod +x run.sh && HOST_PORT={port} ./run.sh")
```

which was able to install almost all of the selected challenges. DevelopersHubris originally errored out with:

```
Non-resolvable parent POM for com.example:DevelopersHubris:0.0.1-SNAPSHOT: Could not transfer artifact org.springframework.boot:spring-boot-starter-parent:pom:2.7.5 from/to central (https://repo.maven.apache.org/maven2): transfer failed for https://repo.maven.apache.org/maven2/org/springframework/boot/spring-boot-starter-parent/2.7.5/spring-boot-starter-parent-2.7.5.pom and 'parent.relativePath' points at no local POM @ line 6, column 11: Remote host terminated the handshake: SSL peer shut down incorrectly
```

but, I ran again and it worked fine.

However, despite all of these working fine on my laptop, we run into some issues on the Droplet:

| Emoji | Title                | Performance Impact          |
| ----- | -------------------- | --------------------------- |
| 💥     | AlexHanlonHasTheFlag | 100% CPU (repeated crashes) |
| 💥     | GoingInBlind         | 100% CPU (repeated crashes) |
| ✅     | DevelopersHubris     | 10% CPU                     |
| 💥     | nojs                 | 100% CPU (repeated crashes) |
| 💥     | xark                 | 100% CPU (repeated crashes) |

So, it looks like the first two are crashing due to self signed certificates.

<details>
<summary>Show all</summary>

```
2023-11-09T16:33:43.040751Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.31'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
2023-11-09 16:34:38+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.31-1.el8 started.
2023-11-09 16:34:40+00:00 [Note] [Entrypoint]: Switching to dedicated user 'mysql'
2023-11-09 16:34:40+00:00 [Note] [Entrypoint]: Entrypoint script for MySQL Server 8.0.31-1.el8 started.
'/var/lib/mysql/mysql.sock' -> '/var/run/mysqld/mysqld.sock'
2023-11-09T16:34:41.713217Z 0 [Warning] [MY-011068] [Server] The syntax '--skip-host-cache' is deprecated and will be removed in a future release. Please use SET GLOBAL host_cache_size=0 instead.
2023-11-09T16:34:41.725478Z 0 [System] [MY-010116] [Server] /usr/sbin/mysqld (mysqld 8.0.31) starting as process 1
2023-11-09T16:34:41.766279Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2023-11-09T16:34:43.370891Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2023-11-09T16:34:45.659096Z 0 [System] [MY-010229] [Server] Starting XA crash recovery...
2023-11-09T16:34:45.827484Z 0 [System] [MY-010232] [Server] XA crash recovery finished.
2023-11-09T16:34:48.290338Z 0 [Warning] [MY-010068] [Server] CA certificate ca.pem is self signed.
2023-11-09T16:34:48.296914Z 0 [System] [MY-013602] [Server] Channel mysql_main configured to support TLS. Encrypted connections are now supported for this channel.
2023-11-09T16:34:48.399412Z 0 [Warning] [MY-011810] [Server] Insecure configuration for --pid-file: Location '/var/run/mysqld' in the path is accessible to all OS users. Consider choosing a different directory.
2023-11-09T16:34:50.303363Z 0 [System] [MY-010931] [Server] /usr/sbin/mysqld: ready for connections. Version: '8.0.31'  socket: '/var/run/mysqld/mysqld.sock'  port: 3306  MySQL Community Server - GPL.
```

</details>

And nojs was crashing due to not having Java:

```
2023/11/09 17:26:20 worker 8228973497722964186 failed to initialize: failed to initialize selenium: exec: "java": executable file not found in $PATH
```

and xark was crashing as well:
<details>
<summary>Show all</summary>

```
Listening on port 3001 in prod
crushes table doesn't exist, initializing...
node:internal/process/promises:289
            triggerUncaughtException(err, true /* fromPromise */);
            ^

Error: Connection lost: The server closed the connection.
    at Protocol.end (/app/node_modules/mysql/lib/protocol/Protocol.js:112:13)
    at Socket.<anonymous> (/app/node_modules/mysql/lib/Connection.js:94:28)
    at Socket.<anonymous> (/app/node_modules/mysql/lib/Connection.js:526:10)
    at Socket.emit (node:events:527:35)
    at endReadableNT (node:internal/streams/readable:1589:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)
    --------------------
    at Protocol._enqueue (/app/node_modules/mysql/lib/protocol/Protocol.js:144:48)
    at Connection.query (/app/node_modules/mysql/lib/Connection.js:198:25)
    at /app/node_modules/knex/lib/dialects/mysql/index.js:132:18
    at new Promise (<anonymous>)
    at Client_MySQL._query (/app/node_modules/knex/lib/dialects/mysql/index.js:126:12)
    at executeQuery (/app/node_modules/knex/lib/execution/internal/query-executioner.js:37:17)
    at Client_MySQL.query (/app/node_modules/knex/lib/client.js:146:12)
    at Runner.query (/app/node_modules/knex/lib/execution/runner.js:123:36)
    at Runner.queryArray (/app/node_modules/knex/lib/execution/runner.js:217:21)
    at Runner.queryArray (/app/node_modules/knex/lib/execution/runner.js:269:31) {
  fatal: true,
  code: 'PROTOCOL_CONNECTION_LOST'
}

Node.js v21.1.0
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

</details>

I must appreciate the irony that DevelopersHubris was the only one working.

**Current status:** Our meeting is tomorrow, and only one challenge is properly hosted.



### Fixing nojs

This one seems straightforward.

So, it turns out that, despite the fact it worked on my machine, we need to adjust the docker image to include OpenJDK. 

<details>
<summary>See modified Dockerfile</summary>

```dockerfile
FROM debian:bookworm as builder
MAINTAINER tnek

RUN apt-get update && apt-get -y install ca-certificates git golang
# ADD keys/deploy_id_rsa /root/.ssh/id_rsa
# RUN chmod 700 /root/.ssh/id_rsa
# RUN echo "Host github.com\n\tStrictHostKeyChecking no\n" >> /root/.ssh/config
# RUN git config --global url.ssh://git@github.com/.insteadOf https://github.com/

WORKDIR /src
COPY ./go.mod ./
COPY ./go.sum ./
COPY . .

RUN go mod tidy
RUN go mod vendor
RUN go mod download

RUN go build -installsuffix 'static' -o /notes-site .

FROM openjdk:11 AS final
COPY --from=builder /notes-site ./notes-site
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /src/assets ./assets

RUN apt-get update && apt-get install -y curl xvfb software-properties-common unzip wget libc6-amd64-cross libc6-dev firefox-esr 

# Geckodriver
RUN VERSION=$(curl -sL https://api.github.com/repos/mozilla/geckodriver/releases/latest | grep tag_name | cut -d '"' -f 4) && curl -sL "https://github.com/mozilla/geckodriver/releases/download/$VERSION/geckodriver-$VERSION-linux-aarch64.tar.gz" | tar -xz -C /usr/local/bin

# Get selenium's jar
ENV SELENIUM_JAR_ADDR=https://github.com/SeleniumHQ/selenium/releases/download/selenium-3.141.59/selenium-server-standalone-3.141.59.jar
RUN curl -sL $SELENIUM_JAR_ADDR > /usr/local/bin/selenium-server.jar

CMD ["./notes-site"]
```
</details>

I've waited for `go build -installsuffix 'static' -o /notes-site .` to finish for about 10 hours now. Go usually compiles super quickly, so I'm not sure what's going wrong. I bet there's an easy solution, but iterative development is hard when you have to wait hours on a slow machine. I'm giving up and trying a previous year. This feels like a performance limitation.

## Are challenges from 2021 easy to host?

```
https://squarectf.com/2021/data/its-just-an-xor.zip
https://squarectf.com/2021/data/im-a-credential-ghoul.zip
https://squarectf.com/2021/data/out-of-cash.zip
https://squarectf.com/2021/data/korean-space-program.zip
https://squarectf.com/2021/data/memory-safe-hex-decode.zip
https://squarectf.com/2021/data/card-theft.zip
https://squarectf.com/2021/data/huge-primes.zip
https://squarectf.com/2021/data/collatzeral-damage.zip
https://squarectf.com/2021/data/burnt-bread.zip
https://squarectf.com/2021/data/gil-triangle.zip
https://squarectf.com/2021/data/memory-safe-strcmp.zip
```

<details>
<summary>See download script</summary>

```py
import requests
import zipfile
import os
from pathlib import Path

square_zips = """
https://squarectf.com/2021/data/its-just-an-xor.zip
https://squarectf.com/2021/data/im-a-credential-ghoul.zip
https://squarectf.com/2021/data/out-of-cash.zip
https://squarectf.com/2021/data/korean-space-program.zip
https://squarectf.com/2021/data/memory-safe-hex-decode.zip
https://squarectf.com/2021/data/card-theft.zip
https://squarectf.com/2021/data/huge-primes.zip
https://squarectf.com/2021/data/collatzeral-damage.zip
https://squarectf.com/2021/data/burnt-bread.zip
https://squarectf.com/2021/data/gil-triangle.zip
https://squarectf.com/2021/data/memory-safe-strcmp.zip
""".strip().split('\n')

prefix = 'https://squarectf.com/2022/'

zip_dir = './zips'
unzip_dir = './unzips'
Path(zip_dir).mkdir(parents=True, exist_ok=True) # make directory if it doesn't exist
Path(unzip_dir).mkdir(parents=True, exist_ok=True)

#  def download(url):
	#  os.system(f'wget --directory-prefix "{zip_dir}" {url}') # string interpolation into shell commands is dangerous, fyi.

#  for url in square_zips: # download all zip files
	#  download(url)

#  for file in os.listdir(zip_dir): # unzip all zip files
	#  downloaded_file = os.path.join(zip_dir, file)
	#  with zipfile.ZipFile(downloaded_file, 'r') as zip_ref:
		#  zip_ref.extractall(unzip_dir)

#  for file in os.listdir(unzip_dir): # unzip all zip files
    #  target = os.path.join(unzip_dir, file)
    #  has_dockerfile = len(list(Path(target).glob('**/run.sh'))) > 0
    #  dockerfile_status = '✅' if has_dockerfile else '❌'
    #  print(dockerfile_status, file)

import shutil

approved = ('AlexHanlonHasTheFlag', 'xark', 'GoingInBlind', 'nojs', 'DevelopersHubris')
approved_dir = './approved'
Path(approved_dir).mkdir(parents=True, exist_ok=True) # make directory if it doesn't exist


def download(url):
	os.system(f'wget --directory-prefix "{zip_dir}" {url}') # string interpolation into shell commands is dangerous, fyi.

for url in square_zips: # download all zip files
	download(url)

for file in os.listdir(zip_dir): # unzip all zip files
	downloaded_file = os.path.join(zip_dir, file)
	with zipfile.ZipFile(downloaded_file, 'r') as zip_ref:
		zip_ref.extractall(unzip_dir)

#  for folder in approved:
	#  source = os.path.join(unzip_dir, folder)
	#  destination = os.path.join(approved_dir, folder)
	#  shutil.move(source, destination)

for file in os.listdir(unzip_dir): # unzip all zip files
    target = os.path.join(unzip_dir, file)
    has_dockerfile = len(list(Path(target).glob('**/Dockerfile'))) > 0
    dockerfile_status = '✅' if has_dockerfile else '❌'
    print(dockerfile_status, file)
```

</details>

So, 2021:

```
✅ re-its-just-an-xor
✅ crypto-im-a-credential-ghoul
✅ out-of-cash
✅ inv-characters
❌ rust-rev-2
✅ card-theft
✅ hugeprimes
❌ crypto-collatzeral-damage
✅ burnt-bread
✅ gil-triangle
❌ rust-rev-1
```

I'm sad I don't get to geek out about about Rust, as `rust-rev-1` and `rust-rev-2` don't seem easy to host, but this is at least showing progress.

Using an abomination of a Bash/Python one-liner, I found there's quite a lot of socat-based challanges. These should all work as well. (Though, I haven't tested them.) They're just netcat based, and I want some browser-based challenges as well.

```bash
$ find . -iname "Dockerfile" -exec python3 -c "with open('{}') as f: print('🐱 {}' if any(map(lambda x: 'socat' in x, f.readlines())) else '✅ {}')" \;
🐱 ./re-its-just-an-xor/Dockerfile
✅ ./crypto-im-a-credential-ghoul/Dockerfile
🐱 ./out-of-cash/Dockerfile
✅ ./inv-characters/src-do-not-share/Dockerfile
🐱 ./card-theft/Dockerfile
✅ ./hugeprimes/Dockerfile
🐱 ./burnt-bread/Dockerfile
🐱 ./gil-triangle/Dockerfile
```

### HugePrimes

Lets try `hugeprimes` 🤞.

Let's look at its Dockerfile (comments removed):

```Dockerfile
FROM node:16
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "node", "server.js" ]
```

This is a tiny Dockerfile. There's a chance this might not fight back...

![HugePrimes works!](../assets/square-ctf/image-20231109180221535.png)

This is huge! It works.🎉

I'm currently at **two** non-netcat Dockerfiles, which is a **100%** improvement. At this rate, we're going to have all of the browser challenges working in no time.

![Extrapolating - XKCD.com](https://imgs.xkcd.com/comics/extrapolating.png)

## inv-characters

This challenge has the same super simple Dockerfile listed above! 

And it runs!

![Korean Space Agency Login Form](../assets/square-ctf/image-20231109181715740.png)

I'm calling that **three** total challenges. 🎉

<aside>
And yes, several hours later, my $6 Digital Ocean Droplet is still maxed out trying to build one the docker image for [nojs](https://squarectf.com/2022/nojs.html).

If you are represent a company interested in supporting college students passionate about cybersecurity, please feel free to [contact me](/contact.html).
</aside>

## Our status so far:

**Legend:**

* ✅ has a Dockerfile, works
* 💥 Worked on my machine, but crashed on the server
* 🖥️ Used SSH, and I didn't want to host that.
* 🐱 uses socat (connect through netcat)
* ❌ has no Dockerfile; usually isn't easily hosted

```
✅ inv-characters
✅ hugeprimes
✅ DevelopersHubris 
💥 AlexHanlonHasTheFlag 
💥 GoingInBlind         
💥 nojs                 
💥 xark         
🖥️ crypto-im-a-credential-ghoul
🐱 ez-pwn-1
🐱 ez-pwn-2
🐱 ROPlike-easy
🐱 ROPlike-medium
🐱 ROPlike-hard
🐱 re-its-just-an-xor
🐱 out-of-cash
🐱 card-theft
🐱 burnt-bread
🐱 gil-triangle
❌ rust-rev-2
❌ crypto-collatzeral-damage
❌ rust-rev-1
❌ ez-re-1
❌ emoji_hunt
❌ sqUARe_paymenT_terminal_pt1
❌ hard-copy
❌ its-right-there
❌ yet-another-reversing-activity
❌ BLOCKchain
```

## A new hope

I want at least 5 challenges to cover on Friday, but it bugs me that several challenges keep crashing on our droplet.

I see three paths forward:

1. Go back another year
2. Try and resolve the Docker issues

Well, I liked what I saw of AlexHanlonHasTheFlag when it was working, so I'll try that again.

## Resource limiations, part 2

I'm giving up on nojs. I've waited for too many hours for the Docker image to build, to no avail.

I'm going to try AlexHanlonHasTheFlag, because we've covered SQL injections before, and I might be able to fix the errors.

Just checking:

![A form](../assets/square-ctf/image-20231109185744020.png)

Apparently, the logs I saw the last time I ran it are actually the exact same I see in my laptop. However, the db image is definitely failing.

Going into each Dockerfile, I notice that both the db application and the Java application run without error. However, the db application closes immediately and exits.

However, adding a bash command to the end of the Dockerfile works to keep the container alive, as long as the file is run with `-t`:

```dockerfile
# keep alive
CMD ["bash"] 
# or consider https://stackoverflow.com/a/30209974
CMD ["sleep", "infinity"] 
```

I tested the second solution, and it seemed to keep the container alive with no worries.

Unfortunately, this did not resolve my issue, and running `docker compose` continued to use 100% of my CPU repeatedly boot-looping the db container, with no errors to explain a crash.

[This StackOverflow response](https://serverfault.com/a/1091663) says that these errors are produced when MySql is trying to run with too little RAM. Yeah, that checks out.

However, we're literally storing *one* record for these challenges, so the idea it needs more than a megabyte of RAM seems absurd.

They suggest:

> And then again, you could just increase RAM on your server if you can afford it.

🥲

So, I yoinky sploinkied [the configuration file](https://serverfault.com/a/1091663) into `mysql.config`, and added the line:

```dockerfile
COPY ./mysql.config /etc/mysql/conf.d
```

Here's my testing command for the Dockerfile, for personal reference:

```bash
python3 host.py && sleep 20 && ( docker ps | grep alexhanlonhastheflag-db | awk '{ print $1 }' | xargs docker logs ) && cd approved/AlexHanlonHasTheFlag/ && docker compose down && cd ../..
```

Then, I stumbled upon [this GitHub repo](https://github.com/alexanderkoller/low-memory-mysql) for configuring MySql to run with low memory, but even that wasn't enough.

If I had more time, I'd migrate everything to SQLite, and it would all work. However, I guess we're just picking a different strategy now. 

It looks like the minimum system requirements for MySql is around 2 GB RAM, which is above the System RAM of 1GB.

```
OS: Ubuntu 22.04.3 LTS x86_64 
Host: Droplet 20171212 
Kernel: 5.15.0-84-generic 
Uptime: 42 days, 55 mins 
Packages: 750 (dpkg), 5 (snap) 
Shell: bash 5.1.16 
Resolution: 1024x768 
Terminal: /dev/pts/0 
CPU: DO-Regular (1) @ 2.199GHz 
GPU: 00:02.0 Red Hat, Inc. Virtio GPU 
Memory: 572MiB / 957MiB
```

## Back to ez-pwn-1

I looked at [the solution](https://ctftime.org/writeup/35997), and found that people were expected to use netcat to connect. That would have been helpful to put in the README.md, ngl. I had issues originally because I thought they expected people to use the browser. From netcat, it works perfectly. I'm sorry I doubted you, ez-pwn-1. 🙏

Well, that's a relief. I probably should have looked through the walkthroughs a while ago.

So, that gives us these challenges for Friday:

- [EZ pwn 1](https://squarectf.com/2022/ezpwn1.html)
- [EZ pwn 2](https://squarectf.com/2022/ezpwn2.html)
- [Developer's Hubris](https://squarectf.com/2022/developershubris.html)
- [Huge Primes](https://squarectf.com/2021/hugeprimes.html)
- [Korean Space Program](https://squarectf.com/2021/koreanspaceprogram.html) A.K.A. Inv-characters

At this point, I give everything a good old `rm * -rf` and I start with the challenges from above.

I write a new hosting script:

```python
"""
This script assumes it is next to a directory structure like:
        approved
        ├── DevelopersHubris
        ├── ez-pwn-1
        ├── ez-pwn-2
        ├── hugeprimes
        └── inv-characters
"""
import os
from pathlib import Path

host_ports = {
    "DevelopersHubris": 8001,
    "ez-pwn-1": 8002,
    "ez-pwn-2": 8003,
    "hugeprimes": 8004,
    "inv-characters": 8005,
}

def go_to_script_dir():
        os.chdir(os.path.dirname(__file__))

for folder, port in host_ports.items():
        print(f"starting {folder} on port {port} ", end="")
        go_to_script_dir()
        os.chdir(f"approved/{folder}")
        if os.path.isfile('run.sh'):
                print("using run.sh")
                os.system(f"chmod +x run.sh && HOST_PORT={port} ./run.sh")
        else:
                path_to_dockerfile = os.path.dirname(list(Path('.').glob('**/Dockerfile'))[0].absolute())
                os.chdir(path_to_dockerfile)
                print("using docker")
                if folder in ('hugeprimes', 'inv-characters'):
                        docker_port = 8080
                else:
                        docker_port = 8000

                os.system(f"docker build -t {folder} . && docker run -d --restart unless-stopped -p {port}:{docker_port} {folder}")
```

Running all of these Docker images bumps our RAM up from 400M/1G to 700M/1G, so we're kinda pushing our Droplet to its limits. I'm sure it'll be fine.

## Allow all solutions on the firewall

```bash
sudo ufw allow 8001:8005/tcp # warning: this opens our insecure apps to the world
```

# CTFd resources

Club members should check the Google Drive for the CTFd resources for this event.
