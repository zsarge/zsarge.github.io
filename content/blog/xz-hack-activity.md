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


## Understanding the mechanics

As has been covered extensively [elsewhere](#further-reading), this backdoor involved a sophisticated process in which the binaries distributed to users is different from what was on GitHub (before it was deleted), so that the backdoor could not be found by auditing the code.

As such, if we want to exploit this vulnerability, it is important to first find


## Random Notes (to be organized)

- There are quite a lot of contingent factors

## What's this about a killswitch?

TODO

## Further Reading

I consulted a bunch of resources when building this list.
Here's a compilation of the resources I found to be helpful, with the date they were first posted.

- xzbot: <https://github.com/amlweems/xzbot>
    - Credit: Anthony Weems [GitHub](https://github.com/amlweems), [Mastodon](https://infosec.exchange/@amlw)
    - [Docker testbed for xzbot](https://github.com/dguerri/exploits-collection/tree/main/xz-5.6.1-backdoor)
- [Wikipedia](https://en.wikipedia.org/wiki/XZ_Utils_backdoor)

- [Andres Freund's Announcement](https://www.openwall.com/lists/oss-security/2024/03/29/4) (2024-03-29)
    - [Andres Freund's Mastodon Post](https://mastodon.social/@AndresFreundTec/112180083704606941) (2024-03-29)
- [CVE-2024-3094 published](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) (2024-03-29)
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
- [Timeline](https://research.swtch.com/xz-timeline) (2024-04-01)
- [The xz attack shell script](https://research.swtch.com/xz-script) (2024-04-02)
- [Ars Technica Overview](https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/) (2024-04-01)
- [What Everyone Missed About The Linux Hack](https://youtu.be/0pT-dWpmwhA) (2024-04-01)
- [ThePrimeagen & Low Level Learning: "xz Exploit Is WILD - Must See Bash Part"](https://youtu.be/LaRKIwpGPTU) (2024-04-01)
- ["reflections on distrusting xz"](https://joeyh.name/blog/entry/reflections_on_distrusting_xz/) (2024-04-03)
- [Low Level Learning - "revealing the features of the XZ backdoor"](https://youtu.be/vV_WdTBbww4) (2024-04-03)

