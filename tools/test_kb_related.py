import kb_related as r


def note(title, tags, body=""):
    return f"---\ntype: reference\ntitle: {title}\ntags: [{', '.join(tags)}]\n---\n{body}\n"


def write(tmp, rel, text):
    p = tmp / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text)


def test_candidates_skip_linked_and_need_two_specific_tags(tmp_path):
    write(tmp_path, "net/ipsec.md", note("IPsec primer", ["ipsec", "vpn", "networking", "primer"]))
    write(tmp_path, "Network/kb-network/05-vpn.md", note("VPN setup", ["vpn", "ipsec", "legacy"]))
    write(tmp_path, "net/dns.md", note("DNS", ["dns", "networking", "primer"]))     # 1 specific shared -> no
    write(tmp_path, "net/linked.md", note("IPsec VPN tuning", ["ipsec", "vpn"], "[p](/net/ipsec.md)"))
    rows = r.candidates(r.load(str(tmp_path)), 5)
    pairs = {(a, b) for a, _, b, _, _ in rows}
    assert ("net/ipsec.md", "Network/kb-network/05-vpn.md") in pairs
    assert ("net/ipsec.md", "net/dns.md") not in pairs
    assert ("net/ipsec.md", "net/linked.md") not in pairs        # already linked (linked -> ipsec)
    assert all(not a.startswith("Network/kb-") for a, *_ in rows)  # legacy notes are not row anchors


def test_generic_tags_do_not_count():
    a = {"tags": {"python"}, "words": set()}
    b = {"tags": {"python"}, "words": set()}
    assert r.score(a, b) == 2.0
