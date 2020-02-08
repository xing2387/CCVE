#! /bin/bash

basePath="$(pwd)"
baseUrl="http://99770.hhxxee.com/comic/"
mangaId=$1

mangaUrl=$baseUrl""$mangaId"/"

picBaseUrlList=$(curl http://99770.hhxxee.com/script/viewhtml.js |grep "var sDS" | sed -e 's/.*var sDS = "//' -e 's/";.*//') #cut -d \| -f 1

mangaName=$(curl "$mangaUrl" |grep -A 1 '<h1 class="cTitle">' | tail -n 1 | sed -e 's/^\s*//' -e 's/\s*$//')

echo "漫画："$mangaName
if [[ -z "$mangaName" ]]; then
    echo "没有找到漫画名"
    exit 255
fi

if [[ ! -d $mangaName ]]; then
    mkdir $mangaName
fi

mangaHtmlFilePath="$basePath"/"$mangaName"/"$mangaId".html
echo "download manga html, url= ""$mangaUrl"
wget "$mangaUrl" -O "$mangaHtmlFilePath" > /dev/null 2>&1 

chapterInfoList=$(cat "$mangaHtmlFilePath" |grep "<div class='cVolTag'>"| sed 's/href=/\n/g' |sed 's/<\/a>.*//g' |grep http | sed -e 's/ /_/g' -e 's/'\''//g') #| awk -F '>' '{print "url->"$1",title->"$2}'

for chapterInfo in $chapterInfoList; do
    cd "$basePath"/"$mangaName"
    args=(${chapterInfo//>/ })
    chapterUrl="${args[0]}"
    chapterName="${args[1]}"
    echo "chapterUrl "$chapterUrl
    echo "chapterName "$chapterName
    if [[ -e "$chapterName" ]]; then
        continue
    fi
    mkdir "$chapterName"
    cd "$chapterName"
    echo "downloading chapterHtml "$chapterName", url= "$chapterUrl
    wget $chapterUrl -O index.html > /dev/null 2>&1 
    if [[ $? != 0 ]]; then
        echo "failed "$?
        continue
    fi
    picBaseUrlIndex=$(cat index.html | grep sFiles | sed -e 's/.*sPath="//' -e 's/";<\/script>.*//')
    picPostFixUrlList=$(cat index.html |grep sFiles | sed -e 's/.* sFiles="//' -e 's/";.*//')

    picBaseUrl=$(echo $picBaseUrlList | cut -d \| -f $(($picBaseUrlIndex)) )
    picPostFixUrlArray=(${picPostFixUrlList//|/ })
    pageIndex=0
    for x in ${picPostFixUrlArray[*]}; do
        if [[ -z "$x" ]]; then
            continue
        fi
        picUrl=$picBaseUrl""$x
        pageIndex=$(($pageIndex + 1))
        pageCount=${#picPostFixUrlArray[*]}
        echo "downloading "$chapterName" page "$pageIndex"/"$pageCount", url= "$picUrl
        picFileName=$(echo $picUrl | awk -F \/ '{print $NF}')
        wget "$picUrl" -O ${picFileName,,} > /dev/null 2>&1 
        if [[ $? != 0 ]]; then
            echo failed
        else
            echo success
        fi
    done
done
