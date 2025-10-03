# argv.awk - print command-line parameters
BEGIN { for (x = 0; x < ARGC; ++x)
	    print ARGV[x]
	print ARGC
}
