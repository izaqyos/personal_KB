---
type: reference
title: "Known Vulnerabilities, PSIRTs"
description: Section 11 of the legacy sslKB notes.
tags: [kb-ssl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#11"
---

# Known Vulnerabilities, PSIRTs

[↑ sslKB](/Network/kb-ssl/README.md)

## 11.1 BEAST

```text
[employer-specific content moved to private KB, 2026-10]

	--> some links on the subject
http://www.educatedguesswork.org/2011/09/security_impact_of_the_rizzodu.html
http://www.imperialviolet.org/2011/09/23/chromeandbeast.html
	https://bugzilla.redhat.com/show_bug.cgi?id=737506
http://www.mail-archive.com/openssl-dev@openssl.org/msg10664.html
http://en.wikipedia.org/wiki/WebSocket
http://en.wikipedia.org/wiki/Same_origin_policy
http://en.wikipedia.org/wiki/Block_cipher_modes_of_operation
https://psirt.cisco.com/PSIRThot/BEAST-SSL-TLS
--------------------------------------------------------------------------------
http://blogs.cisco.com/security/beat-the-beast-with-tls/  :

Cisco Blog > Security
Beat the BEAST with TLS 1.1/1.2 and More
Omar Santos
Omar Santos | September 26, 2011 at 11:48 am PST
6,151 5

Juliano Rizzo and Thai Duong presented a new attack on Transport Layer Security (TLS) at the Ekoparty security conference in Buenos Aires, Argentina. This presentation has received a lot of media attention and also has caused a lot of confusion, especially since all the details were unknown. The researchers named their proof-of-concept tool â€œBrowser Exploit Against SSL/TLSâ€ (BEAST) and are suggesting that it can decrypt secure cookies in minutes. The protocol deficiency they are highlighting is a problem that is due to the way that block ciphers are used in SSL/TLS.

There are several ways that block ciphers generally operate (i.e., how encrypted blocks are manipulated to ensure complete confidentiality).  Cipher Block Chaining (CBC mode), is used in SSL for all block ciphers, including AES and Triple-DES (3DES). The BEAST attack relies on a weakness in the way CBC mode is used in SSL/TLS.  In addition to CBC mode there are other non-CBC cipher suites, such as those using the RC4 stream encryption algorithm, that are not vulnerable to the BEAST.  Additionally, TLS versions 1.1 (RFC 4346) and 1.2 (RFC 5246) are not affected by this issue. In TLS version 1.1 the implicit Initialization Vector (IV) was replaced with an explicit IV. Also, Datagram Transport Layer Security (DTLS) protocol versions 1.0 and 1.2 are not affected (DTLS is defined in RFC 4347).

Note: Nickm from the Tor Project does a good job introducing the basics on his blog for people who donâ€™t know all the technical details about the TLS protocols and CBC.

Another thing to highlight is that OpenSSL implemented a feature where they send an â€œempty TLS recordâ€ immediately before they send a message. This empty TLS record causes a change in the CBC state where people consider it to give the message â€œa new IVâ€ that the attacker canâ€™t predict.  This feature in OpenSSL is disabled with the â€œSSL_OP_DONT_INSERT_EMPTY_FRAGMENTSâ€ option and itâ€™s also included in the â€œSSL_OP_ALLâ€ option.  In OpenSSL versions 0.9.6d and later, the protocol-level mitigation is enabled by default, thus making it not vulnerable to the BEAST attack.

For applications that use OpenSSL, this â€œempty-recordâ€ trick can be enabled as a workaround. For a more permanent solution, the adoption of TLS 1.1/1.2 is whatâ€™s needed.  Unfortunately, even though TLS 1.1 has been out since 2006 it isnâ€™t widely implemented or deployed. TLS versions 1.1 and 1.2 are now supported in OpenSSL version 1.0.1-stable, which you can get from the â€œsnapshotâ€ section of the OpenSSL website. Once OpenSSL 1.0.1 is â€œofficially out,â€ it is expected that many people will be migrating to it. The main challenge is compatibility with some browsers. Microsoft Internet Explorer 9 and Opera web browsers support TLS 1.1 and 1.2.  Safari, Chrome and Mozilla Firefox do not support TLS 1.1 and 1.2. Chrome has a fix for this issue and Safari/Chrome teams are already working on one, as well.

In summary, this attack is not the end of the world. However, it certainly highlights the importance of migrating to TLS 1.1/1.2. The following are a few interesting blog posts and articles that also talk about the attack and mitigations/workarounds:

    Slaying BEAST: Mitigating the latest SSL/TLS Vulnerability

    Tor and the BEAST SSL attack

    BEAST Hack Threatens Security of Webmail, Online Shopping

Leave a comment
5 Comments.

    Ryan Kogelheide October 18, 2011 at 9:51 pm

    Iâ€™m not sure, but I read that SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS -disables- the mitigation by default.
    Reply
    Omar Santos October 22, 2011 at 9:10 pm

    Hi Ryan,

    Yes, the â€œSSL_OP_DONT_INSERT_EMPTY_FRAGMENTSâ€ disables the â€œempty TLS recordâ€ in OpenSSL.

    â€œThis feature in OpenSSL is disabled with the â€œSSL_OP_DONT_INSERT_EMPTY_FRAGMENTSâ€ option and itâ€™s also included in the â€œSSL_OP_ALLâ€ option.â€ More information is at:

    http://www.openssl.org/docs/ssl/SSL_CTX_set_options.html

    Thanks!
    Omar

--------------------------------------------------------------------------------
https://blog.torproject.org/blog/tor-and-beast-ssl-attack :
Tor and the BEAST SSL attack
Posted September 23rd, 2011 by nickm
in

    internals
    security
    ssl

Today, Juliano Rizzo and Thai Duong presented a new attack on TLS <= 1.0 at the Ekoparty security conference in Buenos Aires. Let's talk about how it works, and how it relates to the Tor protocol.

Short version: Don't panic. The Tor software itself is just fine, and the free-software browser vendors look like they're responding well and quickly. I'll be talking about why Tor is fine; I'll bet that the TBB folks will have more to say about browsers sometime soon.

There is some discussion of the attack and responses to it out there already, written by seriously smart cryptographers and high-test browser security people. But I haven't seen anything out there yet that tries to explain what's going on for people who don't know TLS internals and CBC basics.

So I'll do my best. This blog post also assumes that I understand the attack. Please bear with me if I'm wrong about that.

Thanks to the authors of the paper for letting me read it and show it to other Tor devs. Thanks also to Ralf-Philipp Weinmann for helping me figure the analysis out.
The attack
How the attack works: Basic background

This writeup assumes that you know a little bit of computer stuff, and you know how xor works.

Let's talk about block ciphers, for starters. A block cipher is a cryptographic tool that encrypts a small chunk of plaintext data into a same-sized chunk of encrypted data, based on a secret key.

In practice, you want to encrypt more than just one chunk of data with your block cipher at a time. What do you do if you have a block cipher with a 16-byte block (like AES), when you need to encrypt a 256-byte message? When most folks first consider this problem, they say something like "Just split the message into 16-byte chunks, and encrypt each one of those." That's an old idea (it's called ECB, or "electronic codebook"), but it has some serious problems. Most significantly, if the same 16-byte block appears multiple times in the plaintext, the ciphertext will also have identical blocks in the same position. The Wikipedia link above has a cute demonstration of this.

Okay, so nobody reasonable uses ECB. Some people, though, do use a mode called CBC, or "Cipher Block Chaining." With CBC, when you want to encrypt a message, you start your ciphertext message with a single extra random block, or IV ("initialization vector"). Now, when you go to encrypt each plaintext block to get its ciphertext block, you first xor the plaintext with the previous ciphertext. (So you xor the IV with the first plaintext block, encrypt that, and output it. Then you xor that ciphertext block with the second plaintext block, encrypt that, output it, and so on. The Wikipedia page has pretty good examples and illustrations here too.)

TLS and its earlier incarnation, SSL, are the encryption protocols that many applications, including Tor, use to send streams of encrypted data. They use CBC mode for most of their block ciphers. Unfortunately, before TLS version 1.1, they made a bad mistake. Instead of using a new random IV for every TLS message they sent, they used the ciphertext of the last block of the last message as the IV for the next message.

Here's why that's bad. The IV is not just supposed to be random-looking; it also needs to be something that an attacker cannot predict. If I know that you are going to use IV x for your next message, and I can trick you into sending a message that starts with a plaintext block of [(NOT x) xor y], then you will encrypt y for me.

That doesn't sound too bad. But Wei Dai and Gregory V. Bard both found ways to exploit this to learn whether a given ciphertext block corresponds to a given plaintext. The attacker makes the user encrypt C' xor p, where p is the guessed plaintext and C' is the ciphertext block right before where the attacker thinks that plaintext was. If the attacker guessed right, then the user's SSL implementation outputs the same ciphertext as it did when it first encrypted that block.

And even that doesn't sound too bad, even in retrospect. In order to mount this attack, an adversary would need to be watching your internet connection, and be able to force you to start your next TLS record with a given string of his choice, and be able to guess something sensitive that you said earlier, and guess which part of your TLS stream might have corresponded to it.

Nevertheless, crypto people implemented workarounds. Better safe than sorry! In version 1.1 of the TLS protocol, every record gets a fresh IV, so the attacker can't know the IV of the next message in advance. And OpenSSL implemented a fix where, whenever they're about to send a TLS record, they send an empty TLS record immediately before, and then send the record with the message in it. The empty TLS record is enough to make the CBC state change, effectively giving the real message a new IV that the attacker can't predict.

These fixes haven't gotten very far in the web world, though. TLS 1.1 isn't widely implemented or deployed, even though the standard has been out since 2006. And
OpenSSL's "empty record" trick turns out to break some non-conformant SSL implementations, so lots of folks turn it off. (The OpenSSL manual page for the option in question even says that "it is usually safe" to do so.)

I suppose that, at the time, this seemed pretty reasonable. Guessing a plaintext is hard: there are something like 3.4 x 10^38 possible values. But as they say, attacks only get better.
How the attack works: What's new as of today

Juliano Rizzo and Thai Duong have two contributions, as I see it. (And please correct me if I'm getting this wrong; I have not read the literature closely!) First, they came up with a scenario to implement a pretty clever variation of Dai's original attack.

Here's a simplified version, not exactly as Rizzo and Duong present it. Let's suppose that, for some reason, the user has a secret (like a web cookie) that they send in every TLS record. And let's assume also that the attacker can trick the user into inserting any number of characters in their plaintext at the start of the record right before the secret. So the plaintext for every record is "Evil | Secret", where Evil is what the attacker chooses, and Secret is the secret message. Finally, let's suppose that the attacker can make the user send as many records as he wants.

The ability to decide where block boundaries fall turns out to be a big deal. Let's suppose that instead of filling up a full plaintext block with 16 bytes of Evil, the attacker only fills up 15 bytes... so the block will have 15 bytes the attacker controls, and one byte of the secret.

Whoops! There are only 256 possible values for a single byte, so the attacker can guess each one in turn, and use the older guess-checking attack to see if he guessed right. And once the attacker knows the first byte, he starts sending records with 14 attacker-controlled bytes, one byte that he knows (because he made a bunch of guesses and used the older attack to confirm which was right), and one byte that he doesn't. Again, this block has only 256 possible values, and so guessing each one in turn is efficient.

They then show how to extend this to cases where the attacker doesn't actually control the start of the block, but happens to know (or is able to guess) it, and make other extensions to the attack.

The second neat facet of Duong and Rizzo's work is that they actually found some ways to make this attack work against web browsers. That's no mean feat! You need to find a way to trick a web client into sending requests where you control enough of the right parts of them to mount this attack, and you need to be able to do it repeatedly. It seems to have taken a lot of HTTP hackery, but it seems they managed to do it. There's more detailed information here at Eric Rescorla's blog, and of course once Juliano and Thai have their paper out, there will be even more to goggle at. This is really clever stuff IMO.

[Disclaimer: Again, I may have made mistakes above; if so, I will correct it when I wake up in the morning, or sooner. Please double-check me if you know this work better than I do.]
So, does this attack work on Tor?

Nope.

Tor uses OpenSSL's "empty fragment" feature, which inserts a single empty TLS record before every record it sends. This effectively randomizes the IV of the actual records, like a low-budget TLS 1.1. So the attack is simply stopped.

This feature has been in OpenSSL since 0.9.6d: see item 2 in Bodo MÃ¼ller's good old CBC writeup for full details on how it works. It makes our SSL incompatible with some standards-non-compliant TLS implementations... but we don't really care there, since all of the TLS implementations that connect to the Tor network are OpenSSL, or are compatible with it.

Tor requires OpenSSL 0.9.7 or later, and has since 0.2.0.10-alpha. Amusingly, we were considering dropping our use of the empty fragment feature as "probably unnecessary" in 2008, but we never got around to it. I sure don't think we'll be doing that now!

Now, it's possible that clients we didn't write might be using other TLS implementations, but the opportunity for plaintext injection on client->relay links is much lower than on relay->relay links; see below. As far as I know, there are no Tor server implementations compatible with the current network other than ours.

Also, this only goes for the Tor software itself. Applications that use TLS need to watch out. Please install patches, and look for new releases if any are coming out soon.
But what if...
Okay, but would it work if we didn't use OpenSSL's empty-fragment trick?

For fun, what would our situation be if we weren't using openssl's empty fragment trick?

I'm going to diverge into Tor protocol geekery here. All of the next several sections are probably irrelevant, since the OpenSSL trick above protects Tor's TLS usage already. I'm just into analyzing stuff sometimes... and at the time I originally wrote this analysis, we didn't have confirmation about whether the OpenSSL empty-record trick would help or not.

This part will probably be a little harder to follow, and will require some knowledge of Tor internals. You can find all of our documents and specifications online at our handy documentation page if you've got some free time and you want to come up to speed.

The attack scenario that makes sense is for an attacker to be trying to decrypt stuff sent from one Tor node to another, or between a Tor node and a client. The attacker is not one of the parties on the TLS link, obviously: if they were, they'd already know the plaintext and would not need to decrypt it.

First, let's make some assumptions to make things as easy for the attacker as possible. Let's assume that the attacker can trivially inject chosen plaintext, and can have the TLS records carve up the plaintext stream anywhere he wants.

(Are those assumptions reasonable? Well, it's easy to inject plaintext on a relay->relay link: sending a node an EXTEND cell will make it send any CREATE cell body that you choose, and if you have built a circuit through a node, you can cause a RELAY cell on that node to have nearly any body you want, since the body is encrypted/decrypted in counter mode. I don't see an obvious way to make a node send a chosen plaintext to a client or make a client send a chosen plaintext to a node, but let's pretend that it's easy to do that too.

The second assumption, about how it's easy to make the boundaries of TLS records fall wherever you want, is likely to be more contentious; see "More challenges for the attacker" below.)

Also let's assume that on the targeted link, traffic for only one client is sent. An active attacker might arrange this through a trickle attack or something.

I am assuming that the attacker is observing ciphertext at a targeted node or client, but not at two targeted places that allow him to see the same traffic enter and leave the network: by our threat model, any attacker who can observe two points on a circuit is assumed to win via traffic correlation attacks.

I am going to argue that even then, the earlier attack doesn't get the attacker anything, and the preconditions for the Duong/Rizzo attack don't exist.
CLAIM 1: The earlier (Dai/Bard) attacks don't get the attacker anything against the Tor protocol

There are no interesting guessable plaintexts sent by a well-behaved client or node[*] on a Tor TLS link: all are either random, nearly random, or boring from an attacker's POV.

[*] What if a node or client is hostile? Then it might as well just publish its plaintext straight to the attacker.

Argument: CREATE cell bodies contain hybrid-encrypted stuff that (except for its first bit) should be indistinguishable from random bits, or pretty close to indistinguishable from random bits. CREATED cell bodies have a DH public key and a hash: also close to indistinguishable from random. CREATE_FAST cell bodies *are* randomly generated, and CREATED_FAST cell bodies have a random value and a hash.

RELAY and RELAY_EARLY cell bodies are encrypted with at least one layer of AES_CTR, so they shouldn't be distinguishable from random bits either.

DESTROY, PADDING, NETINFO, and VERSIONS cells do not have interesting bodies. DESTROY and PADDING bodies are either 0s or random bytes, and NETINFO and VERSIONS provide only trivial information that you can learn just by connecting to a node (the time of day, its addresses, and which versions of the Tor link protocol it speaks).

That's cell bodies. What about their headers? A Tor cell's header has a command and a circuit ID that take up only 3 bytes. Learning the command doesn't tell you anything you couldn't notice by observing the encrypted link in the first place and doing a little traffic analysis. The link-local 2-byte circuit ID is random, and not
interesting per se, but possibly interesting if you could use it to demultiplex traffic sent over multiple circuits. I'll discuss that more below at the end of the next section.
CLAIM 2: You can't do the Duong/Rizzo attack against the Tor protocol either

The attack requires that some piece of sensitive information M that you want to guess be re-sent repeatedly after the attacker's chosen plaintext. That is, it isn't enough to get the target to send one TLS record containing (evil | M) -- you need to get it to send a bunch of (evil | M) records with the same M to learn much about M.

But in Tor's link protocol, nothing sensitive is sent more than once. Tor does not retry the same CREATE or CREATE_FAST cells, or re-send CREATED or CREATED_FAST cells. RELAY cells are encrypted with at least one layer of AES_CTR, and no RELAY cell body is sent more than once. (The same applies to RELAY_EARLY.)

PADDING cells have no interesting content to learn. VERSIONS and NETINFO cells are sent only at the start of the TLS connection (and their contents are boring too).

What about the cell headers? They contain a command and a circuit ID. If a node is working normally, you can already predict that most of the commands will be RELAY. You can't predict that any given circuit's cells will be sent reliably after yours, so you can't be sure that you'll see the same circuitID over and over... unless if you've done a trickle attack, in which case you already know that all the cells you're seeing are coming from the same place; or if you've lucked out and one circuit is way louder than all the others, but you would already learn that from watching the node's network. So I think that anything that is sent frequently enough to be decryptable with this method is not in fact worth decrypting. But see the next section.
Hey, what if I'm wrong about those cell headers?

Let's pretend that I flubbed the analyis above, and that the attacker can read the command and circuitID for every cell on a link. All this allows the attacker to do is to demultiplex the circuits on the link, and better separate the traffic pattern flows that the link is multiplexing for different clients... but the attacker can't really
use this info unless the attacker can correlate it with a flow somewhere else. This requires that the attacker be watching the same traffic at two points. But if the attacker can do that, the attacker can already (we assume) do a passive correlation attack and win.
And what if I'm wrong entirely?

Now let's imagine that I am totally wrong, and TLS is completely broken, providing no confidentiality whatsoever? (Assume that it's still providing authenticity.)

Of course, this is a really unlikely scenario, but it's neat to speculate.

The attacker can remove at most one layer of encryption from RELAY cells in this case, because every hop of a circuit (except sometimes the first) is created with a one-way-authenticated Diffie-Hellman handshake. (The first hop may be created with a CREATE_FAST handshake, which is not remotely secure against an attacker who can see the plaintext inside the TLS stream.) Anonymized RELAY traffic is encrypted in AES_CTR mode with keys based on at least one CREATE handshake, so the attacker can't beat it. Non-anonymized RELAY traffic (that is, tunneled directory connections) don't contain sensitive requests or information.

So if the attacker can use this attack to completely decrypt TLS at a single hop on a Tor circuit, they still don't win. (All they can do is demultiplex circuits, about which see above.) And for them to do this attack at multiple points on the circuit, they would have to observe those points, in which case they're already winning according to our threat model.
More challenges for the attacker

It's actually even a little harder to do this attack against Tor than I've suggested.

First, consider bandwidth-shaping: If a node or a link is near its bandwidth limit, it will split cells in order to stay under that limit.

Also, on a busy node, you can't really send a cell and expect it to get decrypted and put into the next output record on a given link: there are likely to be other circuits queueing other cells for that link, and by the time your cell is sent, it's likely that they'll have sent stuff too. You can get increased priority by making a very quiet
circuit, though.

Finally, I don't actually think it's possible to cause chosen plaintext to appear on a client->server link.
Recommendations

We dodged an interesting bullet on this one: part of it was luck, and part of it was a redundant protocol design. Nevertheless, let's "close the barn doors," even though the horse is still tied up, chained down, and probably sedated too.

First, as soon as OpenSSL 1.0.1 is out and stable, we should strongly suggest that people move to it. (It provides TLS 1.1.) We should probably build all of our packages to use it. But sadly, we'll have to think about protocol fingerprinting issues there, in case nobody else jumps onto the TLS 1.1 bandwagon with us. :/

We should include recommended use of the OpenSSL empty-record trick in our spec as a requirement or a strong recommendation. I'll add a note to that effect.

In future designs of replacements for the current RELAY and CREATE format, we should see if there are ways to prevent them from being used for chosen plaintext injection. This might not be the last attack of its kind, after all.

Perhaps we should put an upper bound on the circuit priority algorithm if we haven't already, so that no circuit can achieve more than a given amount of priority for being quiet, and so that you can't reliably know that your cell will be sent next on a link. But that's pretty farfetched.
And in closing

longpost is loooooooong

Thanks to everybody who followed along with me so far, thanks to Juliano and Thai for letting me read their paper ahead of time, and thanks to everybody who helped me write this up. And thanks especially to my lovely spouse for proofreading.

Now, it's a Friday evening, and if you'll excuse me, I think I'm going to go off the 'nets for a little while.

    nickm's blog
    Email this Blog entry

On September 24th, 2011 Anonymous said:

Thank you for the well-written post.

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

This is a very good overview of the topic for crypto-layman (e.g. me). However one section took a bit of decompressing:

"If I know that you are going to use IV x for your next message, and I can trick you into sending a message that starts with a plaintext block of [(NOT x) xor y], then you will encrypt y for me."

Maybe add something like:
"This works because in order to encrypt the message [(NOT x) xor y], you will first xor it with the IV [x]. The (NOT x) and x will cancel each other out as part of this xor operation and leave only [y] for encryption. "

This is not so much to explain xor'ing to the reader (though that always helps) but to make clear that the xor operation in '[(NOT x) xor y]' is not referring to xor'ing with the IV but the actual construction of the plaintext block that will later be xor'd with the IV and then enciphered.

I think the description of the SSL attack would benefit from the same elaboration.

"The attacker makes the user encrypt C' xor p, where p is the guessed plaintext and C' is the ciphertext block right before where the attacker thinks that plaintext was.
So if the attacker knows the SSL implementation will use [x] as the IV, he gets the user to encrypt a plaintext that is constructed as [(NOT x) xor C' xor p]. The SSL implementation will xor the IV [x] against this text and get [C' xor p]. It will then encrypt [C' xor p] and send it to the attacker. If the attacker finds that this encrypted message matches byte for byte the one he received right after the ciphertext block C' earlier in the stream he knows he has correctly guessed the plaintext [p] that was contained in the ciphertext block right after C'."

    reply
    Email this comment

On September 24th, 2011 nickm said:

Thanks! I'll let your comment stand here to clarify the point for anybody who didn't follow the jump in my discussion.

    reply
    Email this comment

On September 27th, 2011 Anonymous said:

So I suppose the idea here is that the "y" is the chosen plain text and since I know the IV "x", I would ask the Oracle to encrypt [x XOR y] for me, knowing that [x XOR y] will be XOR'd with "x" before it was encrypted in CBC mode, which makes the final result encryt(y). So I think in above paragraph is wrong, it should have been [x XOR y] instead of [(NOT x) XOR y]. Am I right?

    reply
    Email this comment

On September 27th, 2011 Anonymous said:

x ^ (~x) ^ y == y

x ^ (~x) = 0xfff..fff
0xfff..fff ^ y = y

    reply
    Email this comment

On September 28th, 2011 Anonymous said:

Choose y = 1 using 1-bit numbers for your result:
1 ^ y == y
1 ^ 1 == 1 => false

In fact
0xfff..fff ^ y = ~y

and
0x000..000 ^ y = y

So I believe the question is correct and unless there is another subtle NOT to be worked out somewhere it should read [x XOR y] instead of [(NOT x) XOR y].

As written:
encrypt(x ^ (~x) ^ y)
encrypt(0xfff..fff ^ y)
encrypt(~y)

vs.
encrypt(x ^ x ^ y)
encrypt(0x000..000 ^ y)
encrypt(y)

    reply
    Email this comment

On September 28th, 2011 Anonymous said:

x XOR x => 0
y XOR 0 => y
x XOR x XOR y =>y

x XOR (NOT x) => 0xffff..
0xffff.... XOR y <> y

e.g.
assume
x = 0101
y = 1111
then
NOT x = 1010
x XOR (NOT x) = 0101 XOR 1010 = 1111
x XOR (NOT x) XOR y = 1111 XOR 1111 = 0000
0000 is not 1111

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

Thanks for taking the time to write this up so soon. It helps put the attack into context as other news sources have already started reporting about this issue as if the world is about to end.

As with many tech issues, putting into context helps to realize the risk associated with this issue and steps that can be taken to mitigate it.

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

Have you more information about http://www.h2hc.org.br/palestrantes.php#Speaker6 ?

    reply
    Email this comment

On September 24th, 2011 nickm said:

Not more than you see there; we'd like to know more about the attack, if there's a real cause for concern. As far as I know, the speaker hasn't been in touch with us (though it's possible he contacted somebody else, and I didn't hear about it). We're asking him for more info now.

The abstract there says that the attack builds on earlier work by the same author here: http://cansecwest.com/csw11/filiol_csw2011.pdf -- that's the CanSecWest talk that the abstract is talking about. In that talk, the big idea was that if an attacker can install malware on your computer, and that malware can replace crypto primitives and do similar stuff, then it can make security programs on your computer act in an insecure way.

There were some neat ideas there about what malware could do to a crypto program... but ultimately, once you're running malware that can replace the code you're running, you have basically lost out. The place to stop attacks of this kind would seem to be before the malware is installed.

Then again, I'm just guessing here, based on the older talk, and I could be missing something big. The abstract says that there are non-malware-based attacks too, "depending on the scenario." I hope we hear from Eric soon--he says he's got suggestions for our protocol, and it would be good to hear what they are.

    reply
    Email this comment

On September 25th, 2011 Anonymous said:

Ok !! Thx

the conference will be given at pacsec too : http://pacsec.jp/speakers.html

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

Thank you very much for this very good post and thanks to anonymous for the extra precisions.
However I'm curious about something: how can Bob decrypt Alice's first block if Alice uses a random IV unknown from Bob?
Is the IV simply sent in plaintext together with the first block? (according to wikipedia it doesn't need to be secret)
Or are we like systematically sending a dumb first block and start to send actual data from the 2nd block?

    reply
    Email this comment

On September 24th, 2011 nickm said:

Ah, you're asking about the IV for the first encrypted record.

In TLS 1.0, the same process that generates the shared symmetric keys between Alice and Bob is also generates the starting IVs.

And if you're curious how *that* works ... Basically, in the simple case, during the initial TLS handshake, the client and server each send the other a random number, and the client sends the server a "pre-master secret" encrypted to the server's public key. These are used in a HMAC-based pseudorandom function to derive a "master secret", and then the master secret and the random values are used to derive the encryption keys, some HMAC keys for data integrity, and the initial IVs.

(There's more stuff going on, too, to prevent various attacks and enable various features. The Wikipedia TLS handshake in detail section of the TLS article isn't too bad, and the relevant RFCs have the whole story.)

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

I don't know much about this stuff. I do know I appreciate Tor and am curious about computer security. This post was great. Upon reaching "Claim 1," I skipped to "Recommendation.," Still, I think this was interesting and informative and I enjoyed reading it. Well done, nickm.

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

Thanks for the update. Always good to see redundant security in this insecure world.

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

thanks for this long and nice job article! If it is possible to you tell your short conclusion as advice?how we can detect these BEAST ssl atack and it 's maleware as non expert user?do you suggest we enable tls 1.x or ... instead of tls 1?

    reply
    Email this comment

On September 24th, 2011 Anonymous said:

http://www.dshield.org/diary.html?storyid=11635

    reply
    Email this comment

On September 25th, 2011 Anonymous said:

Thanks for checking this out so soon and reporting it. The other thing I take away is that there is no such thing as 'redundant' security :p

    reply
    Email this comment

On September 25th, 2011 Anonymous said:

Thanks for writing this up so quickly and so clearly.

    reply
    Email this comment

On September 25th, 2011 Anonymous said:

"block of [(NOT x) xor y], then you will encrypt y for me"

Hi, shouldn't block = [x xor y], since: x xor [x xor y] = y?

Thanks!

    reply
    Email this comment

On September 25th, 2011 Anonymous said:

"If I know that you are going to use IV x for your next message, and I can trick you into sending a message that starts with a plaintext block of [(NOT x) xor y], then you will encrypt y for me."

There's one thing I don't understand: Shouldn't x xor ((NOT x) xor y) cause NOT y to be encrypted, and not y? x xor (NOT x) is 1, not 0.

    reply
    Email this comment

On September 25th, 2011 Anonymous said:

the tor is an open source software?yes.it is not bad for a security software to show it's hand to public?specially if dictatorial goverment that like to prevent their people to reach the INFORMATION LEDGE be able to crack it?thanks.b

    reply
    Email this comment

On September 26th, 2011 Anonymous said:

I assume you are asking it Tor is open source (or free software) and if it is bad for security software to be published.

The answer to your second question is that cryptographically sound algorithms and software that implements them benefit from the scrutiny of the masses. The more people that look at the code, the less likely any Easter eggs, back doors or bugs are to survive.

There are several examples of closed source solutions where various regimes have installed back doors in cryptographic equipment eventually leading to serious diplomatic crises and of course the demise of the company in question. Can't find an example right now but one involves a Swiss company.

    reply
    Email this comment

On September 26th, 2011 Anonymous said:

You must be quite new to computer security to think that keeping the source closed would improve security.

If you show all the source code and encryption algorithms you are using and people still cannot compromise your software, then you got *real* security.

Otherwise you just get security by obscurity, but Crackers have proven many, many times that they don't need the source code to find vulnerabilities in softwares.

If still in doubt, just look at http://openbsd.org (including OpenSSL) and try to find a widespread commercial software with a similar security track record. Certainly not Adobe (PDF), Java, MacOS (well, at least they don't have viruses anymore) or Internet Explorer (or anything ever made by Microsoft).

    reply
    Email this comment

On September 27th, 2011 Anonymous said:

Examining source code for exploits is like looking at the floor plan for a building: it will show you the doors and windows, and perhaps non-structural walls that can be broken through easily. Examining the binary code is like examining the actual building itself, revealing things like places where a wall wasn't extended above a drop ceiling, or a cipherlock whose combination is never changed and four digits show much more wear than all the others.

The map is not the territory, the source is not the code.

-- AJWM

    reply
    Email this comment

On September 26th, 2011 Anonymous said:

I saw this scroll by on xxx.lanl.gov recently, it's unrelated to cryptography but interesting nonetheless:

http://lanl.arxiv.org/abs/1109.0597

Stealthy Traffic Analysis of Low-Latency Anonymous Communication Using Throughput Fingerprinting

"Anonymity systems such as Tor aim to enable users to communicate in a manner that is untraceable by adversaries that control a small number of machines. To provide efficient service to users, these anonymity systems make full use of forwarding capacity when sending traffic between intermediate relays. In this paper, we show that doing this leaks information about the set of Tor relays in a circuit (path). We present attacks that, with high confidence and based solely on throughput information, can (a) reduce the attacker's uncertainty about the bottleneck relay of any Tor circuit whose throughput can be observed, (b) exactly identify the guard relay(s) of a Tor user when circuit throughput can be observed over multiple connections, and (c) identify whether two concurrent TCP connections belong to the same Tor user, breaking unlinkability. Our attacks are stealthy, and cannot be readily detected by a user or by Tor relays. We validate our attacks using experiments over the live Tor network. We find that the attacker can substantially reduce the entropy of a bottleneck relay distribution of a Tor circuit whose throughput can be observed-the entropy gets reduced by a factor of 2 in the median case. Such information leaks from a single Tor circuit can be combined over multiple connections to exactly identify a user's guard relay(s). Finally, we are also able to link two connections from the same initiator with a crossover error rate of less than 1.5% in under 5 minutes. Our attacks are also more accurate and require fewer resources than previous attacks on Tor."

    reply
    Email this comment

On September 27th, 2011 Anonymous said:

thanks dear friends for answer.i have 20 years experience with computer and may be new to computer security.i agree and know the methods that cracker work and how the codes be found via reverse engineering but do you can find the source code of the popular and pioneer anti virus/securty software as open source available to public?thanks

    reply
    Email this comment

On September 29th, 2011 Anonymous said:

The above post of 26th september - Stealthy Traffic Analysis of Low-Latency Anonymous Communication Using Throughput Fingerprinting- true or false?

    reply
    Email this comment

On September 29th, 2011 Anonymous said:

Whenever I read this much math (way over my head), my eyes glaze over ... but I trudge on regardless.

If attacks are this sophisticated (they are ... and more), it is important that the defense squad stays on their toes. I am glad that the TOR team does just that ... now, where is that donate button? ... these conferences and resultant cogitation cost money.

    reply
    Email this comment

On October 4th, 2011 Anonymous said:

Excelent explanation for cryptography newbies

    reply
    Email this comment

On October 7th, 2011 Anonymous said:

Stealth traffic analysis fingerprinting can ID tor users with high degree certainty. Delete all comments referring to http://lanl.arxiv.org/abs/1109.0597

    reply
    Email this comment

On October 18th, 2011 Anonymous said:

Isn't the empty fragment workaround disabled by default in OpenSSL?

Maybe I'm just tired, but I look at the OpenSSL 0.9.8r ssl.h and it says:

/* Disable SSL 3.0/TLS 1.0 CBC vulnerability workaround that was added
* in OpenSSL 0.9.6d. Usually (depending on the application protocol)
* the workaround is not needed. Unfortunately some broken SSL/TLS
* implementations cannot handle it at all, which is why we include
* it in SSL_OP_ALL. */
#define SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS 0x00000800L /* added in 0.9.6e */

/* SSL_OP_ALL: various bug workarounds that should be rather harmless.
* This used to be 0x000FFFFFL before 0.9.7. */
#define SSL_OP_ALL 0x00000FFFL

    reply
    Email this comment

On October 19th, 2011 Anonymous said:

so err. is anybody going to address the fact that any tor user can now be identified and arrested due to http://lanl.arxiv.org/abs/1109.0597

    reply
    Email this comment

On October 20th, 2011 arma said:

You are not reading the paper correctly.

It is a nice attack, and seems like it would work pretty well to identify the relays in the user's circuit. But that is not enough by itself to identify the Tor user.

I encourage you to visit http://freehaven.net/anonbib/ and read the wide variety of attack and defense papers.

    reply
    Email this comment



	--> Source code
$ find . -type f | xargs grep -s SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS 
./runtime/prebuilt/lnx26/include/openssl/ssl.h:#define SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS              0x00000800L /* added in 0.9.6e */
./openSSL/openssl/CHANGES:          SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS
./openSSL/openssl/doc/ssl/SSL_CTX_set_options.pod:=item SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS
./openSSL/openssl/doc/ssl/SSL_CTX_set_options.pod:B<SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS> has been added in OpenSSL 0.9.6e.
./openSSL/openssl/ssl/s3_enc.c: if (!(s->options & SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS))
./openSSL/openssl/ssl/ssl.h:#define SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS              0x00000800L /* added in 0.9.6e */
./openSSL/openssl/ssl/t1_enc.c: if (!(s->options & SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS))

So not set in SSL_CTX_set_options() http://www.openssl.org/docs/ssl/SSL_CTX_set_options.html

--------------------------------------------------------------------------------

http://www.openssl.org/~bodo/tls-cbc.txt :

Security of CBC Ciphersuites in SSL/TLS: Problems and Countermeasures
http://www.openssl.org/~bodo/tls-cbc.txt

[Last updated: 2004-05-20]


There are some problems with the CBC-based ciphersuites in SSL 3.0 and TLS 1.0
that can be exploited by active adversaries under specific circumstances:


1. If bad padding is treated differently from bad MACs when decrypting SSL/TLS
   records, the adversary may be able to launch Vaudenay's attack on padding;
   see the first e-mail message reproduced below [Date: Thu, 20 Sep 2001].


   TLS 1.0 has different error codes for these two cases ('decryption_failed'
   and 'bad_record_mac'), which is a bad idea.  While the adversary will not be
   able to read the error codes that are transmitted (these are encrypted), an
   error logfile will suffice to launch the attack if it reveals the type of
   error -- even if file permissions prevent the adversary from actually
   reading the file (the file length increase cause by the attack is likely to
   reveal which of the two errors occured).

   Countermeasure: Treat incorrect block cipher padding like a MAC
   verification error during record decryption (in particular, don't send the
   TLS 1.0 'decryption_failed' error code).

   OpenSSL contains this countermeasure since version 0.9.6c [21 December 2001].


   A different approach to distinguish these two error cases and
   launch the attack is to examine the timing of error responses:
   if the MAC verification is skipped when bad padding has been found,
   the error will appear quicker in the case of incorrect block cipher
   padding than in the case of an incorrect MAC.

   This problem is described in LASEC Memo "Password Interception in a
   SSL/TLS Channel" by Brice Canvel, published 2003-02-20:
   http://lasecwww.epfl.ch/memo_ssl.shtml

   A countermeasure is to compute a MAC of the plaintext anyway, even
   if the usual padding removal step fails because of incorrect
   padding, to obtain (nearly) uniform timing.

   OpenSSL contains this countermeasure since versions 0.9.6i and
   0.9.7a [19 February 2003]; see the OpenSSL Security Advisory at
   http://www.openssl.org/news/secadv_20030219.txt


2. The CBC IV for each record except the first is the previous records' last
   ciphertext block.  Thus the encryption is not secure against adversaries who
   can adaptively choose plaintexts; see the second e-mail message reproduced
   below [Date: Fri, 8 Feb 2002].  Note that for most application protocols
   such attacks are not really feasible.

   A simple countermeasure is to prepend a record with an empty plaintext
   fragment before sending the actual payload.  The CBC encrypted part of such
   a record will consist just of a MAC and padding.  Then the IV used for live
   data will not be known in advance.  This is a compatible countermeasure in
   that it is compliant with the SSL 3.0 and TLS 1.0 specifications.

   OpenSSL contains this countermeasure since version 0.9.6d [9 May 2002].
   It turned out that some buggy SSL/TLS implementations (most notably MSIE)
   reject empty fragments, so the countermeasure can be switched off in version
   0.9.6e [30 July 2002] by setting option SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS
   or SSL_OP_ALL.


3. For SSL 3.0, it is not completely specified what CBC block cipher padding
   has to look like -- most bytes of the padding can have arbitrary values,
   and only the very last byte is relevant.  TLS 1.0 requires all padding
   bytes to take the same value, but reportedly some TLS 1.0 implementations
   do not verify whether padding is intact on records that they have
   received and decrypted.  In SSL/TLS, block cipher padding is not covered
   by the MAC, so an active adversary can try out certain modifications to
   records that are transmitted and derive supposedly cryptographically
   secured information by observing whether these modifications do or do
   not disturb the SSL/TLS connection.  For details on such attacks, see
   the third e-mail message reproduced below [Date: Wed, 5 Nov 2003].

   For TLS 1.0, this vulnerability applies only when implementations are
   used that do not verify block cipher padding.  OpenSSL does verify block
   cipher padding and hence is not vulnerable.  For SSL 3.0, the
   vulnerability is intrinsic to the protocol because the integrity of
   block cipher padding cannot be verified.  (Note that SSL/TLS has
   protections against version rollback attacks: if both the client and the
   server in a connection support TLS 1.0, the adversary cannot easiliy
   force them to use SSL 3.0 instead to expose them to this vulnerability.)

 
TLS 1.1 will change the specification of the CBC ciphersuites to avoid
these security problems as far as they apply to TLS: it advises against
using the 'decryption_failed' alert, and it introduces explicit random IVs
for CBC encryption.



>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Errata: In the message "TLS insecurity (attack on CBC)", the paragraph

     TLS 1.0 employs a commonly used style of plaintext padding for CBC:
     Append  p  padding bytes all valued  p  where  p  is a positive integer
     chosen such that the resulting total length is a multiple of the
     block size in bytes.  (Unlike many other protocols, TLS does not bound
     p  above by the block size; any value up to 255 is permitted.)

should be replaced by

     TLS 1.0 employs a variant of a commonly used style of plaintext padding
     for CBC: Append  p  padding bytes all valued  p-1  where  p  is a positive
     integer chosen such that the resulting total length is a multiple of the
     block size in bytes.  (Unlike many other protocols, TLS does not bound  p
     above by the block size; any value up to 256 is permitted.)

Accordingly, the following substituations should be made in the description
of the attack against TLS 1.0:

     0x01            should read  0x00
     0x02 0x02       should read  0x01 0x01
     0x03 0x03 0x03  should read  0x02 0x02 0x02



Date: Thu, 20 Sep 2001 21:37:59 +0200
From: Bodo Moeller <moeller@cdc.informatik.tu-darmstadt.de>
To: "IETF Transport Layer Security WG" <ietf-tls@lists.certicom.com>
Cc: openssl-cvs@openssl.org, serge.vaudenay@epfl.ch
Subject: TLS insecurity (attack on CBC)

[To ietf-tls list, Cc: openssl-cvs and Serge Vaudenay.]


The TLS 1.0 specification (RFC 2246) defines the following two alerts
for failures during record decryption and MAC verification:

   bad_record_mac
       This alert is returned if a record is received with an incorrect
       MAC. This message is always fatal.

   decryption_failed
       A TLSCiphertext decrypted in an invalid way: either it wasn`t an
       even multiple of the block length or its padding values, when
       checked, weren`t correct. This message is always fatal.

While these alerts are not directly visible to attackers, they may be
written to logfiles, allowing an attacker to observe which type of
error was caused by an active attack.  (Note that in practice simply
observing the length of the logfile may suffice to launch this kind of
attack; it may not be necessary to read the actual contents.)

For security reasons, they should be kept secret from any potential
attacker, so it is dangerous and arguably pointless to use different
types of alerts in the first place.  Thus, TLS 1.0 implementations
should always generate a 'bad_record_mac' alert if the padding value
check failed.  SSL 3.0 did not have a separate 'decryption_failed'
alert anyway.  Both for SSL 3.0 and TLS 1.0, implementations should
make sure that the difference between these errors is not made visible
in local logfiles.

The TLS 1.0 'decryption_failed' alert is OK for the case that the
length is not a multiple of the block length, as this is visible
directly from the ciphertext.  For other cases, it should be
depreciated.



Background:

In his CRYPTO 2001 paper "The order of encryption and authentication
for protecting communications (Or: how secure is SSL?)" [1], Hugo
Krawczyk shows that, under certain general security assumptions for
MACs and symmetric encryption schemes, "encrypt-then-authenticate"
(EtA) has the desired security properties for building secure channels
while "authenticate-then-encrypt" (AtE) in general is not secure.

He then shows that in the special cases where the symmetric encryption
scheme is a block cipher in CBC mode or an XOR-based stream ciphers,
security proofs *are* in fact possible for AtE.  These are the cases
relevant for SSL and TLS.  So he concludes that

     "[...] while we show the generic security of SSL to be broken,
     the current standard implementations of the protocol that use the
     above modes of encryption are safe."

However, this is not true if an attacker can tell apart the two
failure cases discussed above.

[1]  The full version of Hugo's paper is available at
     <URL: http://eprint.iacr.org/2001/045/>.


The following idea to attack CBC with block padding is essentially
what Serge Vaudenay presented at the CRYPTO 2001 Rump Session the
evening before Hugo's talk, except that he used an iterated attack to
decrypt a complete plaintext and noted that this is impossible to do
for SSL because the connection is aborted and the symmetric key
invalidated as soon as a decryption error occurs.  (Actually he must
have meant TLS 1.0 -- for SSL 3.0, the attack works differently
anyway; see below.)

While the full attack is indeed not possible for SSL and TLS, the
partial attack already constitutes a valid attack.  In the case of
TLS 1.0, an active attacker who guesses the last byte of a block of
plaintext sent earlier in the connection can verify that this guess is
true, with reliability about 254/255.  (For example, if the attacker
assumes that the plaintext byte is uniformly distributed, he has
probability 1/256 to get a random guess confirmed; but in the case of
confirmation, with probability about 1/255, the confirmation was
wrong.)

Here's how it goes.  CBC encryption looks like this (Pi, Ci are
plaintext and ciphertext blocks, respectively; E is single block
encryption; the number of plaintext blocks is 3 in this example,
but in fact, of course, is variable):

      IV      P1      P2     P3

      |       |       |       |
      |       v       v       v
      |    > XOR   > XOR   > XOR
      |   /   |   /   |   /   |
      |  /    v  /    v  /    v
      | /     E /     E /     E
      |/      |/      |/      |
      v       v       v       v

      IV      C1      C2      C3

Decryption looks like this (I'll leave plaintext blocks and ciphertext
blocks in place and just reverse some of the arrows and substitute
block decryption, D, for encryption):

              P1      P2     P3

              ^       ^       ^
              |       |       |
           > XOR   > XOR   > XOR
          /   ^   /   ^   /   ^
         /    |  /    |  /    |
        /     D /     D /     D
       /      ^/      ^/      ^
      /       |       |       |

      IV      C1      C2      C3

TLS 1.0 employs a commonly used style of plaintext padding for CBC:
Append  p  padding bytes all valued  p  where  p  is a positive integer
chosen such that the resulting total length is a multiple of the
block size in bytes.  (Unlike many other protocols, TLS does not bound
p  above by the block size; any value up to 255 is permitted.)

Assume that the attacker has observed two consecutive ciphertext
blocks,  C1  and  C2,  say, and wants to verify a guess for the last
byte of  P2.  As  P2 = C1 XOR D(C2),  this means the attacker can make
a corresponding guess for the last byte of  D(C2).  Now he makes up a
fake ciphertext  IV' || C'1 || C'2 || ... || C'n  with arbitrary
blocks in the beginning, the last two ciphertext blocks being

      C'n-1  =  random bits || (guess XOR 0x01)

(using the appropriate number of random bits to fill this block) and

      C'n    =  C2.

The recipient will decrypt this as follows:

      P'n    =  C'n-1  XOR  D(C2)

If the guess for the last byte of D(C2) was correct, the last byte
of P'n will be 0x01, which looks like legitimate padding.
Thus this is not a 'decryption_failed' condition, so it will (with
very high probability) lead to 'bad_record_mac'.

If the guess was incorrect, we get a 'decryption_failed' unless by
chance  P'n  ends in  0x02 0x02  or in  0x03 0x03 0x03  or similar
seemingly valid padding.  The conditional probability for this is 
slightly more than 1/255.



SSL 3.0 does not specify what the padding should look like; but the
final byte is always the number of padding bytes excluding this final
byte itself, and must be smaller than the block size in bytes.
If the block size is 8 bytes, this means that a 'decryption_failed'
condition occurs if the last byte of  P'n  is not of the form

      00000xxx.

SSL 3.0 does not actually have a 'decryption_failed' alert, but if the
attacker somehow can observe the type of error (e.g. by peeking at
logfiles), the attacker will be able to verify a guess on five bits of
the last byte of the target plaintext.  A similar attack applies to
TLS 1.0 if the recipient does not verify that all of the  p  padding
bytes actually have value  p  (in this case we can expect to see a
'decryption_failed' error if the last byte of  P'n  is larger than the
total number of plaintext bytes).


-- 
Bodo Möller <moeller@cdc.informatik.tu-darmstadt.de>
PGP http://www.informatik.tu-darmstadt.de/TI/Mitarbeiter/moeller/0x36d2c658.html
* TU Darmstadt, Theoretische Informatik, Alexanderstr. 10, D-64283 Darmstadt
* Tel. +49-6151-16-6628, Fax +49-6151-16-6036
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Date: Fri, 8 Feb 2002 23:48:07 +0100 (CET)
From: moeller@cdc.informatik.tu-darmstadt.de (Bodo Moeller)
To: ietf-ssh@netbsd.org, ietf-tls@lists.certicom.com
Cc: Wei Dai <weidai@eskimo.com>, openssl-dev@openssl.org
Subject: Re: an attack against SSH2 protocol

Wei Dai <weidai@eskimo.com>:

>> [Posted to sci.crypt and the IETF SSH working group mailing list.]
>> 
>> Phil Rogaway observed that CBC mode is not secure against chosen-
>> plaintext attack if the IV is known or can be predicted by the attacker 
>> before he choses his plaintext [1]. Similarly, CBC mode is not secure if 
>> the attacker can observe the last ciphertext block before choosing the 
>> next block of plaintext, because the last block of ciphertext 
>> essentially serves as the IV for the rest of the message. 
>> 
>> The attack itself is very simple. Remember that in CBC mode, each 
>> plaintext block is XOR'ed with the last ciphertext block and then 
>> encrypted to produce the next ciphertext block. Suppose the attacker 
>> suspects that plaintext block P_i might be x, and wants to test whether 
>> that's the case, he would choose the next plaintext block P_j to be x 
>> XOR C_(i-1) XOR C_(j-1). If his guess is correct, then C_j = Encrypt(P_j 
>> XOR C_(j-1)) = Encrypt(P_i XOR C_(i-1)) = C_i, and so he can confirm his 
>> guess by looking at whether C_j = C_i.
>> 
>> The SSH2 protocol, when used with a block cipher in CBC mode, does allow 
>> the attacker to observe the last ciphertext block of a packet, which is 
>> then used as the (implicit) IV of the next packet. [...]

>> [1] http://www.cs.ucdavis.edu/~rogaway/papers/draft-rogaway-ipsec-comments-00.txt

> I have received some comments through private email. Apparently the exact
> same weakness was known for IPSec and may also exist in TLS (I haven't
> read enough of its RFC to be sure) [...]

In TLS, the "IV for subsequent records is the last ciphertext block
from the previous record" [RFC 2246], and plaintext blocks usually
consist of raw application data followed by a MAC, so the attack
applies.  (Having the MAC at the *beginning* of each packet would
avoid the attack.)

In his CRYPTO 2001 paper "The Order of Encryption and Authentication
for Protecting Communications (or: How Secure Is SSL?)", Hugo Krawczyk
supposedly shows that SSL/TLS with CBC encryption is secure -- but
he assumes a random IV for each encrypted block, which is not how the
actual SSL protocol works.

Another problem with CBC as used in SSL/TLS was pointed out by Serge
Vaudenay, see <URL:http://www.openssl.org/~bodo/tls-cbc.txt>.  That
one can easily be avoided by implementations.  To avoid the new attack
without changing the protocol definition, implementations would have
to send an empty fragment before application data to ensure IV
randomization.


-- 
Bodo Möller <moeller@cdc.informatik.tu-darmstadt.de>
PGP http://www.informatik.tu-darmstadt.de/TI/Mitarbeiter/moeller/0x36d2c658.html
* TU Darmstadt, Theoretische Informatik, Alexanderstr. 10, D-64283 Darmstadt
* Tel. +49-6151-16-6628, Fax +49-6151-16-6036
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
Date: Wed, 5 Nov 2003 13:42:40 +0100
From: Bodo Moeller <moeller@cdc.informatik.tu-darmstadt.de>
To: "IETF Transport Layer Security WG" <ietf-tls@lists.certicom.com>
Subject: [ietf-tls] Re: TLS 1.1 question and comments

On Tue, Nov 04, 2003 at 07:42:20PM +0000, David Wagner wrote:
> Peter Gutmann wrote:

>> Section 6.2.3.2, the padding text is now explicit about checking the padding,
>> which older versions weren't.  [...]

> Is it safe to skip checking the padding?  I'm wondering about
> the possibility of Vaudenay-style attacks.  Does anyone know whether
> this is ought to be a concern?

There are (at least) two problems if padding is not checked:

1.  Note that unlike SSL 3.0, TLS allows up to 256 bytes of padding,
    i.e. you can use more than the block size if desired.  With
    standard padding for a cipher block size of 8 bytes, say, you hide
    only three bits of the plaintext length; with TLS padding, you can
    hide eight bits of the plaintext length.

    If padding is not checked, then the plaintext length is not
    properly hidden: if an adversary randomly modifies a ciphertext
    block in transit and this does not cause problems to the TLS
    connection, then it can be deduced that this bytes lies entirely
    within the padding.

    (Say the adversary modifies the last-but-one ciphertext block, but
    doesn't touch its last byte.  During CBC decryption, this affects
    the final two plaintext blocks, but the byte indicating the
    padding length won't be changed.  So if at least two blocks of
    padding have been used, the TLS connection will continue.)


2a. Now (for simplicity) assume that the sender does not bother to use
    more than one block of padding for each TLS record.  Also assume
    that the block size is eight (16 can be handled similarly).  And
    keep in mind that TLS padding is not quite the same as PKCS #5
    padding: TLS subtracts one from the padding length, so it uses
    02 02 02  where PKCS #5 padding would be  03 03 03 03.

    Let  C1  and  C2  be consecutive ciphertext blocks.  In CBC mode,
    this means that a corresponding plaintext block is related to these
    blocks as follows:

         P2 = C1 XOR D(C2)

    Assume that  P2  is part of the actual payload of some TLS record
    and that the adversary has a guess  g  on the final byte of  P2.

    Now the adversary catches any TLS record  R  and makes some guess
    on the amount of padding.  (Under the assumptions here, a random
    guess will be correct with probability  1/8.)  Let's say it
    guesses that there are three bytes of padding.

    The adversary replaces said TLS record (in transit) by

         R || (C1 XOR C) || C2

    (adjusting the length field in the TLS record header accordingly)
    where  C  is any block of the form

         xx .. xx (12 XOR g),

    xx  denoting arbitrary bytes.

    If the guess  g  was correct, the recipient will interpret this as
    a TLS record with 19 (= 0x12 + 1) bytes of padding; and if the
    recipient does not check the padding, it will accept the record.

    Conversely, if the recipient accepts the modified TLS record, then
    with very high probability the actual final bytes of  P2
    conincides with  g  at least in its five most significant bits.
    (We cannot be sure about the other three bits of  g  unless we are
    sure about the amount of padding used be the original sender.)


2b. Even if senders never use more than one block of padding and
    recipients always check that no more than this amount of padding
    has been used (which would amount to losing interoperability with
    perfectly valid TLS implementations, though), the protocol is not
    secure if padding is not verified.

    Again assume that the block size is eight, and assume that the
    sender transmits a TLS record with eight bytes of padding.  The
    final block  P_n  containing the padding should look like this:

         07 07 07 07 07 07 07 07

    The recipient recovers  P_n  by computing

         P_n = C_(n-1) XOR D(C_n)

    If the recipient does not check padding, it will accept anything
    of the form

         xx xx xx xx xx xx xx 07;

    this means that the adversary can replace  C_n  by any other
    ciphertext block  C   that it has encountered in this TLS stream
    before for which it guesses that  C_(n-1) XOR D(C)  will have  07
    as its final byte.  (By the CBC decryption rules, this guess
    corresponds to a certain possible guess on the final byte of each
    plaintext block.)

    The modified TLS record will be accepted if the guess was correct
    and the TLS record really did have eight bytes of padding.

    If the guess was not correct and the original TLS record had eight
    bytes of padding, then the modified TLS record with very high
    probability will not be accepted.  If the guess was not correct
    and the TLS record had less than eight bytes of padding, then the
    modified TLS record will be accepted with some probability
    (1/256 in the worst case, namely for 7 bytes of padding; usually
    less).
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

--------------------------------------------------------------------------------

	11.2
```
