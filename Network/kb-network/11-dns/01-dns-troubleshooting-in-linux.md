---
type: reference
title: DNS Troubleshooting in Linux
description: "Step-by-step DNS troubleshooting in Linux: resolv.conf, ping, nmap, whois and related checks."
tags: [dns, linux, troubleshooting, networking, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/NetworkKB#10.1"
---

# 10.1 DNS Troubleshooting in Linux

[↑ DNS](/Network/kb-network/11-dns/README.md)

```text
I will take one scenario “suppose my client is unable to resolve host-names to IP address”

Step1:Check the DNS server is configured on Client end or not

check in below file if name server is configured to proper DNS server or not
#vi /etc/resolv.conf

If the client is configured with proper DNS server follow to next step

Stpe2:Ping to DNS server ip address

#ping serveripadd

If pinging is happening proceed with the next step other wise click here to do network troubleshooting.

Step3:So pinging is happening… then there is a communication path between Server-client, so we have to check weather DNS server is running or not. Here nmap can be used to check what ports opened on server.

#nmap serveripadd

Example:

#nmap 125.22.73.23

this command will give you output what are the services running/ports opened on remote server, if DNS server is running and working fine means you can see DNS port(53) in the list of opened ports. If suppose server is not running/port blocked you can click here to troubleshoot in this way.

Step4:Now checking DNS server issue in deep

    Checking under whom the DNS server is register and its properties .

#whois example.com

    Checking what server is used to resolve and some basic info.

#nslookup www.example.com

    Checking who is resolving and what is resolving in details about DNS server.

#dig www.example.com
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Dynamic DNS (DDNS)](/Network/dynamic-dns-ddns.md)
<!-- backlinks:end -->
