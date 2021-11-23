#!/usr/bin/bash -e

docker run --rm -it \
    -p "3000:3000" \
    --workdir /usr/app \
    --volume ${PWD}:/usr/app \
    node:16 \
    /bin/bash
