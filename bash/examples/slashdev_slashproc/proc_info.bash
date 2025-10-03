FS=iso                       # ISO filesystem support in kernel?

echo $( grep $FS /proc/filesystems )   # iso9660

kernel_version=$( awk '{ print $3 }' /proc/version )

echo $kernel_version

CPU=$( awk '/model name/ {print $5}' < /proc/cpuinfo )

echo $CPU

if [ "$CPU" = "Pentium(R)" ]
then
  run_some_commands
  ...
else
  run_other_commands
  ...
fi



cpu_speed=$( fgrep "cpu MHz" /proc/cpuinfo | awk '{print $4}' )

echo $cpu_speed

#  Current operating speed (in MHz) of the cpu on your machine.
#  On a laptop this may vary, depending on use of battery
#+ or AC power.
