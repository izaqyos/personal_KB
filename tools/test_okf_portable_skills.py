from okf_validate import is_portable_skill, validate_skill_artifact


def test_native_skill_accepted_without_kb_type():
    text = "---\nname: backup\ndescription: Audit backups.\n---\n# Backup\n"
    assert validate_skill_artifact(text, "backup") == []


def test_native_skill_rejects_wrong_directory_and_unsupported_fields():
    text = "---\nname: backup\ndescription: Audit backups.\ntype: reference\n---\n"
    errors = validate_skill_artifact(text, "other")
    assert "skill name differs from directory" in errors
    assert "unsupported native skill frontmatter field" in errors


def test_native_skill_rejects_malformed_and_missing_fields():
    assert validate_skill_artifact("plain text", "backup")
    assert validate_skill_artifact("---\nname: [broken\n---\n", "backup")
    assert validate_skill_artifact("---\nname: backup\n---\n", "backup")


def test_native_schema_scope_does_not_cover_other_documents():
    assert is_portable_skill("ai/agents/skills/backup/SKILL.md")
    assert not is_portable_skill("ai/agents/README.md")
    assert not is_portable_skill("other/skills/backup/SKILL.md")
    assert not is_portable_skill("ai/agents/skills/backup/references/SKILL.md")

def test_strict_cli_accepts_native_skill(tmp_path, monkeypatch, capsys):
    import sys
    import pytest
    from okf_validate import main
    target = tmp_path / "ai/agents/skills/backup/SKILL.md"
    target.parent.mkdir(parents=True)
    target.write_text("---\nname: backup\ndescription: Audit backups.\n---\n")
    monkeypatch.setattr(sys, "argv", ["okf_validate.py", str(tmp_path), "--strict"])
    with pytest.raises(SystemExit) as exc:
        main()
    assert exc.value.code == 0
    assert "0 failures" in capsys.readouterr().out


def test_strict_cli_rejects_bad_skill_and_keeps_note_schema(tmp_path, monkeypatch, capsys):
    import sys
    import pytest
    from okf_validate import main
    target = tmp_path / "ai/agents/skills/backup/SKILL.md"
    target.parent.mkdir(parents=True)
    target.write_text("---\nname: wrong\ndescription: Audit backups.\n---\n")
    (tmp_path / "note.md").write_text("# Missing metadata\n")
    monkeypatch.setattr(sys, "argv", ["okf_validate.py", str(tmp_path), "--strict"])
    with pytest.raises(SystemExit) as exc:
        main()
    assert exc.value.code == 1
    output = capsys.readouterr().out
    assert "skill name differs from directory" in output
    assert "missing YAML frontmatter" in output
