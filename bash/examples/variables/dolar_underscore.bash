#!/bin/bash

echo $_              # /bin/bash
                     # Just called /bin/bash to run the script.

du >/dev/null        # So no output from command.
echo $_              # du

ls -al >/dev/null    # So no output from command.
echo $_              # -al  (last argument)

:
echo $_              # :

