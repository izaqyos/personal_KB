      #!/bin/bash

      set -o verbose
      # Command echoing on.
      command
      ...
      command

      set +o verbose
      # Command echoing off.
      command
      # Not echoed.


      set -v
      # Command echoing on.
      command
      ...
      command

      set +v
      # Command echoing off.
      command
