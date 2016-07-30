#!/bin/sh
OUT="images_data.js"
echo "window.IMAGE_DATA = {" > $OUT
COMMA=""

write_file() {
    BASE64=`cat "$1".png | base64`
    echo "${COMMA}'$1':'data:image/png;base64,${BASE64}'" >>$OUT
    COMMA=","

}

for F in {0..10}; do 
    FN="${F}"
    if [ $F -lt 10 ]; then
        FN="0${F}"
        write_file "$FN"
    fi
done

write_file "pencil"

echo "};" >> $OUT
