---
title: "Bard, ChatGPT, and Bing Chat explaining a CVE"
description: "A quick comparison of how Bard, ChatGPT, and Bing Chat are able to evaluate a CVE report, inspired by a conversation I had with a friend."
pubDate: "2023-03-31"
tags:
  - genai
  - chatbot
---

<link rel="stylesheet" href="/chatbot-comparison/chatbot.css">

After [my last chatbot comparison](/blog/chatbot-comparison.html), this is a quick, surface-level
comparison of how Bard, ChatGPT, and Bing Chat are able to interpret and understand a
<abbr title="Common Vulnerabilities and Exposures">CVE</abbr> report.

This report will compare and contrast the outputs of the following chatbot services:

| Service                                | Version Number                         | Date Released               |
| -------------------------------------- | -------------------------------------- | --------------------------- |
| [Bard](https://bard.google.com/)       | 0.2.0                                  | March 21, 2023              |
| [ChatGPT](https://chat.openai.com)     | Mar 14 Version. Free Research Preview. | [March 14, 2023][openai]    |
| [Bing Chat](https://www.bing.com/chat) | \[does not use version numbers\]       | [March 31, 2023][microsoft] |

[microsoft]: https://blogs.bing.com/search/march_2023/TITLE-Bing-Preview-Release-Notes-Image-Video-Search
[openai]: https://help.openai.com/en/articles/6825453-chatgpt-release-notes#h_0eb2784e11

## About the CVE

We will be asking these chatbots about [CVE-2020-29143](https://nvd.nist.gov/vuln/detail/CVE-2020-29143).

From the CVE page, this exploit is described as:

<div class="blockquote">
A SQL injection vulnerability in `interface/reports/non_reported.php` in OpenEMR before 5.0.2.5 allows a remote authenticated attacker to execute arbitrary SQL commands via the `form_code` parameter.
</div>

## Chatbot responses

<blockquote class="human">
Can you tell me about CVE-2020-29143?
</blockquote>

<blockquote class="chatgpt">
<span class="chatgpt-title">ChatGPT</span>

Sure, CVE-2020-29143 is a Common Vulnerabilities and Exposures (CVE) ID that was assigned to a vulnerability that affects multiple products and platforms that use the Linux kernel.

The vulnerability was discovered in November 2020 and was publicly disclosed in December 2020. It was rated as a high severity vulnerability with a CVSS score of 7.8.

The vulnerability exists in the kernel's implementation of the Berkeley Packet Filter (BPF), a feature that allows programs to filter network packets as they are received or sent. An attacker can exploit this vulnerability by sending a specially crafted network packet to a vulnerable system, which can then trigger a buffer overflow and allow the attacker to execute arbitrary code with elevated privileges.

The vulnerability affects a wide range of Linux distributions and products, including Red Hat Enterprise Linux, Ubuntu, Debian, CentOS, and others. Vendors have released patches to address the vulnerability, and it is recommended that affected systems are updated as soon as possible to prevent exploitation.

</blockquote>

Well, that's just not true at all. This CVE does not has nothing to do with the Linux Kernel. All of ChatGPT's information about how this vulnerability targets the kernel's packet filter is completely made up. However, Bard and Bing are both intended to help much more with this type of factual search, so let's see how they fare.

<blockquote class="bard">
<span class="bard-title">Bard</span>

CVE-2020-29143 is a SQL injection vulnerability in OpenEMR before 5.0.2.5. This vulnerability allows a remote authenticated attacker to execute arbitrary SQL commands via the form_code parameter.

The vulnerability exists in the way that OpenEMR handles the form_code parameter in the interface/reports/non_reported.php file. When a user submits a report, the form_code parameter is used to identify the report. However, the parameter is not properly sanitized, which allows an attacker to inject arbitrary SQL commands.

If an attacker is able to exploit this vulnerability, they could execute arbitrary SQL commands on the affected system. This could allow them to steal data, modify data, or even take control of the system.

The vulnerability was discovered by and reported to OpenEMR by security researcher Orange Tsai of DEVCORE. OpenEMR has released a patch for the vulnerability, which is available in version 5.0.2.5.

To exploit this vulnerability, an attacker would need to be able to submit a report to OpenEMR. This could be done by visiting the OpenEMR website and submitting a report, or by sending a malicious email to a user who is authorized to submit reports.

Once the attacker has submitted a report, they would need to include a specially crafted form_code parameter in the report. The form_code parameter would need to contain SQL commands that the attacker wants to execute.

If the attacker is successful in exploiting this vulnerability, they could execute arbitrary SQL commands on the affected system. This could allow them to steal data, modify data, or even take control of the system.

To protect against this vulnerability, users should upgrade to OpenEMR version 5.0.2.5 or later. If users are unable to upgrade, they should disable the ability to submit reports.

</blockquote>

In my opinon, Bard does a great job summarizing the information on the CVE page. As ChatGPT training data cuts off in in September 2021, this CVE from 2020 should still be fair game. However, it may not have been included directly, so ChatGPT may be more inclined to engage in speculation based on general knowledge of CVEs, rather than knowledge of this specific example. Bard, on the other hand, constantly pulls information from the the entire web, and is much better for factual searches.

<aside>
However, this does not guarantee that Bard's information is accurate. In one entertaining instance, Google Bard used a 6-hour-old internet comment to "prove" that Google Bard was shutting down.

You can read more on [Twitter](https://twitter.com/juanbuis/status/1638289186351456257) and [Hacker News](https://news.ycombinator.com/item?id=35255864).

</aside>

But anyway, based on my understanding, this is an accurate summary of this CVE.

<blockquote class="bing">
<span class="bing-title">Bing (Precise)</span>

CVE-2020-29143 is a **SQL injection vulnerability** in interface/reports/non_reported.php in **OpenEMR** before 5.0.2.5. [It allows a remote authenticated attacker to execute arbitrary SQL commands via the form_code parameter][1]. Is there anything else you would like to know?

---

Learn more: 1. [nvd.nist.gov][1] 2. [cve.mitre.org][2] 3. [cvedetails.com][3] 4. [nvd.nist.gov][4]

[1]: https://nvd.nist.gov/vuln/detail/CVE-2020-29143
[2]: https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-29143
[3]: https://www.cvedetails.com/cve/CVE-2020-29143
[4]: https://nvd.nist.gov/vuln/detail/CVE-2022-29143

</blockquote>

Bing provides a very limited summary, and focuses on mostly providing links to other sources. But, I like it; it's short and helpful for those looking for a quick overview.

<blockquote class="human">
How can I protect against it?
</blockquote>

I've gotten so used to using pronouns with these chatbots, but the fact that I can effortlessly use "it" and have the context be properly understood should not be taken for granted.

<blockquote class="chatgpt">
<span class="chatgpt-title">ChatGPT</span>

The best way to protect against CVE-2020-29143 is to ensure that your system is updated with the latest security patches. Most Linux distributions and products have released patches to address this vulnerability, so it is recommended that you install the latest updates as soon as possible.

In addition to applying patches, you can also take the following steps to reduce the risk of exploitation:

1. Implement strict network security policies: Restricting network access to trusted sources and implementing strict firewall rules can help prevent attackers from exploiting the vulnerability.

2. Limit user privileges: Limiting user privileges to only what is necessary can help reduce the impact of a successful attack.

3. Monitor for signs of exploitation: Regularly monitoring system logs and network traffic for unusual activity can help detect signs of exploitation.

4. Use intrusion detection and prevention systems: Intrusion detection and prevention systems can help identify and block attacks targeting the vulnerability.

5. Consider implementing exploit mitigation techniques: Some Linux distributions and products offer exploit mitigation techniques such as address space layout randomization (ASLR) and stack smashing protection (SSP), which can help make it more difficult for attackers to successfully exploit the vulnerability.

</blockquote>

Once again, ChatGPT is just hallucinating here. It's technically true that updating is important to addressing this CVE, but ChatGPT continues to reuse its previous guess that this was a vulnerability relating to the Linux Kernel.

<blockquote class="bard">
<span class="bard-title">Bard</span>

To protect against CVE-2020-29143, you can do the following:

- Upgrade to OpenEMR version 5.0.2.5 or later.
- If you are unable to upgrade, disable the ability to submit reports.
- Use a web application firewall (WAF) to block SQL injection attacks.
- Keep your software up to date with the latest security patches.
- Implement strong passwords and change them regularly.
- Use two-factor authentication whenever possible.
- Educate your users about security best practices.
- Monitor your system for suspicious activity.
- Have a plan in place to respond to a security breach.

</blockquote>

This is a very impressive breakdown of the best steps to address this CVE.

The first two bullet points are great: it gets the version number correct, and correctly identifies the simplest way to address the issue while also anticipating other courses of action if updates are not possible.

Using a web application firewall seems like a reasonable option to address SQL injections, although it may be considerably more involved than the other bullet points.

Beyond that, the rest of Bard's advice is just general cybersecurity recommendations, but they are still good to hear in comparison to ChatGPT's derranged ramblings.

<blockquote class="bing">
<span class="bing-title">Bing (Precise)</span>

One way to protect against this vulnerability is to update OpenEMR to a version that is 5.0.2.5 or later. This should fix the vulnerability and prevent attackers from exploiting it.

</blockquote>

Once again, Bing is the shortest and most succinct. It's correct, and relevant in this instance, so I can't ask for too much more than that.

Compared to Bard, I'm honestly not sure which answer I prefer.

As a standalone, I like Bard's answer more as it's more comprehensive, but, as part of a chatting experience, I find that Bing's succinct responses are more easy to work with, as it is possible for the user to ask for more information when necessary.

## Conclusion

In conclusion, while ChatGPT can sometimes provide accurate information, it is also succeptible to complete and confident hallucination.

In comparison, Bard and Bing chat do a much better job of providing accurate information synthesized from multiple sources.

However, in the bigger picture, it is important to remember that none of these chatbots are close to perfect, and should not be completely trusted.

As with [my last comparison](/blog/chatbot-comparison.html), Bing is my personal favorite. This time, I think that Bard had a promising showing, and it's clear that ChatGPT performed the worst.

It will be very interesting to continue to follow these chatbots as they grow and develop, and see if it is possible to consistently extract accurate information from a Large Language Model. After all, there's no algorithm for truth.
