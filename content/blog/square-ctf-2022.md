Title: How to host Square CTF 2022 for practice
Preview: How to host Square CTF 2022 for practice
Date: 2023-11-08
Tags: nkcyber, cybersecurity, python

Next Friday (Nov 17, 2023) is the [2023 Square CTF](https://2023.squarectf.com/), and I've decided that [my school's cybersecurity club](https://www.nku.edu/academics/informatics/beyond/student-organizations/nkcyber.html) is going to participate. In an effort to prepare, we're going to work through a selection of the [2022 challenges](https://squarectf.com/2022/index.html).

I want to sincerely say thank you to all of [the Square CTF contributors](https://squarectf.com/#:~:text=Credits) for hosting such a great event. 🙏

## The challenges we're going to host:

Spoiler! I wasn't able to get all of the challenges to host easily. I've specifically chosen:

- [AlexHanlonHasTheFlag](https://squarectf.com/2022/alexhanlonhastheflag.html)
- [DevelopersHubris](https://squarectf.com/2022/developershubris.html)
- [GoingInBlind](https://squarectf.com/2022/goinginblind.html)
- [nojs](https://squarectf.com/2022/nojs.html)
- [xark](https://squarectf.com/2022/xark.html)

It's very possible that I'm missing something obvious, and that I shouldn't've had the errors I did. I'm still putting this document out there, just for future reference. 

Future club members may find these modified challenges zipped in <u>NKCyber Documents/CST/Meeting Resources/2023-11-10</u>. I have not published the modified versions publicly, as several of these were distributed without licenses to redistribute (or licenses at all).

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

`nojs` errored out in the Dockerfile on line `ADD keys/deploy_id_rsa /root/.ssh/id_rsa`, but after commenting out the lines 5-8, it then errored out on installing `openjdk-11-jre`. I removed the requirement for `openjdk-11-jre`, and it worked perfectly. I'm not sure why these were required, but everything seems to work fine without them. I ran with `./run.sh` with no errors.

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

FROM debian:bookworm AS final
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

## Hosting

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

but **TODO - DID IT WORK?**

**Note:** It took about XX minutes to complete on a 1 vCPU Droplet. Plan to let this sit on CPU-limited systems.

Additionally, it's important to allow these on `ufw`:

```bash
sudo ufw allow 8001:8005
```

**Warning:** This command exposes vulnerable machines to the public.



# Solutions to Square CTF 2022



