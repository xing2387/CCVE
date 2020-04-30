#! /bin/bash

#https://www.dongmanmanhua.cn/BOY/tower-of-god/list?title_no=241&page=31

_id=$1 #241
_name=$2 #tower-of-god
_cat=BOY

_cListUrl="https://www.dongmanmanhua.cn/"$_cat"/"$_name"/list?title_no="$_id"&page="


ii=0
for x in {1..1000}; do
    wget -q $_cListUrl""$x -O $x".html"
    cUrls=($(cat $x".html" |grep -B 1 "i=$_id" |grep href | sed -e 's|href="|https:|g' -e 's/"//g' -e 's/\s//g'))
    cTitles=($(cat $x".html" |grep 'span class="subj"><span' | sed 's/\s//g' | sed 's|.*<span>\([^<]*\)<.*$|\1|'))
    cNum=($(cat $x".html" |grep 'class="tx">#' | sed 's|.*>#\(.*\)<.*|\1|'))
    cc=($(cat $x".html" |grep 'href=' |grep '&page='))
    for ((i=0; i<${#cUrls[*]}; i++)); do
        title=${cNum[$i]}"-${cTitles[$i]}";
        url="${cUrls[$i]}";
        if [[ -d "$title" ]]; then
            continue;
        fi;
        echo "download chapter $title";
        lastDir=$(pwd);
        mkdir "$title" && cd "$title";
        wget -q "$url" -O $i".html";
        picUrls=($(cat $i".html" |grep "_images _centerImg" | sed -e 's|.*data-url="\(.*\)".*|\1|g' -e 's/\s//g'))
        picCount=${#picUrls[*]}
        for ((j=0; j<$picCount; j++)); do
            echo "   download $title - $j""/"$picCount;
            curl -s -e "https://www.dongmanmanhua.cn" "${picUrls[$j]}" -o $j".jpg";
        done
        cd $lastDir;
    done

    if [[ -z "$(cat $x".html" |grep "下一页")" ]]; then
        ii=$((++ii))
        if [[ $ii == ${#cc[*]} ]]; then
            break;
        fi;
    fi;
done