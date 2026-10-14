---
type: reference
title: Perl
description: Perl script nameservers_tests.pl for testing nameservers.
tags: [perl, dns, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#23"
---

# Perl

[↑ kb-scripts](/kb-scripts/README.md)

## 23.1 nameservers_tests.pl

```text
c:\work\scripts\perl\cisco\nameservers_tests.pl 

----------------------------------------------------------------------------------------------------
#!/usr/bin/perl 
#===============================================================================
#
#         FILE:  nameservers_tests.pl
#
#        USAGE:  ./nameservers_tests.pl  
#
#  DESCRIPTION: find best nameservers from list, set resolv.conf the top 3 
#
#      OPTIONS:  ---
# REQUIREMENTS:  ---
#         BUGS:  ---
#        NOTES:  ---
#       AUTHOR:  Yosi Izaq
#      COMPANY:  
#      VERSION:  1.0
#      CREATED:  10/17/2010 02:47:41 PM
#     REVISION:  ---
#===============================================================================

use Getopt::Std; 

# resolv.conf example:
# $ cat /etc/resolv.conf 
# search cisco.com
# domain cisco.com
# 
# #nameserver for ACS Performance setup
# #nameserver <internal-ip>
# 
# #nameserver for BXB AD setup
# #nameserver 10.86.81.7
# 
# #for AD Certificate setup of Alex Atlas
# #nameserver <internal-ip>
# 
# #for AD 3.0a setup
# nameserver <internal-ip>
# 
# #for new AD setup - US.COM
# #nameserver <internal-ip>
# 
# #nameserver for ACS Natanya setup
# #nameserver <internal-ip>
# 
# #Cisco IT DNS
# #nameserver 144.254.71.184
# #nameserver 64.103.101.184
# #nameserver 144.254.10.123
# #nameserver 64.102.6.247

use strict;
use warnings;

#foreach my $arg (@ARGV){
#    if $arg eq '-f'
#}

my %Options;
getopt('f', \%Options);

#my @opts = %Options; 
#print " @opts ";

my $src_file = "/etc/resolv.conf" ;
if ( $Options{'f'} ){
    print "nameservers source file $Options{'f'} \n";
    $src_file =  $Options{'f'} ;
}

my @nameservers ;
my $ns ="";
my $line ="";

open SRC_FILE, "< ${src_file}" or die "cant open $src_file " ;

while (<SRC_FILE>){
 chomp;
 if ( /nameserver/ ) {
    $line = "$_";
    print "$line \n";
    #$line  =~ /(\d+)(\.\d+){3}/ ;
    if ( $line  =~ /(\d+\.)(\d+\.)(\d+\.?)(\d+)/ ){

        #print " nameserver ip: $1$2$3$4 \n";
        unshift @nameservers ,"$1$2$3$4" ;
    }
    
 }
}

sub find_fastest_dig_responders ()
{
    my @nameservers = @_ ;
    
    my @dig_res ;
    my $dig_time = 999999999;
    my %nameserver_dig_times;
    foreach $ns (@nameservers) {
        print $ns, "\n";
        #system ("dig  -c 1 $ns ");
        @dig_res = `dig -c 1 $ns`;
        $dig_time = 999999999; #infinite value
        foreach my $line (@dig_res){
            #print $line ;
            #if (/(time=)(\d+\.\d\+)/){
            if ($line =~ /(time=)(\d+\.?\d+)/){
                #print "found time line: $line \n";
                $dig_time = "$2";
            }
        }
        print "nameserver $ns dig time: @dig_res \n";
        print "nameserver time: $dig_time \n";
        $nameserver_dig_times{"$ns"} = "$dig_time" ;
    }
    
    my @fastet_dig_responders = sort by_time keys %nameserver_dig_times;
    sub by_time { $nameserver_dig_times{$a} <=> $nameserver_dig_times{$b}  }
    
    foreach $ns (@fastet_dig_responders ){
        print "nameserver: $ns, dig time: $nameserver_dig_times{$ns} ms \n"
    }
} # sub find_fastest_dig_responders ( @nameservers)

sub find_fastest_ping_responders ()
{
    my @nameservers = @_ ;
    
    my @ping_res ;
    my $ping_time = 999999999;
    my %nameserver_ping_times;
    foreach $ns (@nameservers) {
        print $ns, "\n";
        #system ("ping  -c 1 $ns ");
        @ping_res = `ping -c 1 $ns`;
        $ping_time = 999999999; #infinite value
        foreach my $line (@ping_res){
            #print $line ;
            #if (/(time=)(\d+\.\d\+)/){
            if ($line =~ /(time=)(\d+\.?\d+)/){
                #print "found time line: $line \n";
                $ping_time = "$2";
            }
        }
        print "nameserver $ns ping time: @ping_res \n";
        print "nameserver time: $ping_time \n";
        $nameserver_ping_times{"$ns"} = "$ping_time" ;
    }
    
    my @fastet_ping_responders = sort by_time keys %nameserver_ping_times;
    sub by_time { $nameserver_ping_times{$a} <=> $nameserver_ping_times{$b}  }
    
    foreach $ns (@fastet_ping_responders ){
        print "nameserver: $ns, ping time: $nameserver_ping_times{$ns} ms \n"
    }
} # sub find_fastest_ping_responders ( @nameservers)

&find_fastest_ping_responders ( @nameservers) ;

close SRC_FILE; 


----------------------------------------------------------------------------------------------------

"
	23.2
```
