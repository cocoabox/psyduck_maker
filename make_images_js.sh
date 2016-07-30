#!/bin/sh
OUT="images_data.js"
echo "window.IMAGE_DATA = {" > $OUT
COMMA=""

write_file() {
    echo "${1}.png" >&2
    BASE64=`cat "$1".png | base64`
    echo "${COMMA}'$1':'data:image/png;base64,${BASE64}'" >>$OUT
    COMMA=","

}
for F in `seq 0 13`; do
    FN="${F}"
    if [ $F -lt 10 ]; then
        FN="0${F}"
    fi 
    write_file "$FN"
done

write_file "pencil"

echo "};" >> $OUT
