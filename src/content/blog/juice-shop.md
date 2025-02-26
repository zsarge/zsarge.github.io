---
title: Setting up OWASP Juice Shop
description: Documentation for setting up OWASP Juice Shop with NKCyber.
pubDate: 2023-09-25
seriesId: juice-shop
orderInSeries: 1
tags:
  - nkcyber
---

This is intended as a public reference of steps I used to get [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) running with [CTFd](https://ctfd.io/). Thanks so much to all the open source contributers that make this process both possible and straightforward.

Juice Shop does have a scoreboard built in, but CTFd allows support for teams, and better hints.

# Installation Steps

## Installing and running Juice Shop via docker image

In order to make sure that your CTF flags are the same in Juice Shop as CTFd, make sure to set `CTF_KEY`. For use in CTFd, I'd recommend putting it in a URL on Pastebin/Github Gist/whatever. I put mine at <https://pastebin.com/raw/vc5av96m>.

You can pull the project from [their docker image](https://hub.docker.com/r/bkimminich/juice-shop):

```bash
docker pull bkimminich/juice-shop
```

Then, run the docker image:

```bash
docker run -e "CTF_KEY=Tfs3GfbiwYxy1C4jHEYo8wV4xqoqeJSQ7YW8CvCm" -e "NODE_ENV=ctf" -p 3000:3000 bkimminich/juice-shop
```

Note that you may want to consider running ctfd as a daemon, so it persists in the background (you can view the logs of the instance with `docker logs $INSTANCE_HASH` where `INSTANCE_HASH` is the output from the command below):

```bash
docker run -d -e "CTF_KEY=Tfs3GfbiwYxy1C4jHEYo8wV4xqoqeJSQ7YW8CvCm" -e "NODE_ENV=ctf" -p 3000:3000 bkimminich/juice-shop
```

Great! Now we should be able to see the juice shop webpage when we navigate to `http://localhost:3000`:

<img src="https://raw.githubusercontent.com/juice-shop/juice-shop/master/screenshots/slideshow.gif" alt="OWASP Juice Shop Slideshow">

## Installing juice-shop-ctf-cli

Assuming you have npm installed, you can run:

```bash
sudo npm install -g juice-shop-ctf-cli
```

to globally install the [CLI for Juice Shop](https://www.npmjs.com/package/juice-shop-ctf-cli).

The [docker container](https://www.npmjs.com/package/juice-shop-ctf-cli#docker-container-----) section has more information on ways to link your configurations to the juice shop instance.

In our case, we should navigate to a directory we're comfortable storing new files in:

```bash
cd YOUR_PATH
```

Then, you can create your `nkcyberconfig.yml` based on [the example configuration file](https://www.npmjs.com/package/juice-shop-ctf-cli#configuration-file):

```yml
ctfFramework: CTFd
juiceShopUrl: http://localhost:3000
ctfKey: https://pastebin.com/raw/vc5av96m # can also be URL instead of key
insertHints: free # we make hints free for beginner CTFs
insertHintUrls: free # optional for FBCTF; "paid" handled as "free" for CTFd
insertHintSnippets: free # optional for FBCTF; "paid" handled as "free" for CTFd
```

<details>
<summary>Bash command to generate `nkcyberconfig.yml`</summary>

```bash
cat << 'EOF' > nkcyberconfig.yml
ctfFramework: CTFd
juiceShopUrl: http://localhost:3000
ctfKey: https://pastebin.com/raw/vc5av96m # can also be URL instead of key
insertHints: free # we make hints free for beginner CTFs
insertHintUrls: free # optional for FBCTF; "paid" handled as "free" for CTFd
insertHintSnippets: free # optional for FBCTF; "paid" handled as "free" for CTFd
EOF

```

</details>

(ensure that juice-shop is running at this time)

```bash
juice-shop-ctf --config nkcyberconfig.yml --output challenges.csv
```

You should see:

```
Generate OWASP Juice Shop challenge archive for setting up CTFd, FBCTF or RootTheBox score server

Backup archive written to YOUR_PATH/challenges.csv

After the import you will have to set up the CTF name and administrator credentials again!

For a step-by-step guide to import the ZIP-archive into CTFd, please refer to
https://pwning.owasp-juice.shop/part1/ctf.html#running-ctfd
```

```bash
$ file challenges.csv
challenges.csv: CSV text
```

Note that [the url it gives you](https://pwning.owasp-juice.shop/part1/ctf.html#running-ctfd) currently returns a 404.

![The URL returns a 404](/assets/juice-shop/image-20230925191952906.png)

However, the instructions can still be found [on the Internet Archive](https://web.archive.org/web/20230828202658/https://pwning.owasp-juice.shop/part1/ctf.html).

Unfortunately, there are some bugs with the current import version (see [#1988](https://github.com/CTFd/CTFd/issues/1988) and [#131](https://github.com/juice-shop/juice-shop-ctf/issues/131)). As such, we can't import a full zip file from `juice-shop-ctf-cli`, and can only import specific elements by `.csv` file.

# Filtering these challenges

By default, there are _quite a lot_ of challenges to get through.

Thus, it's worth filtering them down for this Friday.

I wrote this Python script to filter everything down by topic:

```python
# process.py

"""
This script takes challenges.csv and filters it into filtered.csv
"""

import csv # csv is a python built-in; no installation required

# choose topics and challenge names to filter for
topics = ("XSS")
selected_challenge_names = ("Score Board")

with open('challenges.csv', newline='') as input_file:
    with open('filtered.csv', 'w', newline='') as output_file:
        csv_reader = csv.reader(input_file, delimiter=',', quotechar='"')
        csv_writer = csv.writer(output_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        # copy header from challenges
        header = next(csv_reader)
        csv_writer.writerow(header)
        # filter rows
        for row in csv_reader:
            if row[0] in selected_challenge_names or row[2] in topics:
                csv_writer.writerow(row)

```

## Installing and running CTFd

We can pull CTFd from [their docker image](https://hub.docker.com/r/ctfd/ctfd/):

```bash
docker pull ctfd/ctfd
```

Then, we can run CTFd:

```bash
docker run -p 8000:8000 -it ctfd/ctfd
```

Note that you may want to consider running ctfd as a daemon, so it persists in the background:

```bash
docker run -d -p 8000:8000 -it ctfd/ctfd
```

Other docker parameters to consider:

- You only need `-it` for an **i**nteractive **t**erminal. Consider removing it if you're not running interactively.
- You might want to add `--restart always` or `--restart unless-stopped` to ensure that the container restarts if anything goes wrong. ([Read more](https://docs.docker.com/config/containers/start-containers-automatically/#use-a-restart-policy))

Now, we should see the "Setup" page for CTFd.

![Setup Page](/assets/juice-shop/image-20230925182456834.png)

Make sure to enter valid data for all of this. Despite what other sources may claim, we're not going to be overwriting this.

After you get it set up, go to `http://localhost:8000/admin/config` to load the `nkcyberconfig.yml` as a backup:

![Make sure to "Import CSV"](/assets/juice-shop/import-csv.png)

Use "Import CSV" to import the generated `filtered.csv` from above.

This will give us all of the challenges for our teams to work through:

![Success! The challenges are listed.](/assets/juice-shop/image-20230925194112268.png)

To resolve the issues with importing into CTFd, we need to stop using the docker container's default SQLite, and use something like MySQL instead. From [the documentation](https://docs.ctfd.io/docs/deployment/installation/#docker), it should be as simple as:

```bash
# Install Docker ...
# Install Docker Compose ...
git clone https://github.com/CTFd/CTFd.git
head -c 64 /dev/urandom > .ctfd_secret_key
docker compose up
```

You should now be able to view CTFd, and upload previous `.zip` backups.

## The End

From here, you should be able to submit flags from Juice Shop into CTFd.

**Example:**

Solve a challenge in Juice Shop:

![Copy the flag](/assets/juice-shop/image-20230925205047631.png)

Then go to CTFd:

![Select the challenge](/assets/juice-shop/image-20230925205136733.png)

Enter the Flag:

![Paste the flag](/assets/juice-shop/image-20230925205219766.png)

Get the score:

![Success!](/assets/juice-shop/image-20230925205228656.png)

**Troubleshooting**

If you copy and paste the flag, and it says that the flag is incorrect, you likely need to sync the CTF_KEY between CTFd and Juice Shop.

If you hit submit and nothing happens, you likely need to log in.

# Hosting multple instances

Juice Shop isn't intended to have multiple people on one instance.

[Multi Juicer](https://github.com/juice-shop/multi-juicer) exists to solve this issue, but I think it's easier for our setup to host a bunch of VMs instead.

## Setup needed

1. A bunch (e.g. 20) of VMs set up for each user, set up to start an instance of Juice Shop on startup.
2. 1 instance of CTFd running for everyone

### To install Virtual Machines onto Ubuntu Machines

If you don't have your Proxmox cluster ready in time, you can install all of the images onto Ubuntu machines using the following script. It will download VirtualBox onto the machine, and add Juice Shop as a virtual machine.

```bash
#!/bin/bash

set -e

install_path="/tmp/install_juice"
mkdir -p "$install_path"
cd "$install_path"
echo "installing Virtual Box & Juice Shop VM"
sudo apt-get update -y
sudo apt-get install virtualbox -y
echo "downloading..."
wget "YOUR_ONEDRIVE_SHARE_LINK&download=1" -O JuiceShop.ova
echo "importing..."
vboxmanage import JuiceShop.ova

echo "Done!"
date
```

If you're hosting the `.ova` file on OneDrive, then ensure you're using `&download=1` is appended to the end of your share link for a direct download.

### Setting up HTTPS on Digital Ocean for CTFd

Imagine, because your Proxmox server wasn't up in time, that you had to host CTFd on a cheap Digital Ocean Droplet.

To ensure CTFd has an authenticated connection, and all your users get the little padlock that makes the site feel official, you're going to need to add HTTPS to CTFd.

Following [this tutorial](https://dev.to/roeeyn/how-to-setup-your-ctfd-platform-with-https-and-ssl-3fda) worked perfectly for me. I have no notes.
