Title: NKCyber Club Resources
Preview: A list of the resources I've found when preparing club activities.
Date: 2024-02-15
Tags: nkcyber, cybersecurity

## Intro

During my time finding things to do for our meetings, I've stumbled across quite a few cybersecurity resources.

Here is my list.

## All Resources

### General Roadmap

It can be difficult to learn when you don't know what you don't know. [Roadmap.sh](https://roadmap.sh) is great at turning *unknown* unknowns into *known* unknowns.

<https://roadmap.sh/cyber-security>

> Step by step guide to becoming a Cyber Security Expert in 2024

### CTFs and Wargames

#### Upcoming CTFs

**C**apture **T**he **F**lags are a super valuable way to learn about hacking and cybersecurity. Check CTFTime to see when they are being hosted:

<https://ctftime.org/calendar/>

#### Hack The Box

> **The #1 cybersecurity upskilling platform.**  Hack The Box gives individuals, businesses and universities the tools they need to continuously improve their cybersecurity capabilities — all in one place.

- Hack The Box <https://www.hackthebox.com/>  
- Hack The Box - Universities - <https://www.hackthebox.com/universities>  

#### Try Hack Me

> **Anyone can learn cyber security with TryHackMe**
> Hands-on cyber security training through real-world scenarios.

TryHackMe has great free and paid material.

- Try Hack Me Activities <https://tryhackme.com/hacktivities>
- Try Hack Me Classrooms <https://tryhackme.com/classrooms>
	- [350+ Free rooms](https://sm4rty.medium.com/free-350-tryhackme-rooms-f3b7b2954b8d)
	- $20/user -> a bit pricey for hosting, but pretty good material 

#### Other CTFs

- CrackMes.one  <https://crackmes.one/> Free. Great for binary exploitation, and not much else. Good if we do a lesson on Ghidra.  
- PicoCTF  <https://picoctf.org/>  -> Good, free ctf 
	- <https://primer.picoctf.org/>  -> Primer, become a hacker from nothing  
- VulnHub  <https://www.vulnhub.com/> A collection of vulnerable virtual machines  
- Ring0CTF  <https://ringzer0ctf.com/>  "Jeopardy" style ctf

- <https://www.smashthestack.org/main.html>  
- <https://linuxsurvival.com/> 
- <https://io.netgarage.org/>
- [Square CTF](https://squarectf.com/)
	- <aside>
	We did this in 2023, and we enjoyed it.
	</aside>
- <https://pwn.college/>

- <https://pwnable.kr/>
	- <https://pwnable.kr/play.php>
	- Recommends:
		- <http://io.netgarage.org/>
		- <https://w3challs.com/>
		- <http://ghostintheshellcode.com/>
		- <http://codegate.org/>
		- <https://legitbs.net/>
		- <https://www.root-me.org/?lang=en> (EN+FR)
			- Good starting point: <https://www.root-me.org/en/Challenges/Web-Server/>


### `/(Over|Under)TheWire/`

OverTheWire is for Linux & Bash -> <https://overthewire.org/wargames/> 

<aside>
I really enjoyed this, and I think it's accesible to anyone who can use SSH:  <https://overthewire.org/wargames/bandit/>  
</aside>

UnderTheWire is for Powershell -> <https://underthewire.tech/wargames>

### Virtual Machines available for download:

<https://exploit.education/>

1.  Phoenix
2.  Nebula
3.  Fusion
4.  Main Sequence
5.  Protostar

> exploit.education provides a variety of resources that can be used to learn about vulnerability analysis, exploit development, software debugging, binary analysis, and general cyber security issues.


### List of resources

Not enough ideas for you? Check out these lists!

- <https://github.com/CSIRT-MU/edu-resources>  <- this is a pretty good assortment of resources
- [Awesome CTF github repo](https://c4pr1c3.github.io/awesome-ctf/)  ([jump to wargames list](https://c4pr1c3.github.io/awesome-ctf/#wargames))

### JWT Security

-   <https://medium.com/@m____b____/demystifying-jwt-authentication-with-python-b4302c39bf91>

### YouTube CyberSecurity

These are my personal recommendations.

- [John Hammond](https://www.youtube.com/channel/UCVeW9qkBjo3zosnqUbG7CFw)
- [LiveOverflow](https://www.youtube.com/@LiveOverflow) - <https://liveoverflow.com/>
- [IppSec](https://www.youtube.com/@ippsec) - <https://ippsec.rocks/>

Related:

- [Ben Eater](https://www.youtube.com/beneater) - <https://eater.net/> - Hardware
- [PirateSoftware](https://www.youtube.com/@PirateSoftware) - Hacker, turned GameDev YouTuber
- [Which is your favourite cybersecurity youtube channel? And why?](https://www.reddit.com/r/hacking/comments/nj68g2/which_is_your_favourite_cybersecurity_youtube)

### LiveOverflow

I really like the hacking educator LiveOverflow.

I totally recommend going to [his website](https://liveoverflow.com/) and searching for a hacking topic you're interested in.

#### SUDO Vulnerability

[Sudo Vulnerability Walkthrough](https://www.youtube.com/playlist?list=PLhixgUqwRTjy0gMuT4C3bmjeZjuNQyqdx) (3 hours, 22 minutes, 27 seconds)

### LiveOverflow Recommends

[LiveOverflow](https://liveoverflow.com/) recommends:

-   <https://exploit.education/>  - more virtual machines
-   [ctftime.org](https://ctftime.org/)
-   <https://picoctf.com/>  - more CTFs

### OSINT Hotspots

<https://wigle.net/>  - a website for collecting information about the different wireless hotspots around the world. - OSint

-   [referenced by this CTFtime writeup](https://ctftime.org/writeup/37711)

<https://0xffsec.com/handbook/>

### RISCV assembly hacking boardgame
[RISCV assembly hacking boardgame](https://punkx.org/overflow/)

### C pointer board game
[C pointer board game](https://punkx.org/c-pointer-game/)

### Living off the land

<https://github.com/LOLBAS-Project/LOLBAS>

> The goal of the LOLBAS project is to document every binary, script, and library that can be used for [Living Off The Land](https://www.crowdstrike.com/cybersecurity-101/living-off-the-land-attacks-lotl/ "Living Off The Land
>
> (https://www.crowdstrike.com/cybersecurity-101/living-off-the-land-attacks-lotl/)") techniques.

> A LOLBin/Lib/Script must:
>
> -   Be a Microsoft-signed file, either native to the OS or downloaded from Microsoft.
> -   Have extra "unexpected" functionality. It is not interesting to document intended use cases.
> -   Exceptions are application whitelisting bypasses
> -   Have functionality that would be useful to an APT or red team

### OWASP resources

-   <https://owasp.org/www-project-vulnerableapp/>
-   <https://owasp.org/www-project-webgoat/>
-   <https://owasp.org/www-project-vulnerable-web-applications-directory/>

### More vulnerable virtual macines:

-   [Vulnerable webapps and VMs for penetration testing practice: my own list](https://andreafortuna.org/2020/07/22/vulnerable-webapps-and-vms-for-penetration-testing-practice-my-own-list/)
-   [The OWASP Vulnerable Web Applications Directory project](https://github.com/OWASP/OWASP-VWAD)
- <https://www.vulnhub.com/entry/ripper-1,706/>
- <https://www.doyler.net/security-not-included/vulnhub-sunset-decoy-walkthrough>
- <https://www.hackingloops.com/kali-linux-virtualbox-pentest-lab/>

### JWT Security 

- https://medium.com/@m____b____/demystifying-jwt-authentication-with-python-b4302c39bf91
- <https://infosecwriteups.com/jawt-scratchpad-picoctf-93766d81fd8e>

### Metasploit and Metasploitable

[Metasploit](https://www.metasploit.com/)

> **The world’s most used penetration testing framework**
> Knowledge is power, especially when it’s shared. A collaboration between the open source community and Rapid7, Metasploit helps security teams do more than just verify vulnerabilities, manage security assessments, and improve security awareness; it empowers and arms defenders to always stay one step (or two) ahead of the game.

[Metasploitable](https://docs.rapid7.com/metasploit/metasploitable-2/)

> A test environment provides a secure place to perform penetration testing and security research. For your test environment, you need a Metasploit instance that can access a vulnerable target. The following sections describe the requirements and instructions for setting up a vulnerable target.

Guides:

- <https://www.hackingloops.com/metasploitable-2/>
- <https://docs.rapid7.com/metasploit/metasploitable-2-exploitability-guide/>
- and more...

### OWASP resources

-   <https://owasp.org/www-project-vulnerableapp/>
-   <https://owasp.org/www-project-webgoat/>
-   <https://owasp.org/www-project-vulnerable-web-applications-directory/>

### DSVW Docker Container

-   <https://blog.appsecco.com/damn-small-vulnerable-web-in-docker-fd850ee129d5>
-   <https://hub.docker.com/r/appsecco/dsvw>

### Cryptography

- <https://cryptohack.org/challenges/>  ⭐  
- <https://cryptopals.com/>  ⭐

### Downfall.page

<https://downfall.page/>

> Downfall attacks targets a critical weakness found in billions of modern processors used in personal and cloud computers. This vulnerability, identified as CVE-2022-40982, enables a user to access and steal data from other users who share the same computer. For instance, a malicious app obtained from an app store could use the Downfall attack to steal sensitive information like passwords, encryption keys, and private data such as banking details, personal emails, and messages. Similarly, in cloud computing environments, a malicious customer could exploit the Downfall vulnerability to steal data and credentials from other customers who share the same cloud computer.

### Social Engineer Toolkit

<https://github.com/trustedsec/social-engineer-toolkit>

> The Social-Engineer Toolkit is an open-source penetration testing framework designed for social engineering. SET has a number of custom attack vectors that allow you to make a believable attack quickly. SET is a product of TrustedSec, LLC -- an information security consulting firm located in Cleveland, Ohio.

### Introductory Resources

<https://ctf101.org/> 

<!-- No longer online: <https://huntress.ctf.games/resources>  -->

### Random Number Manipulation

[Random number manipulation](https://www.reddit.com/r/programminghorror/s/NpZTLupRXk)

### Hosting CTFd with challenge VMs and virtualization:

<https://github.com/aau-network-security/haaukins>

-   [Demo video](https://youtu.be/IFbzwALrIwI)

### Create Randomly Insecure Virtual Machines

<https://github.com/cliffe/SecGen>

### Windows Privilege Escalation Workshop with MetaSploit  

<https://github.com/sagishahar/lpeworkshop>

-   [Videos](https://www.youtube.com/playlist?list=PLjG9EfEtwbvIrGFTx4XctK8IxkUJkAEqP)

### Binary Exploitation Resources

<https://guyinatuxedo.github.io/>  

>  Nightmare is an intro to binary exploitation / reverse engineering course based around ctf challenges. I call it that because it's a lot of people's nightmare to get hit by weaponized 0 days, which these skills directly translate into doing that type of work (plus it's a really cool song).

### DreamHack (EN+KR)
- Really great UI  <https://dreamhack.io/wargame>  
- <https://dreamhack.io/ctf/all>  - Lots of active CTFs

### Oldest site I've found

<https://www.hackthissite.org/>  - HackThisSite.org is a free, safe and legal training ground for hackers to test and expand their ethical hacking skills with challenges, CTFs, and more. Active since 2003, we are more than just another hacker wargames site...

-   <https://www.hackthissite.org/missions/javascript/>
-   <https://www.hackthissite.org/missions/basic/>
-   <https://www.hackthissite.org/missions/playit/extbasic/0/>

### Plan for Nov 10

Today, we will be working through the problems from the 2022  <https://squarectf.com/2022/>


### How to integrate Flipper Zero?

I have a [Flipper Zero](https://flipperzero.one/). What can I do with it for the club?

-   <https://github.com/justcallmekoko/ESP32Marauder/wiki/flipper-zero>
-   Host fake Wifi login to steal auth credentials <https://youtu.be/kNLlvTB5zHs>
-   Use qFlipper as demo screen

### CTFd

CTFd resources:

-   <https://github.com/bsidessf>
-   <https://owasp.org/www-project-juice-shop/>
-   [Square CTF](https://squarectf.com/)
-   <https://github.com/mishrasunny174/encrypt-ctf>
-   [Medium Article on scaling CTFd](https://medium.com/@sam.calamos/how-to-run-a-ctf-that-survives-the-first-5-minutes-fded87d26d53)


CTFd resources: 

-   <https://github.com/bsidessf>
-   <https://owasp.org/www-project-juice-shop/>
-   <https://github.com/mishrasunny174/encrypt-ctf>

### Netris

Want a basic activity that anyone can do over SSH? Play tetris!

- <https://code.rocket9labs.com/tslocum/netris>
- <https://playnetris.com>
- ```bash
  ssh YOUR_NAME@netris.rocketnine.space # OR
  ssh YOUR_NAME@playnetris.com
  ```

<aside>
**Note:** Apparently this breaks when ~30 people play it at once.
</aside>

### Github Hacking List

[My Github List for Hacking](https://github.com/stars/zsarge/lists/hacks):

- <https://github.com/kkuchta/css-only-chat>
- <https://github.com/LOLBAS-Project/LOLBAS>
- <https://github.com/0xffsec/handbook>
- <https://github.com/pwndbg/pwndbg>
- <https://github.com/Gallopsled/pwntools>
- <https://github.com/radareorg/radare2>
- <https://github.com/NationalSecurityAgency/ghidra>
- <https://github.com/facebookarchive/fbctf>
- <https://github.com/moloch--/RootTheBox>
- <https://github.com/judge0/judge0>
- <https://github.com/apsdehal/awesome-ctf>
- <https://github.com/UberGuidoZ/Flipper>
- <https://github.com/google/kctf>
- <https://github.com/mcpa-stlouis/hack-the-arch>
- <https://github.com/aau-network-security/haaukins>
- <https://github.com/cliffe/SecGen>
- <https://github.com/DMOJ/judge-server>
- <https://github.com/adnanaziz/EPIJudge>
- <https://github.com/judge0/ide>
- <https://github.com/sagishahar/lpeworkshop>
- <https://github.com/rapid7/metasploit-framework>
- <https://github.com/danluu/post-mortems>
- <https://github.com/fportantier/vulpy>
- <https://github.com/onlurking/awesome-infosec>
- <https://github.com/xtiankisutsa/awesome-mobile-CTF>
- <https://github.com/GTFOBins/GTFOBins.github.io>


