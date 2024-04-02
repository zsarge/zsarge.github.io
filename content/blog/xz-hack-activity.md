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


## What's this about a killswitch?

TODO

## Further Reading

I consulted a bunch of resources when building this list.
Here's a compilation of the resources I found to be helpful.

- Wikipedia: <https://en.wikipedia.org/wiki/XZ_Utils_backdoor>
- Andres Freund's Announcement: <https://www.openwall.com/lists/oss-security/2024/03/29/4>
    - Andres Freund's Mastodon Post: <https://mastodon.social/@AndresFreundTec/112180083704606941>
-  xzbot: <https://github.com/amlweems/xzbot>
    - Credit: Anthony Weems [GitHub](https://github.com/amlweems), [Mastodon](https://infosec.exchange/@amlw)
    - [Docker testbed for xzbot](https://github.com/dguerri/exploits-collection/tree/main/xz-5.6.1-backdoor)
- Timeline: <https://research.swtch.com/xz-timeline>
- The xz attack shell script: <https://research.swtch.com/xz-script>
- Ars Technica Overview: <https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/>
- Timing analysis: <https://rheaeve.substack.com/p/xz-backdoor-times-damned-times-and>
- Killswitch: <https://piaille.fr/@zeno/112185928685603910?ref=connortumbleson.com>
    - <https://gist.github.com/q3k/af3d93b6a1f399de28fe194add452d01>
- "Watching xz unfold from afar": <https://connortumbleson.com/2024/03/31/watching-xz-unfold-from-afar/>



