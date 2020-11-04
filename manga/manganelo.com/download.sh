#! /bin/bash
#need proxy

#lx89691
_id=$1
homeUrl="https://chap.manganelo.com/manga-"$_id

echo "downloading index html "$homeUrl
curl -s -o home.html $homeUrl

chapterUrls=($(cat home.html | egrep \<a.*chapter-name  | perl -pe 's/.*href="(.*?)".*/\1/'))
cat home.html |egrep \<a.*chapter-name  | perl -pe 's/.*title="(.*?)".*/\1/' > tmpfile
chapterNames=()

ii=0
while read line; do
    chapterNames[i++]="$line"
done < tmpfile

count=${#chapterUrls[*]}
for (( i=$(($count-1)); i>=0; i-- )); do
    index=$(($count - i))
    name=${chapterNames[i]}
    url=${chapterUrls[i]}
    if [[ -d "$name" ]]; then
        echo "skip $name"
        continue
    fi
    lastDir=$(pwd)
    echo "downloading chapter $name "
    echo "chapter url "$url
    mkdir "$name" && cd "$name"
    picUrls=($(curl -s $url |grep \<img | sed 's|>|\n|g' |grep "$name" | perl -pe 's/.*src=\"(.*?)" alt.*/\1/'))
    picCount=${#picUrls[*]}
    echo "page count "$picCount
    for (( j=0; j<$picCount; j++ )); do
        echo "downloading pic $(($j + 1))/$picCount "${picUrls[j]}
        curl -s -o $(($j + 1))".jpg" ${picUrls[j]}
    done
    cd $lastDir
done
