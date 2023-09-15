Title: OverTheWire Bandit Box Walkthrough
Preview: My solutions to the OverTheWire's Bandit Box, which introduces linux concepts such as ssh, nmap, netcat, git, and more.
Date: 2023-09-14
Tags: cybersecurity, nkcyber

[OverTheWire](https://overthewire.org/) is a fantastic website for learning about hacking and cybersecurity. For the first session in [my school's cybersecurity club](https://www.nku.edu/academics/informatics/beyond/student-organizations/nkcyber.html), we're getting started with the [Bandit box](https://overthewire.org/wargames/bandit/).

Thanks so much to the team at OverTheWire for putting all of this together, and hosting it for free. I hope these solutions may be helpful to you, the reader.

I've come to find that there are lots of solutions out there. If mine are not satisfactory, you might also want to check out [one](https://hackmd.io/@cacF2jEkTu2zEKdDrp6t0A/ry-VyPABj) [of](https://jpsalado.dev/cybersecurity/play-and-learn-journey-through-cybersecurity-with-bandit/) [these](https://5afagy.github.io/posts/bandit0/).

# Bandit Solutions

Start here for level 0:

- <https://overthewire.org/wargames/bandit/bandit0.html>

## Level 0

```bash
ssh bandit0@bandit.labs.overthewire.org -p 2220
Password: bandit0
```

```bash
bandit0@bandit:~$ cat readme
NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

---

## Level 1

```bash
ssh bandit1@bandit.labs.overthewire.org -p 2220
Password: NH2SXQwcBdpmTEzi3bvBHMM9H66vVXjL
```

`ls` produces one file: `-`

```bash
bandit1@bandit:~$ cat ./-
rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

---

## Level 2

```bash
ssh bandit2@bandit.labs.overthewire.org -p 2220
Password: rRGizSaX8Mk1RTb1CNQoXTcYZWU6lgzi
```

`ls` produces the file `spaces in this filename`

```bash
bandit2@bandit:~$ cat spaces\ in\ this\ filename
aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

---

## Level 3

```bash
ssh bandit3@bandit.labs.overthewire.org -p 2220
Password: aBZ0W5EmUfAf7kHTQeOwd8bauFJ2lAiG
```

In the directory `inhere` there is a hidden file named `.hidden`

```bash
bandit3@bandit:~/inhere$ cat .hidden
2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

---

## Level 4

```bash
ssh bandit4@bandit.labs.overthewire.org -p 2220
Password: 2EW7BBsr6aMMoJ2HjW067dm8EgX26xNe
```

ls produces a bunch of data files with dashes in their names.

We can filter through these, but most are garbage.

Let's use file to see what they are.

```bash
bandit4@bandit:~/inhere$ file ./*
./-file00: data
./-file01: data
./-file02: data
./-file03: data
./-file04: data
./-file05: data
./-file06: data
./-file07: ASCII text
./-file08: data
./-file09: Non-ISO extended-ASCII text, with no line terminators
```

`-file07` seems like the only interesting one, so let's look at that.

```bash
bandit4@bandit:~/inhere$ cat ./-file07
lrIWWI6bB37kxfiCQZqUdOIYfr6eEeqR
```

and there's the flag

---

## Level 5

```bash
ssh bandit5@bandit.labs.overthewire.org -p 2220
Password: lrIWWI6bB37kxfiCQZqUdOIYfr6eEeqR
```

We get in the `inhere` directory and find a bunch of files called `maybehere{numbers}`

As given by the prompt, we're looking for a file that's:

- human-readable
- 1033 bytes in size
- not executable

We can go through all of them, and cat the output with the following command.

```bash
bandit5@bandit:~/inhere$ find . -size 1033c -exec cat {} +
P4L4vucdmLnm8I7Vl7jG1ApGSfjYKqJU

{Lots of whitespace}
```

Thus, we find the flag, along with lots of blank files.

---

## Level 6

```bash
ssh bandit6@bandit.labs.overthewire.org -p 2220
Password: P4L4vucdmLnm8I7Vl7jG1ApGSfjYKqJU
```

We know the password for the next level is stored **somewhere on the server** and has all of the following properties:

- owned by user bandit7
- owned by group bandit6
- 33 bytes in size

We can just search the entire server for what we are looking for.

```bash
find / -user bandit7 -group bandit6 -print 2>/dev/null
```

(The `-print` stuff just gets rid of the permission denied errors.)

We can cat the output of the result of that command:

```bash
bandit6@bandit:/$ cat /var/lib/dpkg/info/bandit7.password
z7WtoNQU2XfjmMtWA8u5rN4vzqu4v99S
```

---

## Level 7

```bash
ssh bandit7@bandit.labs.overthewire.org -p 2220
Password: z7WtoNQU2XfjmMtWA8u5rN4vzqu4v99S
```

This level has one file: `data.txt`

This file is over 90 thousand lines long, so it is impossible to parse by hand.

According to the page: The password for the next level is stored in the file **data.txt** next to the word **millionth**

```bash
bandit7@bandit:~$ cat data.txt | grep millionth
millionth       TESKZC0XvTetK0S9xNwm25STk5iWrBvP
```

---

## Level 8

```bash
ssh bandit8@bandit.labs.overthewire.org -p 2220
Password: TESKZC0XvTetK0S9xNwm25STk5iWrBvP
```

We find one file named `data.txt` and it has one thousand lines of stuff.

The webpage says to find the line that appears only once, which we can do with the following command:

```bash
bandit8@bandit:~$ sort data.txt | uniq -u
EN632PlfYiZbn3PhVK3XOGSlNInNE00t
```

---

## Level 9

```bash
ssh bandit9@bandit.labs.overthewire.org -p 2220
Password: EN632PlfYiZbn3PhVK3XOGSlNInNE00t
```

There is a data.txt file that contains data. We are instructed to find a string in the file that is prepended by equals signs.

We can do that with the following command:

```bash
bandit9@bandit:~$ strings data.txt | grep =
4========== the#
5P=GnFE
========== password
'DN9=5
========== is
$Z=_
=TU%
=^,T,?
W=y
q=W
X=K,
========== G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s
&S=(
nd?=

```

---

## Level 10

```bash
ssh bandit10@bandit.labs.overthewire.org -p 2220
Password: G7w8LIi6J3kTb8A7j9LgrywtEUlyyp6s
```

This file has a b64 encoded file called `data.txt`

```bash
bandit10@bandit:~$ base64 -d data.txt
The password is 6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM
```

---

## Level 11

```bash
ssh bandit11@bandit.labs.overthewire.org -p 2220
Password: 6zPeziLdR2RKNdNYFNb6nVCKzphlXHBM
```

The password for the next level is stored in the file **data.txt**, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions

We can use `tr` to rotate all characters 13 positions back.

```
bandit11@bandit:~$ cat data.txt
Gur cnffjbeq vf 5Gr8L4qetPEsPk8htqjhRK8XSP6x2RHh
bandit11@bandit:~$ cat data.txt | tr "$(echo -n {A..Z} {a..z} | tr -d ' ')" "$(echo -n {N..Z} {A..M} {n..z} {a..m} | tr -d ' ')"
The password is JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv
```

---

## Level 12

```bash
ssh bandit12@bandit.labs.overthewire.org -p 2220
Password: JVNBBFSmZwKKOP0XbFXOoW8chDz5yVRv
```

Because we are going to have to do more stuff to this file, we copy it into a temp file.

```bash
bandit12@bandit:~$ mktemp -d
/tmp/tmp.Rw75xvbzkM
bandit12@bandit:~$ cp data.txt /tmp/tmp.Rw75xvbzkM
bandit12@bandit:~$ cd /tmp/tmp.Rw75xvbzkM
bandit12@bandit:/tmp/tmp.Rw75xvbzkM$ ls
data.txt
```

This file is first compressed as a hexdump, which we have to undo with

```bash
xxd -r data.txt data.out
```

This is a gzip file, which we can undo with

```bash
mv data.out data.gz && gzip -d data.gz
```

That file is compressed with bzip2, which we undo with

```bash
bzip2 -d data
```

We can reuse a previous command because it's a .gz again.

```bash
mv data.out data.gz && gzip -d data.gz
```

There are a lot of different levels of compression, but they are all either `tar`, `bzip2`, or `gzip`

> You can complete this challenge with:
>
> ```bash
> xxd -r data data.out
> ```
>
> ```bash
> mv data.out data.gz && gzip -d data.gz
> ```
>
> ```bash
> bzip2 -d data
> ```
>
> ```bash
> mv data.out data.gz && gzip -d data.gz
> ```
>
> ```bash
> mv data data.tar.gz && tar -xvf data.tar.gz
> ```
>
> ```bash
> tar -xvf data5.bin
> ```
>
> ```bash
> tar -xvf data6.bin
> ```
>
> ```bash
> mv data8.bin data8.gz && gzip -d data8.gz
> ```

The end result is

```
The password is wbWdlBxEir4CaE8LaPhauuOo6pwRmrDw
```

---

## Level 13

```bash
ssh bandit13@bandit.labs.overthewire.org -p 2220
Password: wbWdlBxEir4CaE8LaPhauuOo6pwRmrDw
```

This level has a sshkey that we need to use for the next level.

Open another terminal. We can use `scp` to download this file, and use it for the next one.

```bash
scp -P 2220 bandit13@bandit.labs.overthewire.org:sshkey.private .
```

We have to trust the key we downloaded:

```
chmod 400 sshkey.private
```

and then use it to login:

```bash
ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
```

---

## Level 14

```bash
ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220
```

After we are in from the previous problem, we can just cat the password file to port 3000

```bash
$ cat /etc/bandit_pass/bandit14 | nc localhost 30000
Correct!
jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt
```

---

## Level 15

```bash
ssh bandit15@bandit.labs.overthewire.org -p 2220
Password: jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt
```

We have to pass the current password to Port 30001 on localhost using SSL encryption.

I can tell that they have openssl on the system

```bash
bandit15@bandit:~$ which openssl
/usr/bin/openssl
```

[This is a great cheatsheet for openssl.](https://gist.github.com/azadkuh/8957116)

Enter the current password into the openssl connection:

```bash
bandit15@bandit:~$ openssl s_client -connect localhost:30001

[connection output, many lines cut]

jN2kgmIXJ6fShzhT2avhotn4Zcka6tnt
Correct!
JQttfApK4SeyHwDlI9SXGR50qclOAil1

closed
bandit15@bandit:~$

```

---

## Level 16

```bash
ssh bandit16@bandit.labs.overthewire.org -p 2220
Password: JQttfApK4SeyHwDlI9SXGR50qclOAil1
```

> _The credentials for the next level can be retrieved by submitting the password of the current level to **a port on localhost in the range 31000 to 32000**._

We have a range of ports, and I want to scan.

Nmap it is. Here's a good guide if you're not familiar: <https://hackertarget.com/nmap-cheatsheet-a-quick-reference-guide/>

```
bandit16@bandit:~$ nmap -p 31000-32000 localhost

Starting Nmap 7.40 ( https://nmap.org ) at 2020-07-06 00:11 CEST
Nmap scan report for localhost (127.0.0.1)
Host is up (0.00023s latency).
Not shown: 996 closed ports
PORT      STATE SERVICE
31046/tcp open  unknown
31518/tcp open  unknown
31691/tcp open  unknown
31790/tcp open  unknown
31960/tcp open  unknown

Nmap done: 1 IP address (1 host up) scanned in 0.09 seconds
```

Now, instead of 1000 ports to try, I have five.

> _Then find out which of those speak SSL and which don’t. There is only 1 server that will give the next credentials, the others will simply send back to you whatever you send to it._

```
bandit16@bandit:~$ openssl s_client -connect localhost:31046

(did not work)
```

I bet there's an automated way of checking these, but there were only five so I didn't bother researching it. I just tried to connect to each one.

```
bandit16@bandit:~$ openssl s_client -connect localhost:31790

[connection boilerplate removed]

JQttfApK4SeyHwDlI9SXGR50qclOAil1
Correct!
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAvmOkuifmMg6HL2YPIOjon6iWfbp7c3jx34YkYWqUH57SUdyJ
imZzeyGC0gtZPGujUSxiJSWI/oTqexh+cAMTSMlOJf7+BrJObArnxd9Y7YT2bRPQ
Ja6Lzb558YW3FZl87ORiO+rW4LCDCNd2lUvLE/GL2GWyuKN0K5iCd5TbtJzEkQTu
DSt2mcNn4rhAL+JFr56o4T6z8WWAW18BR6yGrMq7Q/kALHYW3OekePQAzL0VUYbW
JGTi65CxbCnzc/w4+mqQyvmzpWtMAzJTzAzQxNbkR2MBGySxDLrjg0LWN6sK7wNX
x0YVztz/zbIkPjfkU1jHS+9EbVNj+D1XFOJuaQIDAQABAoIBABagpxpM1aoLWfvD
KHcj10nqcoBc4oE11aFYQwik7xfW+24pRNuDE6SFthOar69jp5RlLwD1NhPx3iBl
J9nOM8OJ0VToum43UOS8YxF8WwhXriYGnc1sskbwpXOUDc9uX4+UESzH22P29ovd
d8WErY0gPxun8pbJLmxkAtWNhpMvfe0050vk9TL5wqbu9AlbssgTcCXkMQnPw9nC
YNN6DDP2lbcBrvgT9YCNL6C+ZKufD52yOQ9qOkwFTEQpjtF4uNtJom+asvlpmS8A
vLY9r60wYSvmZhNqBUrj7lyCtXMIu1kkd4w7F77k+DjHoAXyxcUp1DGL51sOmama
+TOWWgECgYEA8JtPxP0GRJ+IQkX262jM3dEIkza8ky5moIwUqYdsx0NxHgRRhORT
8c8hAuRBb2G82so8vUHk/fur85OEfc9TncnCY2crpoqsghifKLxrLgtT+qDpfZnx
SatLdt8GfQ85yA7hnWWJ2MxF3NaeSDm75Lsm+tBbAiyc9P2jGRNtMSkCgYEAypHd
HCctNi/FwjulhttFx/rHYKhLidZDFYeiE/v45bN4yFm8x7R/b0iE7KaszX+Exdvt
SghaTdcG0Knyw1bpJVyusavPzpaJMjdJ6tcFhVAbAjm7enCIvGCSx+X3l5SiWg0A
R57hJglezIiVjv3aGwHwvlZvtszK6zV6oXFAu0ECgYAbjo46T4hyP5tJi93V5HDi
Ttiek7xRVxUl+iU7rWkGAXFpMLFteQEsRr7PJ/lemmEY5eTDAFMLy9FL2m9oQWCg
R8VdwSk8r9FGLS+9aKcV5PI/WEKlwgXinB3OhYimtiG2Cg5JCqIZFHxD6MjEGOiu
L8ktHMPvodBwNsSBULpG0QKBgBAplTfC1HOnWiMGOU3KPwYWt0O6CdTkmJOmL8Ni
blh9elyZ9FsGxsgtRBXRsqXuz7wtsQAgLHxbdLq/ZJQ7YfzOKU4ZxEnabvXnvWkU
YOdjHdSOoKvDQNWu6ucyLRAWFuISeXw9a/9p7ftpxm0TSgyvmfLF2MIAEwyzRqaM
77pBAoGAMmjmIJdjp+Ez8duyn3ieo36yrttF5NSsJLAbxFpdlc1gvtGCWW+9Cq0b
dxviW8+TFVEBl1O4f7HVm6EpTscdDxU+bCXWkfjuRb7Dy9GOtt9JPsX8MBTakzh3
vBgsyi/sN3RqRBcGU40fOoZyfAMT8s1m/uYv52O6IgeuZ/ujbjY=
-----END RSA PRIVATE KEY-----

closed
bandit16@bandit:~$
```

---

## Level 17

Copy the RSA key from last time into a file like `level16ssh.private`

```bash
chmod 400 level16ssh.private

ssh bandit17@bandit.labs.overthewire.org -p 2220 -i level16ssh.private
```

Doing `ls` we see 2 files: `passwords.new` and `passwords.old`.

This might seem like a completely secure way to save passwords, but apparently there is a weakness. /s

> _the password for the next level is in `passwords.new` and is the only line that has been changed between `passwords.old` `and passwords.new`_

```bash
bandit17@bandit:~$ cat passwords.new  | wc -l
100
bandit17@bandit:~$ cat * | wc -l
200
```

each one has 100 lines, which is way too many to do by hand.

```bash
bandit17@bandit:~$ ls
passwords.new  passwords.old
bandit17@bandit:~$ diff *
42c42
< hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg
---
> glZreTEH1V3cGKL6g4conYqZqaEj0mte
bandit17@bandit:~$
```

`hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg` is the password. easy clap gg

---

## Level 18

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 -t 'cat readme; bash -login'

Password: hga5tuuCLF6fFzUpnagiMN8ssu9LFrdg
```

We can look around the home directory with the past user.

There is a `.bash_logout` function that immediately logs you out if you are trying to log in, if `"$SHLVL" = 1`.

We could probably do stuff with that, but why bother. We can just cat the file.

Here is what the whole level looks like.

```
sarge@sargebox >> ~$ ssh bandit18@bandit.labs.overthewire.org -p 2220 -t 'cat readme; bash -login'

This is a OverTheWire game server. More information on http://www.overthewire.org/wargames

bandit18@bandit.labs.overthewire.org's password:

awhqfNnAbc1naukrpqDYcF95h7HoMTrC
Byebye !
Connection to bandit.labs.overthewire.org closed.
```

---

## Level 19

```bash
ssh bandit19@bandit.labs.overthewire.org -p 2220
Password: awhqfNnAbc1naukrpqDYcF95h7HoMTrC
```

> To gain access to the next level, you should use the setuid binary in the homedirectory. Execute it without arguments to find out how to use it. The password for this level can be found in the usual place (/etc/bandit_pass), after you have used the setuid binary.

as far as I can tell, I just want to `cat /etc/bandit_pass/bandit20`

I can use the setuid to do that.

```bash
bandit19@bandit:~$ ./bandit20-do cat /etc/bandit_pass/bandit20
VxCazJaVykI6W36BkBU0mJTCM8rR95XT
```

that wasn't too hard now, was it.

[Here's a video with more information on SUID and SGID](https://www.youtube.com/watch?v=DF1-XRUo6OE)

---

## Level 20

```bash
ssh bandit20@bandit.labs.overthewire.org -p 2220
Password: VxCazJaVykI6W36BkBU0mJTCM8rR95XT
```

For this one we basically need to use netcat to listen for a port, and establish a connection.

**Shell 1:**

```
bandit20@bandit:~$  nc -lvvp 8888
listening on [any] 8888 ...
connect to [127.0.0.1] from localhost [127.0.0.1] 42856
VxCazJaVykI6W36BkBU0mJTCM8rR95XT
NvEJF7oVjkddltPSrdKEFOllh9V1IBcq
 sent 33, rcvd 33
```

**Shell 2:**

```
bandit20@bandit:~$ ./suconnect 8888
Read: VxCazJaVykI6W36BkBU0mJTCM8rR95XT
Password matches, sending next password
```

note that the -p is important with netcat. otherwise it will refuse to connect.

---

## Level 21

```bash
ssh bandit21@bandit.labs.overthewire.org -p 2220
Password: NvEJF7oVjkddltPSrdKEFOllh9V1IBcq
```

Just to mention, this level was completed on my cellphone with a portable keyboard and the android app Termux.
The portable keyboard works well.

We are told on the challenge page to look into the cronjobs on the system.

In bandit22, we see that it is running a shell script in `/usr/bin`

In this shell script, we see that it is sending the password to this level to `/tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv`

```bash
bandit21@bandit:/usr/bin$ cat /tmp/t7O6lds9S0RqQh9aMcz6ShpAoZKF7fgv

WdDozAdTM2z9DiFEQ2mGlwngMfj4EZff
```

---

## Level 22

```bash
ssh bandit22@bandit.labs.overthewire.org -p 2220
Password: WdDozAdTM2z9DiFEQ2mGlwngMfj4EZff
```

According to the page:

> A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.

We find that `/etc/cron.d/cronjob_bandit23` is running `/usr/bin/cronjob_bandit23.sh`

This is that script, with my comments

```bash
#!/bin/bash
myname=$(whoami)
# Type:
# myname="bandit23"
mytarget=$(echo I am user $myname | md5sum | cut -d ' ' -f 1)
# if name is not set properly, this returns
# 7db97df393f40ad1691b6e1fb03d53eb
# If name is set properly, it should return:
# 8ca319486bfbbc3663ea0fbe81326349

echo "Copying passwordfile /etc/bandit_pass/$myname to /tmp/$mytarget"
# Returns: Copying passwordfile /etc/bandit_pass/bandit23 to /tmp/8ca319486bfbbc3663ea0fbe81326349

cat /etc/bandit_pass/$myname > /tmp/$mytarget
# cat /tmp/8ca319486bfbbc3663ea0fbe81326349
## Returns: QYw0Y2aiA672PsMmh9puTQuhoz8SyR2G

```

To be clear, you just need to run:

```bash
cat /tmp/8ca319486bfbbc3663ea0fbe81326349
```

---

## Level 23

```bash
ssh bandit23@bandit.labs.overthewire.org -p 2220
Password: QYw0Y2aiA672PsMmh9puTQuhoz8SyR2G
```

<details>
<summary>Notes from 2020</summary>

> A program is running automatically at regular intervals from **cron**, the time-based job scheduler. Look in **/etc/cron.d/** for the configuration and see what command is being executed.
>
> **NOTE:** This level requires you to create your own first shell-script. This is a very big step and you should be proud of yourself when you beat this level!
>
> **NOTE 2:** Keep in mind that your shell script is removed once executed, so you may want to keep a copy around…

`/etc/cron.d/cronjob_bandit24` is running `/usr/bin/cronjob_bandit24.sh`, which is pasted below.

```bash
#!/bin/bash

myname=$(whoami)
# myname = bandit24

cd /var/spool/$myname
# Note: In this dir, we have write permissions, but no read permissions.
echo "Executing and deleting all scripts in /var/spool/$myname:"
for i in * .*;
do
    if [ "$i" != "." -a "$i" != ".." ];
    then
        echo "Handling $i"
        owner="$(stat --format "%U" ./$i)"
        if [ "${owner}" = "bandit23" ]; then
            timeout -s 9 60 ./$i
        fi
        rm -f ./$i
    fi
done

```

i created a temporary directory in `/tmp/zsarge`, in which i included the following script (named script.sh):
(you could also use `mktemp -d` if you want. You have permission to make any directory in `/tmp`)

```bash
#!/bin/bash

# This is the command to run:
# path=/tmp/zsarge/script.sh;path2=/var/spool/bandit24/zsarge.sh; cat $path > $path2; chmod +x $path2; watch "file $path2 && cat $path2"

# printf "$(cat /tmp/zsarge/pass)$(date)\n-" > /tmp/zsarge/pass
# echo -n 'Line of text'
echo -n "$(cat /etc/bandit_pass/bandit24)" | nc localhost 8899

```

and on a separate terminal instance, i started `nc -lvvp 8899`

Basically, I am running a shell script that reads the flag and passes it to a separate netcat connection, because writing permissions were getting weird.

I ran this all with:

```bash
path=/tmp/zsarge/script.sh;
path2=/var/spool/bandit24/zsarge.sh;
cat $path > $path2;
chmod +x $path2;
watch "file $path2 && cat $path2" # you can tell when the file has been run when this disappears
```

</details>
As of 2023, this solution has changed slightly:

The key solution here is to get a bash script to echo the password into something that is readable from another perspective. I imagine you could use a file readable by all users, but I'll use a network connection, because I know it'll work.

Open one shell as bandit23, and run:

```bash
bandit23@bandit:~$ nc -lvvp 8899
Listening on 0.0.0.0 8899
```

Open another shell as bandit23, and run:

```bash
bandit23@bandit:~$ cat /etc/cron.d/cronjob_bandit24
@reboot bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
* * * * * bandit24 /usr/bin/cronjob_bandit24.sh &> /dev/null
bandit23@bandit:~$ cat /usr/bin/cronjob_bandit24.sh
#!/bin/bash

myname=$(whoami)

cd /var/spool/$myname/foo || exit 1
echo "Executing and deleting all scripts in /var/spool/$myname/foo:"
for i in * .*;
do
    if [ "$i" != "." -a "$i" != ".." ];
    then
        echo "Handling $i"
        owner="$(stat --format "%U" ./$i)"
        if [ "${owner}" = "bandit23" ]; then
            timeout -s 9 60 ./$i
        fi
        rm -rf ./$i
    fi
done
bandit23@bandit:~$ cd /var/spool/bandit24
bandit23@bandit:/var/spool/bandit24$ # you'd probably want to use `mktemp -d` if you were experimenting for real
bandit23@bandit:/var/spool/bandit24$ cat << 'EOF' > /tmp/solve23/solve23.sh
#!/bin/bash
echo -n "$(cat /etc/bandit_pass/bandit24)" | nc localhost 8899
EOF
bandit23@bandit:/var/spool/bandit24$ chmod +x /tmp/solve23/solve23.sh
bandit23@bandit:/var/spool/bandit24$ cp /tmp/solve23/solve23.sh foo
```

Then, after the minute turns, you should see your other terminal update with:

```bash
bandit23@bandit:~$ nc -lvvp 8899
Listening on 0.0.0.0 8899
Connection received on localhost 37922
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar
```

And thus you get the password.

---

## Level 24

```bash
ssh bandit24@bandit.labs.overthewire.org -p 2220
Password: VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar
```

The prompt is:

> A daemon is listening on port 30002 and will give you the password for bandit25 if given the password for bandit24 and a secret numeric 4-digit pincode. There is no way to retrieve the pincode except by going through all of the 10000 combinations, called brute-forcing.
> You do not need to create new connections each time

Well, that seems relatively straightforward.

```bash
bandit24@bandit:~$ cd $(mktemp -d)
bandit24@bandit:/tmp/tmp.92incHlbeQ$ cat solve24.py
```

I kinda wish that Ruby was installed, but I'll do my solution in Python:

```python
# solve24.py
pass_24 = "VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar"
with open('input.txt', 'w') as f:
    for i in reversed(range(10000)):
        f.write(pass_24)
        f.write(' ')
        f.write(str(i).zfill(4))
        f.write('\n')
```

```bash
bandit24@bandit:/tmp/tmp.92incHlbeQ$ python3 solve24.py
bandit24@bandit:/tmp/tmp.92incHlbeQ$ head input.txt
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9999
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9998
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9997
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9996
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9995
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9994
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9993
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9992
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9991
VAfGXJ1PBSsPSnvsjI8p759leLZ9GGar 9990
bandit24@bandit:/tmp/tmp.92incHlbeQ$ cat script.sh
cat input.txt | nc localhost 30002 | grep -v Wrong | tee -a output.txt
bandit24@bandit:/tmp/tmp.92incHlbeQ$ time bash script.sh
I am the pincode checker for user bandit25. Please enter the password for user
 bandit24 and the secret pincode on a single line, separated by a space.
Correct!
The password of user bandit25 is p7TaowMYrmu23Ol8hiZh9UvD0O9hpx8d

Exiting.

real    0m1.284s
user    0m0.010s
sys     0m0.000s
```

Going in reverse saves a significant amount of time.

Just fyi, afterwards, I found [another solution](https://hackmd.io/@cacF2jEkTu2zEKdDrp6t0A/ry-VyPABj#level-23--gt-level-24) that used bash instead of Python.

---

## Level 25

```bash
ssh bandit25@bandit.labs.overthewire.org -p 2220
Password: p7TaowMYrmu23Ol8hiZh9UvD0O9hpx8d
```

> Logging in to bandit26 from bandit25 should be fairly easy… The shell for user bandit26 is not **/bin/bash**, but something else. Find out what it is, how it works and how to break out of it.

Hmm, interesting. Here, we are just given one file:

```bash
bandit25@bandit:~$ ls
bandit26.sshkey
```

We can copy it onto our local machine:

```bash
$ # copy bandit26.sshkey to current directory "."
$ scp -P 2220 bandit25@bandit.labs.overthewire.org:bandit26.sshkey .
```

Let's check what bandit26 is using as a shell:

```bash
bandit25@bandit:~$ cat /etc/passwd | grep bandit26
bandit26:x:11026:11026:bandit level 26:/home/bandit26:/usr/bin/showtext
bandit25@bandit:~$ cat /usr/bin/showtext
#!/bin/sh

export TERM=linux

exec more ~/text.txt
exit 0
```

Neat. So, it's just using `more` to read the file from `text.txt`, has some nice little ascii art:

```
  _                     _ _ _   ___   __
 | |                   | (_) | |__ \ / /
 | |__   __ _ _ __   __| |_| |_   ) / /_
 | '_ \ / _` | '_ \ / _` | | __| / / '_ \
 | |_) | (_| | | | | (_| | | |_ / /| (_) |
 |_.__/ \__,_|_| |_|\__,_|_|\__|____\___/
```

But, on super small screens, `more` allows to scroll through each line individually (and also enter shell commands), so you're going to need to either scrunch up your terminal super , so it's only one or two lines tall.

You should get something like this:

```
  _                     _ _ _   ___   __
 | |                   | (_) | |__ \ / /
 | |__   __ _ _ __   __| |_| |_   ) / /_
--More--(50%)
```

And now you can enter Vim by pressing `v`. From here on, you can make the screen bigger without worry.

In Vim, you can enter:

```vim
:set shell=/bin/bash
:!cat /etc/bandit_pass/bandit26
```

And you should see:

```
c7GvcKlw9mC7aUQaPx7nwFstuAIBw1o1
```

Remember not to exit this shell. You'll want it for later.

You can also enter:

```vim
:shell
```

to enter bash.

---

## Level 26

```bash
ssh bandit26@bandit.labs.overthewire.org -p 2220 -i bandit26.sshkey
(see steps above; TL;DR: Make screen small, use more -> vim -> shell)
```

Let's investigate bandit26:

```bash
bandit26@bandit:~$ ls
bandit27-do  text.txt
bandit26@bandit:~$ ./bandit27-do
Run a command as another user.
  Example: ./bandit27-do id
bandit26@bandit:~$ # ^ this seems like a lie. It really runs the command provided. You don't have to give it an id.
bandit26@bandit:~$ ./bandit27-do cat /etc/bandit_pass/bandit27
YnQpBuifNMas1hcUFk70ZmqkhUU2EuaS

```

---

## Level 27

```bash
ssh bandit27@bandit.labs.overthewire.org -p 2220
Password: YnQpBuifNMas1hcUFk70ZmqkhUU2EuaS
```

> There is a git repository at `ssh://bandit27-git@localhost/home/bandit27-git/repo` via the port `2220`. The password for the user `bandit27-git` is the same as for the user `bandit27`.
>
> Clone the repository and find the password for the next level.

Ok, seems relatively straightforward:

```bash
bandit27@bandit:~$ cd $(mktemp -d)
bandit27@bandit:/tmp/tmp.Fjjdw0yRZM$ git clone ssh://bandit27-git@localhost:2220/home/bandit27-git/repo
Cloning into 'repo'...
The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
ED25519 key fingerprint is SHA256:C2ihUBV7ihnV1wUXRb4RrEcLfXC5CXlhmAAM/urerLY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/home/bandit27/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/home/bandit27/.ssh/known_hosts).
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

bandit27-git@localhost's password:
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Compressing objects: 100% (2/2), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (3/3), done.
bandit27@bandit:/tmp/tmp.Fjjdw0yRZM$ ls
repo
bandit27@bandit:/tmp/tmp.Fjjdw0yRZM$ cd repo
bandit27@bandit:/tmp/tmp.Fjjdw0yRZM/repo$ ls
README
bandit27@bandit:/tmp/tmp.Fjjdw0yRZM/repo$ cat README
The password to the next level is: AVanL161y9rsbcJIsFHuw35rjaOM19nR
```

---

## Level 28

```bash
ssh bandit28@bandit.labs.overthewire.org -p 2220
Password: AVanL161y9rsbcJIsFHuw35rjaOM19nR
```

```bash
bandit28@bandit:~$ cd $(mktemp -d)
bandit28@bandit:/tmp/tmp.IwzWlrgiqT$ git clone ssh://bandit28-git@localhost:2220/home/bandit28-git/repo
Cloning into 'repo'...
The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
ED25519 key fingerprint is SHA256:C2ihUBV7ihnV1wUXRb4RrEcLfXC5CXlhmAAM/urerLY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/home/bandit28/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/home/bandit28/.ssh/known_hosts).
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

bandit28-git@localhost's password:
remote: Enumerating objects: 9, done.
remote: Counting objects: 100% (9/9), done.
remote: Compressing objects: 100% (6/6), done.
remote: Total 9 (delta 2), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (9/9), done.
Resolving deltas: 100% (2/2), done.
bandit28@bandit:/tmp/tmp.IwzWlrgiqT$ ls
repo
bandit28@bandit:/tmp/tmp.IwzWlrgiqT$ cd repo
bandit28@bandit:/tmp/tmp.IwzWlrgiqT/repo$ ls
README.md
bandit28@bandit:/tmp/tmp.IwzWlrgiqT/repo$ cat README.md
# Bandit Notes
Some notes for level29 of bandit.

## credentials

- username: bandit29
- password: xxxxxxxxxx

bandit28@bandit:/tmp/tmp.IwzWlrgiqT/repo$ git log --oneline
899ba88 (HEAD -> master, origin/master, origin/HEAD) fix info leak
abcff75 add missing data
c0a8c3c initial commit of README.md
bandit28@bandit:/tmp/tmp.IwzWlrgiqT/repo$ git checkout abcff75
Note: switching to 'abcff75'.

You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by switching back to a branch.

If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -c with the switch command. Example:

  git switch -c <new-branch-name>

Or undo this operation with:

  git switch -

Turn off this advice by setting config variable advice.detachedHead to false

HEAD is now at abcff75 add missing data
bandit28@bandit:/tmp/tmp.IwzWlrgiqT/repo$ cat README.md
# Bandit Notes
Some notes for level29 of bandit.

## credentials

- username: bandit29
- password: tQKvmcwNYcFS6vmPHIUSI3ShmsrQZK8S

```

---

## Level 29

```bash
ssh bandit29@bandit.labs.overthewire.org -p 2220
Password: tQKvmcwNYcFS6vmPHIUSI3ShmsrQZK8S
```

> There is a git repository at ssh://bandit29-git@localhost/home/bandit29-git/repo via the port 2220. The password for the user bandit29-git is the same as for the user bandit29.
>
> Clone the repository and find the password for the next level.

```bash\
bandit29@bandit:~$ cd $(mktemp -d)
bandit29@bandit:/tmp/tmp.yprHIM2rh2$ git clone ssh://bandit29-git@localhost:2220/home/bandit29-git/repo
Cloning into 'repo'...
The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
ED25519 key fingerprint is SHA256:C2ihUBV7ihnV1wUXRb4RrEcLfXC5CXlhmAAM/urerLY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/home/bandit29/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/home/bandit29/.ssh/known_hosts).
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

bandit29-git@localhost's password:
remote: Enumerating objects: 16, done.
remote: Counting objects: 100% (16/16), done.
remote: Compressing objects: 100% (11/11), done.
remote: Total 16 (delta 2), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (16/16), done.
Resolving deltas: 100% (2/2), done.
bandit29@bandit:/tmp/tmp.yprHIM2rh2$ ls
repo
bandit29@bandit:/tmp/tmp.yprHIM2rh2$ cd repo
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ ls
README.md
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ cat README.md
# Bandit Notes
Some notes for bandit30 of bandit.

## credentials

- username: bandit30
- password: <no passwords in production!>
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ git log --oneline
4bd5389 (HEAD -> master, origin/master, origin/HEAD) fix username
1a57cf1 initial commit of README.md
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ git branch -v
* master 4bd5389 fix username
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ git branch -r
  origin/HEAD -> origin/master
  origin/dev
  origin/master
  origin/sploits-dev
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ git switch dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.
Switched to a new branch 'dev'
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ git status
On branch dev
Your branch is up to date with 'origin/dev'.

nothing to commit, working tree clean
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ git log --oneline
13e7356 (HEAD -> dev, origin/dev) add data needed for development
8caf551 add gif2ascii
4bd5389 (origin/master, origin/HEAD, master) fix username
1a57cf1 initial commit of README.md
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ ls
code  README.md
bandit29@bandit:/tmp/tmp.yprHIM2rh2/repo$ cat README.md
# Bandit Notes
Some notes for bandit30 of bandit.

## credentials

- username: bandit30
- password: xbhV3HpNGlTIdnjUrdAlPzc2L6y9EOnS
```

---

## Level 30

```bash
ssh bandit30@bandit.labs.overthewire.org -p 2220
Password: xbhV3HpNGlTIdnjUrdAlPzc2L6y9EOnS
```

Pretty similar:

> There is a git repository at `ssh://bandit30-git@localhost/home/bandit30-git/repo` via the port `2220`. The password for the user `bandit30-git` is the same as for the user `bandit30`.
>
> Clone the repository and find the password for the next level.

```bash
bandit30@bandit:~$ cd $(mktemp -d)
bandit30@bandit:/tmp/tmp.8b3MUeH5cK$ git clone ssh://bandit30-git@localhost:2220/home/bandit30-git/repo
Cloning into 'repo'...
The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
ED25519 key fingerprint is SHA256:C2ihUBV7ihnV1wUXRb4RrEcLfXC5CXlhmAAM/urerLY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/home/bandit30/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/home/bandit30/.ssh/known_hosts).
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

bandit30-git@localhost's password:
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (4/4), 298 bytes | 298.00 KiB/s, done.
bandit30@bandit:/tmp/tmp.8b3MUeH5cK$ cd repo
bandit30@bandit:/tmp/tmp.8b3MUeH5cK/repo$ cat RERA
cat: RERA: No such file or directory
bandit30@bandit:/tmp/tmp.8b3MUeH5cK/repo$ cat README.md
just an epmty file... muahaha
bandit30@bandit:/tmp/tmp.8b3MUeH5cK/repo$ git status
On branch master
Your branch is up to date with 'origin/master'.

nothing to commit, working tree clean
bandit30@bandit:/tmp/tmp.8b3MUeH5cK/repo$ git branch -v
* master 59530d3 initial commit of README.md
bandit30@bandit:/tmp/tmp.8b3MUeH5cK/repo$ ls
README.md
# ... lots of random git commands ...
bandit30@bandit:/tmp/tmp.8b3MUeH5cK/repo$ git tag
secret
bandit30@bandit:/tmp/tmp.8b3MUeH5cK/repo$ git show secret
OoffzGDlzhAlerFJ2cAiz1D41JW1Mhmt
```

---

## Level 31

```bash
ssh bandit31@bandit.labs.overthewire.org -p 2220
Password: OoffzGDlzhAlerFJ2cAiz1D41JW1Mhmt
```

> There is a git repository at `ssh://bandit31-git@localhost/home/bandit31-git/repo` via the port `2220`. The password for the user `bandit31-git` is the same as for the user `bandit31`.
>
> Clone the repository and find the password for the next level.

`git gud` is not a command 😔

```
bandit31@bandit:~$ cd $(mktemp -d)
bandit31@bandit:/tmp/tmp.BE1pSk6O9E$ git clone ssh://bandit31-git@localhost:2220/home/bandit31-git/repo
Cloning into 'repo'...
The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
ED25519 key fingerprint is SHA256:C2ihUBV7ihnV1wUXRb4RrEcLfXC5CXlhmAAM/urerLY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/home/bandit31/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/home/bandit31/.ssh/known_hosts).
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

bandit31-git@localhost's password:
remote: Enumerating objects: 4, done.
remote: Counting objects: 100% (4/4), done.
remote: Compressing objects: 100% (3/3), done.
remote: Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (4/4), done.
bandit31@bandit:/tmp/tmp.BE1pSk6O9E$ ls
repo
bandit31@bandit:/tmp/tmp.BE1pSk6O9E$ cd repo
bandit31@bandit:/tmp/tmp.BE1pSk6O9E/repo$ ls
README.md
bandit31@bandit:/tmp/tmp.BE1pSk6O9E/repo$ cat README.md
This time your task is to push a file to the remote repository.

Details:
    File name: key.txt
    Content: 'May I come in?'
    Branch: master

bandit31@bandit:/tmp/tmp.BE1pSk6O9E/repo$ echo 'May I come in?' > key.txt
bandit31@bandit:/tmp/tmp.BE1pSk6O9E/repo$ git add key.txt -f
bandit31@bandit:/tmp/tmp.BE1pSk6O9E/repo$ git status
On branch master
Your branch is up to date with 'origin/master'.

Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        new file:   key.txt

bandit31@bandit:/tmp/tmp.BE1pSk6O9E/repo$ git commit -m "solve 31"
[master 9f5f592] solve 31
 1 file changed, 1 insertion(+)
 create mode 100644 key.txt
bandit31@bandit:/tmp/tmp.BE1pSk6O9E/repo$ git push
The authenticity of host '[localhost]:2220 ([127.0.0.1]:2220)' can't be established.
ED25519 key fingerprint is SHA256:C2ihUBV7ihnV1wUXRb4RrEcLfXC5CXlhmAAM/urerLY.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Could not create directory '/home/bandit31/.ssh' (Permission denied).
Failed to add the host to the list of known hosts (/home/bandit31/.ssh/known_hosts).
                         _                     _ _ _
                        | |__   __ _ _ __   __| (_) |_
                        | '_ \ / _` | '_ \ / _` | | __|
                        | |_) | (_| | | | | (_| | | |_
                        |_.__/ \__,_|_| |_|\__,_|_|\__|


                      This is an OverTheWire game server.
            More information on http://www.overthewire.org/wargames

bandit31-git@localhost's password:
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 2 threads
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 321 bytes | 321.00 KiB/s, done.
Total 3 (delta 0), reused 0 (delta 0), pack-reused 0
remote: ### Attempting to validate files... ####
remote:
remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
remote:
remote: Well done! Here is the password for the next level:
remote: rmCBvG56y58BXzv98yZGdO7ATVL5dW8y
remote:
remote: .oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.oOo.
remote:
To ssh://localhost:2220/home/bandit31-git/repo
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'ssh://localhost:2220/home/bandit31-git/repo'
```

---

## Level 32

```bash
ssh bandit32@bandit.labs.overthewire.org -p 2220
Password: rmCBvG56y58BXzv98yZGdO7ATVL5dW8y
```

It's worth noting that even with `-t` (i.e. `ssh bandit32@bandit.labs.overthewire.org -p 2220 -t /bin/bash`), you still get put in the "UPPERCASE SHELL"

```
WELCOME TO THE UPPERCASE SHELL
>> ls
sh: 1: LS: Permission denied
```

Ok, this took me a bit of researching, but apparently `$0` is a standard way of escaping from restricted shells:

```
>> $0
$ ls
uppershell
$ pwd
/home/bandit32
$ cat /etc/bandit_pass/bandit33
odHo63fHiFqcWWJG9rLiLDtPm45KzUKy
```

Read more here:

- <https://0xffsec.com/handbook/shells/restricted-shells/>
- <https://bash.cyberciti.biz/guide/$0>

---

## Level 33

```bash
ssh bandit33@bandit.labs.overthewire.org -p 2220
Password: odHo63fHiFqcWWJG9rLiLDtPm45KzUKy
```

```
bandit33@bandit:~$ ls
README.txt
bandit33@bandit:~$ cat README.txt
Congratulations on solving the last level of this game!

At this moment, there are no more levels to play in this game. However, we are constantly working
on new levels and will most likely expand this game with more levels soon.
Keep an eye out for an announcement on our usual communication channels!
In the meantime, you could play some of our other wargames.

If you have an idea for an awesome new level, please let us know!
```
