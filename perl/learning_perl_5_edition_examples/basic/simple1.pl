#!/usr/bin/perl
## Copyright (C) Mon Jan 12 11:38:48 2009 Yosi Izaq, Cisco Systems
@lines = `perldoc -u -f atan2`;
foreach (@lines) {
  s/\w<([^>]+)>/\U$1/g;
  print;
}
