import kb_outdated_scan as s


def test_flags_python2_and_net_tools():
    hits = s.scan_text('print "hi"\nexcept IOError, e:\nx = raw_input()\nifconfig eth0\n')
    assert set(hits) >= {"py2-print", "py2-except", "py2-api", "net-tools"}
    assert hits["py2-print"] == [1, 1]


def test_modern_code_not_flagged():
    hits = s.scan_text('print("hi")\nexcept IOError as e:\nip addr show\nsystemctl restart nginx\n')
    assert hits == {}
