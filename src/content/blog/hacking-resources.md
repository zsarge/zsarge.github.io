---
title: NKCyber Club Resources
description: A list of the resources I've found when preparing club activities.
pubDate: 2024-02-15
tags:
  - nkcyber
  - cybersecurity
---

## Intro

Hi! I'm Zack Sargent. I'm in charge of running weekly meetings for my university's cyber security and hacking club, [NKCyber](https://nkcyber-club.github.io/).

During my time finding things to do for our meetings, I've stumbled across quite a few resources.

Here is the list that I personally reference when looking for inspiration. If you think it could be better, feel free to [let me know](/contact)!

## Cyber Security Resources

### General Roadmap

It can be difficult to learn when you don't know what you don't know. [Roadmap.sh](https://roadmap.sh) is great at turning _unknown_ unknowns into _known_ unknowns.

<https://roadmap.sh/cyber-security>

> Step by step guide to becoming a Cyber Security Expert in 2024

---

### CTFs and Wargames

#### Upcoming CTFs

**C**apture **T**he **F**lags are a super valuable way to learn about hacking and cybersecurity. Check CTFTime to see when they are being hosted:

<https://ctftime.org/calendar/>

#### Hack The Box

> **The #1 cybersecurity upskilling platform.** Hack The Box gives individuals, businesses and universities the tools they need to continuously improve their cybersecurity capabilities — all in one place.

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

---

### Other CTFs

- CrackMes.one <https://crackmes.one/> Free. Great for binary exploitation, and not much else. Good if we do a lesson on Ghidra.
- PicoCTF <https://picoctf.org/> -> Good, free ctf
  - <https://primer.picoctf.org/> -> Primer, become a hacker from nothing
- VulnHub <https://www.vulnhub.com/> A collection of vulnerable virtual machines
- Ring0CTF <https://ringzer0ctf.com/> "Jeopardy" style ctf

- <https://www.smashthestack.org/main.html>
- <https://linuxsurvival.com/>
- <https://io.netgarage.org/>
- [Square CTF](https://squarectf.com/)
  - <aside>
    We did this in 2023, and we enjoyed it.
    </aside>
- <https://pwn.college/>
- <https://archive.ooo/> - Playable archive of [DEFCON](https://en.wikipedia.org/wiki/DEF_CON) capture the flag events from 2018 to 2021.
  - See also: <https://oooverflow.io/> and <https://github.com/o-o-overflow>
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
- <https://sizeof.cat/links/#pentesting-sites> recommends:
  - [OverTheWire wargames](https://overthewire.org/wargames)
  - [Deus x64](https://deusx64.ai/)
  - [W3Challs](https://w3challs.com/)
  - [Hellbound Hacker](https://hbh.sh/)
  - [Slavehack 2](http://www.slavehack.com/)
  - [CTF365](https://ctf365.com/)
  - [Reversing.kr](http://reversing.kr/)
  - [DefendTheWeb](https://defendtheweb.net/?hackthis)
  - [Crackmes.one](https://crackmes.one/)
  - [RET2 WarGames](https://wargames.ret2.systems/)
  - [pwnable.kr](https://pwnable.kr/)
  - [ROP Emporium](https://ropemporium.com/)
  - [0x0539](https://0x0539.net/)
  - [Exploit Education](https://exploit.education/)
  - [Pwn Adventure](https://pwnadventure.com/)

---

### `/(Over|Under)TheWire/`

OverTheWire is for Linux & Bash -> <https://overthewire.org/wargames/>

<aside>
I really enjoyed this, and I think it's accesible to anyone who can use SSH:  <https://overthewire.org/wargames/bandit/>
</aside>

UnderTheWire is for Powershell -> <https://underthewire.tech/wargames>

---

### Cross Site Scripting (XSS)

Both of these sites are useful for practicing XSS in a gamified format:

- <https://alf.nu/alert1>
- <https://prompt.ml/>

And, a reminder of why `alert(1)` may not be as useful as `alert(document.domain)` or `alert(window.origin)`:

- <https://liveoverflow.com/do-not-use-alert-1-in-xss/>

General XSS theory and resources:

- <https://primer.picoctf.org/#_cross_site_scripting_xss>
- <https://www.thehacker.recipes/web/inputs/xss>
- <https://book.hacktricks.xyz/pentesting-web/xss-cross-site-scripting>

XSS resources recommended by [thehacker.recipes](https://www.thehacker.recipes/web/inputs/xss#resources):

- <https://xss-game.appspot.com/>
- <https://excess-xss.com/>
- <https://owasp.org/www-community/attacks/DOM_Based_XSS>
- <https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection>

---

### Virtual Machines available for download:

<https://exploit.education/>

1.  Phoenix
2.  Nebula
3.  Fusion
4.  Main Sequence
5.  Protostar

> exploit.education provides a variety of resources that can be used to learn about vulnerability analysis, exploit development, software debugging, binary analysis, and general cyber security issues.

---

### Public hacking wikis

Here are some wikis all about cybersecurity. These are great resources to link people to, because there's minimal/no ads.

- Hacker Recipies: <https://www.thehacker.recipes/>
  - SQL Injection: <https://www.thehacker.recipes/web/inputs/sqli>
  - Network Access Control: <https://www.thehacker.recipes/physical/networking/network-access-control>
- <https://www.ired.team/>
- <https://book.hacktricks.xyz/>
- <https://redteam.wiki/>
- <https://es7evam.gitbook.io/security-studies>
- <https://ir0nstone.gitbook.io/notes>

---

### Lists of resources

Not enough ideas for you? Check out these lists!

- [Awesome CTF github repo](https://c4pr1c3.github.io/awesome-ctf/) ([jump to wargames list](https://c4pr1c3.github.io/awesome-ctf/#wargames))
- <https://github.com/CSIRT-MU/edu-resources> <- this is a pretty good assortment of resources

<details>

<summary><b>See the Awesome CTF list of wargames</b></summary>

<aside>
**Note:** This is just their list of wargames. See <a href="https://c4pr1c3.github.io/awesome-ctf">the website</a> for more links and information.

<a href="https://github.com/c4pr1c3/awesome-ctf/blob/cdc26cac8c6b51f48f7e15223d5445b7cc8a8b7a/README.md">SOURCE</a>

</aside>

**Wargames**

_Always online CTFs_

- [247ctf](https://247ctf.com/) - A learning oriented real CTF platform with challenges covering across web, cryptography, networking, reversing and exploitation.
- [Backdoor](https://backdoor.sdslabs.co/) - Security Platform by SDSLabs.
- [buuoj](https://buuoj.cn/) - A CTF training platform with challenges collected from the past real CTF contests around the world. (in Chinese)
- [Crackmes](https://crackmes.one/) - Reverse Engineering Challenges.
- [CryptoHack](https://cryptohack.org/) - Fun cryptography challenges.
- [echoCTF.RED](https://echoctf.red/) - Online CTF with a variety of targets to attack.
- [Exploit Exercises](https://exploit-exercises.lains.space/) - Variety of VMs to learn variety of computer security issues.
- [Exploit.Education](http://exploit.education) - Variety of VMs to learn variety of computer security issues.
- [Gracker](https://github.com/Samuirai/gracker) - Binary challenges having a slow learning curve, and write-ups for each level.
- [Hack The Box](https://www.hackthebox.eu) - Weekly CTFs for all types of security enthusiasts.
- [Hack This Site](https://www.hackthissite.org/) - Training ground for hackers.
- [Hacker101](https://www.hacker101.com/) - CTF from HackerOne
- [Hacking-Lab](https://hacking-lab.com/) - Ethical hacking, computer network and security challenge platform.
- [Hone Your Ninja Skills](https://honeyourskills.ninja/) - Web challenges starting from basic ones.
- [IO](http://io.netgarage.org/) - Wargame for binary challenges.
- [jarvisoj](https://www.jarvisoj.com/) - A CTF training platform developed by Jarvis from USSLab in ZJU.
- [Microcorruption](https://microcorruption.com) - Embedded security CTF.
- [Over The Wire](http://overthewire.org/wargames/) - Wargame maintained by OvertheWire Community.
- [PentesterLab](https://pentesterlab.com/) - Variety of VM and online challenges (paid).
- [PicoCTF](https://2019game.picoctf.com) - All year round ctf game. Questions from the yearly picoCTF competition.
- [PWN Challenge](http://pwn.eonew.cn/) - Binary Exploitation Wargame.
- [Pwnable.kr](http://pwnable.kr/) - Pwn Game.
- [Pwnable.tw](https://pwnable.tw/) - Binary wargame.
- [Pwnable.xyz](https://pwnable.xyz/) - Binary Exploitation Wargame.
- [Reversin.kr](http://reversing.kr/) - Reversing challenge.
- [Ringzer0Team](https://ringzer0team.com/) - Ringzer0 Team Online CTF.
- [Root-Me](https://www.root-me.org/) - Hacking and Information Security learning platform.
- [ROP Wargames](https://github.com/xelenonz/game) - ROP Wargames.
- [SANS HHC](https://holidayhackchallenge.com/past-challenges/) - Challenges with a holiday theme
  released annually and maintained by SANS.
- [SmashTheStack](http://smashthestack.org/) - A variety of wargames maintained by the SmashTheStack Community.
- [Viblo CTF](https://ctf.viblo.asia) - Various amazing CTF challenges, in many different categories. Has both Practice mode and Contest mode.
- [VulnHub](https://www.vulnhub.com/) - VM-based for practical in digital security, computer application & network administration.
- [W3Challs](https://w3challs.com) - A penetration testing training platform, which offers various computer challenges, in various categories.
- [WebHacking](http://webhacking.kr) - Hacking challenges for web.

_Self-hosted CTFs_

- [CTFTraining](https://github.com/CTFTraining/CTFTraining) - CTF challenge's source code, writeup collected from the past real CTF contests around the world. (in Chinese)
- [My CTF Web Challenges](https://github.com/orangetw/My-CTF-Web-Challenges) - CTF challenge's source code, writeup and some idea explanation. All about Web.
- [Pikachu](https://github.com/zhuifengshaonianhanlu/pikachu) - PHP web application with some common delibrated vulnerabilities. (in Chinese)

</details>

<details>

<summary><b>See the CSIRT-MU list</b></summary>

<aside>
<a href="https://github.com/CSIRT-MU/edu-resources/blob/a13a81ffdeec1ca34eebc42deef8f2526663ff5b/README.md"> SOURCE </a>
</aside>

**Cybersecurity Educational Resources**

This is an [awesome list](https://github.com/sindresorhus/awesome) of resources related to teaching cybersecurity, primarly to running Capture the Flag games for educational purposes. The resources are divided into categories and sorted alphabetically within each category.

**Capture the Flag (CTF) games**

- [CTFtime](https://ctftime.org/) – a public directory of all CTFs organized currently or in the past
- [CTF Field Guide](https://trailofbits.github.io/ctf/) – an online book about preparing for CTFs

**CTF platforms**

- [CTFd](https://ctfd.io/) – the standard open-source CTF platform
    - [CTFd downloader](https://github.com/jselliott/ctfd_download_python) - useful to get all files as an archive, or during a competition
- [rCTF](https://rctf.redpwn.net/) - another open-source CTF platform
- [fbctf](https://github.com/facebookarchive/fbctf) - Facebook's (deprecated) CTF platform

**Online training grounds and practice challenges**

- [Avatao](https://avatao.com/) – challenges to practice cybersecurity skills
- [Crackmes.One](https://crackmes.one/) – challenges to practice reverse engineering
- [Damn Vulnerable Web Application (DVWA)](http://www.dvwa.co.uk/) – a PHP/MySQL web application containing various vulnerabilities
- [Exploit Exercises](https://exploit-exercises.com/) – virtual machines and challenges to practice security exploits
- [Hack Me](https://hack.me/) – a community platform for building, hosting and sharing vulnerable web app code
- [Hack The Box](https://www.hackthebox.eu/) – a community platform with hacking challenges
- [Hack This Site](https://www.hackthissite.org/) – training ground for hackers including a community forum
- [Hack This!!](https://www.hackthis.co.uk/) – challenges to practice cryptography, forensics, JavaScript, SQL, and more
- [Hacker Test](http://www.hackertest.net/) – challenges to practice JavaScript, PHP, HTML and graphic thinking
- [Root Me](https://www.root-me.org) – challenges to practice hacking skills
- [Secure Code Warrior](https://portal.securecodewarrior.com/#/intro-splash) – security learning resources and challenges
- [Wargames](http://overthewire.org/wargames/) – games for practicing hacking skills

**Online courses and materials**

- [Cybrary](https://www.cybrary.it/) – free online security courses
- [Cyber Security Degrees](https://cybersecuritydegrees.org/) – lists of scholarships, degree programs, and certifications in the USA
- [eLearnSecurity](https://www.elearnsecurity.com/) – paid online security courses
- [ENISA Training Resources](https://www.enisa.europa.eu/topics/trainings-for-cybersecurity-specialists/online-training-material) – educational resources
- [Exploit Database](https://www.exploit-db.com/) – archive of exploits
- [Hacker101](https://www.hacker101.com/) – free, open-source video lessons on web security
- [Hacksplaining](https://www.hacksplaining.com/lessons) – vulnerabilities explained simply
- [Open Security Training](http://www.opensecuritytraining.info/) – free, open-source materials for computer security classes
- [PortSwigger](https://portswigger.net/web-security) – free, online web security training with basic and advanced topics and hands-on labs
- [SANS](https://www.sans.org/) – professional paid information security training
- [SANS Cyber Aces](https://tutorials.cyberaces.org/) – video tutorials with handouts and quizzes
- [Teaching Security](https://teachingsecurity.org/) – ready-made materials for classrooms

**Other interesting lists**

- [Awesome Security List](https://github.com/sindresorhus/awesome#security) – a major list on everything security-related
- [Penetration Testing Practice Lab](http://www.amanhardikar.com/mindmaps/PracticeUrls.html) – a roadmap for vulnerable apps and systems
- [Practice CTF List](http://captf.com/practice-ctf/) – CTF practice sites and tools
- [TeachCyber](https://teachcyber.tk/) – a list of free online resources
- [WeChall](https://www.wechall.net/active_sites) – a list of web challenges and practice sites

**Do you want to contribute or share your comments?**

We highly appreciate new contributions, suggestions for improvement, or any other comments.
Please email [Valdemar Švábenský](https://www.muni.cz/en/people/395868-valdemar-svabensky) at *valdemar@mail.muni.cz*.

**Authors**

This list was compiled and is maintained by the members of the [CSIRT-MU team](https://csirt.muni.cz/) at the [Masaryk University](https://muni.cz).

**Licence**

This work is licensed under a [CC0 (Public Domain) License](https://creativecommons.org/publicdomain/zero/1.0/). Feel free to use it in any way.

</details>

---

### List of useful payloads

Can you send inputs? Here are some ideas to try!

- <https://github.com/swisskyrepo/PayloadsAllTheThings>
- <https://github.com/minimaxir/big-list-of-naughty-strings>
- <https://github.com/danielmiessler/SecLists>
- Sites like [HackTricks](https://book.hacktricks.wiki/en/pentesting-web/sql-injection/index.html) have great lists of payloads to try.

---

### YouTube CyberSecurity

These are my personal recommendations.

- [John Hammond](https://www.youtube.com/channel/UCVeW9qkBjo3zosnqUbG7CFw)
- [LiveOverflow](https://www.youtube.com/@LiveOverflow) - <https://liveoverflow.com/>
- [IppSec](https://www.youtube.com/@ippsec) - <https://ippsec.rocks/>

Related:

- [Ben Eater](https://www.youtube.com/beneater) - <https://eater.net/> - Hardware
- [PirateSoftware](https://www.youtube.com/@PirateSoftware) - Hacker, turned GameDev YouTuber
- [Which is your favourite cybersecurity youtube channel? And why?](https://www.reddit.com/r/hacking/comments/nj68g2/which_is_your_favourite_cybersecurity_youtube)

---

### LiveOverflow

I really like the hacking educator LiveOverflow.

I totally recommend going to [his website](https://liveoverflow.com/) and searching for a hacking topic you're interested in.

#### SUDO Vulnerability

[Sudo Vulnerability Walkthrough](https://www.youtube.com/playlist?list=PLhixgUqwRTjy0gMuT4C3bmjeZjuNQyqdx) (3 hours, 22 minutes, 27 seconds)

### LiveOverflow Recommends

[LiveOverflow](https://liveoverflow.com/) recommends:

- <https://exploit.education/> - more virtual machines
- [ctftime.org](https://ctftime.org/)
- <https://picoctf.com/> - more CTFs, hosted by [CMU](https://www.cmu.edu/)

---

### OSINT Hotspots

<https://wigle.net/> - a website for collecting information about the different wireless hotspots around the world. - OSint

- [referenced by this CTFtime writeup](https://ctftime.org/writeup/37711)

<https://0xffsec.com/handbook/>

---

### RISCV assembly hacking boardgame

[RISCV assembly hacking boardgame](https://punkx.org/overflow/)

---

### C pointer board game

[C pointer board game](https://punkx.org/c-pointer-game/)

---

### Living off the land

<https://github.com/LOLBAS-Project/LOLBAS>

> The goal of the LOLBAS project is to document every binary, script, and library that can be used for [Living Off The Land](https://www.crowdstrike.com/cybersecurity-101/living-off-the-land-attacks-lotl/ "Living Off The Land
>
> (https://www.crowdstrike.com/cybersecurity-101/living-off-the-land-attacks-lotl/)") techniques.

> A LOLBin/Lib/Script must:
>
> - Be a Microsoft-signed file, either native to the OS or downloaded from Microsoft.
> - Have extra "unexpected" functionality. It is not interesting to document intended use cases.
> - Exceptions are application whitelisting bypasses
> - Have functionality that would be useful to an APT or red team

---

### OWASP resources

- <https://owasp.org/www-project-vulnerableapp/>
- <https://owasp.org/www-project-webgoat/>
- <https://owasp.org/www-project-vulnerable-web-applications-directory/>

---

### More vulnerable virtual macines:

- [Vulnerable webapps and VMs for penetration testing practice: my own list](https://andreafortuna.org/2020/07/22/vulnerable-webapps-and-vms-for-penetration-testing-practice-my-own-list/)
- [The OWASP Vulnerable Web Applications Directory project](https://github.com/OWASP/OWASP-VWAD)
- <https://www.vulnhub.com/entry/ripper-1,706/>
- <https://www.doyler.net/security-not-included/vulnhub-sunset-decoy-walkthrough>
- <https://www.hackingloops.com/kali-linux-virtualbox-pentest-lab/>

---

### JWT Security

> JSON Web Token (<abbr>JWT</abbr>) is an internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that asserts some number of claims. The tokens are signed either using a private secret or a public/private key.
>
> - <https://en.wikipedia.org/wiki/JSON_Web_Token>

- <https://medium.com/@m____b____/demystifying-jwt-authentication-with-python-b4302c39bf91>
- <https://infosecwriteups.com/jawt-scratchpad-picoctf-93766d81fd8e>
- <https://portswigger.net/web-security/jwt>

---

### Reverse Engineering

**Tools:**

- <https://ghidra-sre.org/> - My go-to for many years
- <https://binary.ninja/> - My new best friend
- <https://hex-rays.com/ida-pro> - I've seen it around, but I haven't used it.

**Challenges:**

- <https://challenges.re/>
- <https://crackmes.one/>
- See other CTFs

---

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

---

### OWASP resources

- <https://owasp.org/www-project-vulnerableapp/>
- <https://owasp.org/www-project-webgoat/>
- <https://owasp.org/www-project-vulnerable-web-applications-directory/>

---

### DSVW Docker Container

- <https://blog.appsecco.com/damn-small-vulnerable-web-in-docker-fd850ee129d5>
- <https://hub.docker.com/r/appsecco/dsvw>

---

### Cryptography

- <https://cryptohack.org/challenges/>
- <https://cryptopals.com/>
  - [easy example](https://cryptopals.com/sets/1/challenges/1)
  - [difficult example](https://cryptopals.com/sets/8/challenges/62.txt)
- <https://mysterytwister.org/>
- <https://github.com/Ciphey/Ciphey> - Automatically decrypt encryptions without knowing the key or cipher, decode encodings, and crack hashes

---

### Hashing

- [John the Ripper](https://github.com/openwall/john)
- [Hashcat](https://github.com/hashcat/hashcat)
    - [Hashcat Practice](https://www.thehacker.recipes/ad/movement/credentials/cracking#practice)

---

### Downfall.page

<https://downfall.page/>

> Downfall attacks targets a critical weakness found in billions of modern processors used in personal and cloud computers. This vulnerability, identified as CVE-2022-40982, enables a user to access and steal data from other users who share the same computer. For instance, a malicious app obtained from an app store could use the Downfall attack to steal sensitive information like passwords, encryption keys, and private data such as banking details, personal emails, and messages. Similarly, in cloud computing environments, a malicious customer could exploit the Downfall vulnerability to steal data and credentials from other customers who share the same cloud computer.

---

### Heartbleed

<https://heartbleed.com/>

> The Heartbleed Bug is a serious vulnerability in the popular OpenSSL cryptographic software library. This weakness allows stealing the information protected, under normal conditions, by the SSL/TLS encryption used to secure the Internet. SSL/TLS provides communication security and privacy over the Internet for applications such as web, email, instant messaging (IM) and some virtual private networks (VPNs).

---

### Meltdown / Spectre

<https://meltdownattack.com/>

> Meltdown and Spectre exploit critical vulnerabilities in modern processors. These hardware vulnerabilities allow programs to steal data which is currently processed on the computer. While programs are typically not permitted to read data from other programs, a malicious program can exploit Meltdown and Spectre to get hold of secrets stored in the memory of other running programs. This might include your passwords stored in a password manager or browser, your personal photos, emails, instant messages and even business-critical documents.

<https://leaky.page/>

>  This site hosts a proof of concept for the Spectre vulnerability written in JavaScript. It was developed and optimized for Chrome 88 running on an Intel® Core™ i7-6500U processor on Linux. While it was confirmed to work on other CPUs (different vendor and/or generation), operating systems and Chromium flavors, you might have to adjust the configuration and it might work less reliably (or not at all). Note that the goal of this proof of concept is to demonstrate the feasibility of a web-based Spectre exploit. It is not a test to see if your device is vulnerable or not. All code is public, you can find it on GitHub.

---

### Social Engineer Toolkit

<https://github.com/trustedsec/social-engineer-toolkit>

> The Social-Engineer Toolkit is an open-source penetration testing framework designed for social engineering. SET has a number of custom attack vectors that allow you to make a believable attack quickly. SET is a product of TrustedSec, LLC -- an information security consulting firm located in Cleveland, Ohio.

---

### Introductory Resources

<https://ctf101.org/>

<!-- No longer online: <https://huntress.ctf.games/resources>  -->

---

### Random Number Manipulation

[Random number manipulation](https://www.reddit.com/r/programminghorror/s/NpZTLupRXk)

---

### Hosting CTFd with challenge VMs and virtualization:

<https://github.com/aau-network-security/haaukins>

- [Demo video](https://youtu.be/IFbzwALrIwI)

  ***

### Create Randomly Insecure Virtual Machines

<https://github.com/cliffe/SecGen>

---

### Windows Privilege Escalation Workshop with MetaSploit

<https://github.com/sagishahar/lpeworkshop>

- [Videos](https://www.youtube.com/playlist?list=PLjG9EfEtwbvIrGFTx4XctK8IxkUJkAEqP)

  ***

### Binary Exploitation Resources

<https://guyinatuxedo.github.io/>

> Nightmare is an intro to binary exploitation / reverse engineering course based around ctf challenges. I call it that because it's a lot of people's nightmare to get hit by weaponized 0 days, which these skills directly translate into doing that type of work (plus it's a really cool song).

> ROPgadget is a tool that helps automate the process of finding gadgets and building an attack against a binary. ROPgadget searches a binary for useful gadgets and tries to assemble them into an attack payload that starts a shell that accepts commands from the attacker.

- <https://docs.pwntools.com/en/stable/rop/rop.html>

---

### DreamHack (EN+KR)

- Really great UI <https://dreamhack.io/wargame>
- <https://dreamhack.io/ctf/all> - Lots of active CTFs

  ***

### Oldest site I've found

<https://www.hackthissite.org/> - HackThisSite.org is a free, safe and legal training ground for hackers to test and expand their ethical hacking skills with challenges, CTFs, and more. Active since 2003, we are more than just another hacker wargames site...

- <https://www.hackthissite.org/missions/javascript/>
- <https://www.hackthissite.org/missions/basic/>
- <https://www.hackthissite.org/missions/playit/extbasic/0/>

---

### Steganography

**Websites**

- <https://www.aperisolve.com/> ⭐
- <https://fotoforensics.com/>
- <https://book.hacktricks.xyz/crypto-and-stego/stego-tricks>

**Tools**

- [binwalk](https://github.com/ReFirmLabs/binwalk) - Can extract embedded files from images
- [foremost](https://www.kali.org/tools/foremost/) - recover lost files based on their headers, footers, and internal data structures.
- [ImageMagick](https://github.com/ImageMagick/ImageMagick) - cli image manipulation
    - `magick identify -verbose <filename>` - Get more information about a file
    - `mogrify -set comment 'Extraneous bytes removed' <filename>` - mogrify may process or remove damaged bytes
- <https://github.com/bannsec/stegoVeritas>
- <https://www.kali.org/tools/steghide/>
- <https://github.com/izcoser/stegpy>
- [hexedit](https://linux.die.net/man/1/hexedit) / [xxd](https://linux.die.net/man/1/xxd)

---

### How to integrate Flipper Zero?

I have a [Flipper Zero](https://flipperzero.one/). What can I do with it for the club?

- <https://github.com/justcallmekoko/ESP32Marauder/wiki/flipper-zero>
- Host fake Wifi login to steal auth credentials <https://youtu.be/kNLlvTB5zHs>
- Use qFlipper as demo screen

---

### Misc

CTFd resources:

- <https://github.com/bsidessf>
- <https://owasp.org/www-project-juice-shop/>
- [Square CTF](https://squarectf.com/)
- <https://github.com/mishrasunny174/encrypt-ctf>
- [Medium Article on scaling CTFd](https://medium.com/@sam.calamos/how-to-run-a-ctf-that-survives-the-first-5-minutes-fded87d26d53)

CTFd resources:

- <https://github.com/bsidessf>
- <https://owasp.org/www-project-juice-shop/>
- <https://github.com/mishrasunny174/encrypt-ctf>

---

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

---

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
