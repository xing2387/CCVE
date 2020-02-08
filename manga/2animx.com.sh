#! /bin/bash
#wget "http://www.2animx.com/index-comic-name-%E6%B5%B7%E7%9B%9C%E6%88%B0%E8%A8%98-id-323" -O index.html
echo "downloading index.html"
wget "http://www.2animx.com/index-comic-name-%E6%AD%A1%E8%BF%8E%E4%BE%86%E5%88%B0%E5%AF%A6%E5%8A%9B%E8%87%B3%E4%B8%8A%E4%B8%BB%E7%BE%A9%E7%9A%84%E6%95%99%E5%AE%A4-id-20275" -O index.html > /dev/null 2>&1;


infoList=$(cat index.html |grep "^</li>.*_blank" |grep "<a.*href*")
echo $infoList > infoList.txt
echo "" >> infoList.txt
echo "" >> infoList.txt
count=$(($(wc -l <<< $infoList) / 2 + 1))
echo "==========================="$count"===========================" >> infoList.txt
echo "" >> infoList.txt
echo "" >> infoList.txt
echo "" >> infoList.txt
echo "" >> infoList.txt
infoList=$(tail -n $count <<< $infoList)
echo $infoList >> infoList.txt
chapterUrlList=$(sed 's/\(.*\)href="\([^"\n]*\)"\(.*\)/\2/g' <<< $infoList)
chapterNameList=$(sed 's/\(.*\)title="\([^"\n]*\)"\(.*\)/\2/g' <<< $infoList)

index=1
for url in $chapterUrlList; do
    name=$(sed -n $index'p' <<< $chapterNameList) && index=$(($index + 1))
    if [[ -e "$name" ]]; then
        continue
    fi
    echo "chapter: $name"
    sleep 3
    mkdir "$name" && cd "$name"
    echo "downloading chapter ""$name"
    wget "$url" -O "$name"".html" > /dev/null 2>&1;
    pageCount=$(cat "$name"".html" |grep "\ [0-9]* 頁" | sed 's/.*\ \([0-9]*\) 頁.*/\1/g')
    echo "pageCount ""$pageCount"
    # firstUrl=$(cat "$name"".html" |grep "id=\"ComicPic\"" | sed 's/.*<img src="\([^"\n]*\)" alt.*/\1/g')
    # baseUrl=$(sed 's/\(.*\)\/.*\/.*/\1/g' <<< $firstUrl)
    # chapterIndex=$(awk -F/ '{print $((NF-1))}' <<< $firstUrl)
    for x in {1..999}; do
        echo "downloading page "$x
        wget "$url""-p-"$x -O "$name"".html" > /dev/null 2>&1;
        # wget "$baseUrl""/""$chapterIndex""/"$x".jpg" -O $x".jpg"
        imageUrl=$(cat "$name"".html" |grep "id=\"ComicPic\"" | sed 's/.*<img src="\([^"\n]*\)" alt.*/\1/g')
        echo "url "$imageUrl
        wget "$imageUrl" -O $x".jpg" > /dev/null 2>&1;
        if [[ $x -eq $pageCount ]]; then
            break
        fi
    done
    cd ..;
done
