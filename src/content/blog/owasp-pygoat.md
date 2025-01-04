---
title: OWASP PyGoat
description: A selection of solutions from OWASP PyGoat
pubDate: 2099-10-30
planned: true
tags:
  - python
  - cybersecurity
---

## About

> The purpose is to give both developers and testers a platform for learning how to test applications and how to code securely. PyGoat is written in python and used Django web framework as a platform. It has both traditional web application vulnerabilities (i.e. XSS, SQLi) as well.
> PyGoat also has an area where you can see the source code to determine where the mistake was made that caused the vulnerability and allows you to make changes to secure it.
>
> &mdash; [OWASP PyGoat](https://owasp.org/www-project-pygoat/)

## Installation

To run this on your machine, I recommend using [docker](https://docs.docker.com/get-docker/).

```bash
docker run --rm -p 8000:8000 pygoat/pygoat:latest
```

or, if you're embedding this in a hosted VM for distribution,

```bash
docker run --restart always -d -p 8000:8000 pygoat/pygoat:latest
```

then, head to `http://localhost:8000` to start.

## Create your account

Note that it's possible to create an account with a password that cannot be used to log in.

I recommend using your browser's 'suggest password' feature to ensure you find a secure password that is sure to be accepted.

![Create your account](/assets/pygoat/image-20231030202746142.png)

## A1: SQL Injection

For some reason, this lab question is broken. I haven't been able to debug this, so we're just skipping it. If you're interested in learning more, check out the [SQL injections](https://zack.fyi/blog/juice-shop-injection.html) for Juice Shop.

## A1: Command Injection

This exploit revolves around an application that will take any domain you enter, and run the command `dig $INPUT`. As such, you are able to manipulate the command by appending additional commands.

On Linux, the intended use case is to enter something like `google.com`, the application executes `dig google.com` and see:

```
; <<>> DiG 9.16.27-Debian <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 9297
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4000
;; QUESTION SECTION:
;google.com.			IN	A

;; ANSWER SECTION:
google.com.		255	IN	A	142.250.190.110

;; Query time: 4 msec
;; SERVER: 172.28.102.11#53(172.28.102.11)
;; WHEN: Thu Nov 02 01:07:46 UTC 2023
;; MSG SIZE  rcvd: 55
```

However, if we entered something like `-v`, we see:

```
DiG 9.16.27-Debian
```

Indicating we have complete control over the command being executed.

The example is to use `google.com && dir` or `google.com; dir` to append a list of files in the current directory to the output of `dig`.

But, we could also enter something like `> /dev/null; dir` to only get the output we're looking for. From there, it's basically a normal shell.

**Takeaway:** Do not append user input to executable commands.

## A2: Broken Authentication

The steps to exploit this are well defined within the lab description:

> 1. Open Burpsuite and configure your browser to intercept the web trafic, but don't turn intercept on.
> 2. Send the otp to the admins mail id with the help of send otp feature.
> 3. In the enter the otp box enter a random 3 digit number.
> 4. Before your press login , turn intercept on on Burp suite and then press log in
> 5. Now you can see that the traffic is captured in Burpsuite.
> 6. Now use the send to intruder feature and send this request to the intruder.
> 7. Set the position of the payload to the `otp=` parameter.
> 8. Go to the payloads session and choose the payload type to number list
> 9. Fill the range to 100 to 999 with step 1.
> 10. Now click attack and you can see that the burp suite tries different combinations of otp and collects it response.
> 11. You can figure out if it has guessed the correct opt by seeing the difference in length of the response for each request.
> 12. The correct otp will have a small response length .
>
> &mdash; [Solutions to all the Lab Exercises](https://github.com/adeyosemanputra/pygoat/blob/7f3bb8d26d5331658baea9182265a4975ad42abf/Solutions/solution.md#steps-to-brute-force)

However, I wanted to walk through this list with screenshots.

1. Open Burpsuite and configure your browser to intercept the web trafic, but don't turn intercept on.

![Open Burpsuite, navigate to the lab, and ensure intercept is off.](/assets/pygoat/Screenshot from 2023-11-01 21-20-17.png)

2. Send the otp to the admins mail id with the help of send otp feature.

![Access the lab](/assets/pygoat/image-20231101212633246.png)

Notice at this point that we can try to enter `admin` / `admin` as username/password, but we get the error: "Wrong Password Try Using Login With OTP".

<aside>
**OTP**

OTP stands for *O*ne-*t*ime *P*assword. Every time you've had to type in a series of numbers to log in with two-factor authentication, you've used an OTP.

</aside>

So, if we click "Login Through Otp", we get this form:

<img src="/assets/pygoat/image-20231101213020259.png" alt="OTP Login Form" style="zoom:67%;" />
