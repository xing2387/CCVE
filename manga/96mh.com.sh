name="haidaozhanji"
type="maoxian"
host="http://www.96mh.com"
wget $host"/"$type"/"$name -O $name".html" > /dev/null 2>&1 

chapterList=$(cat $name".html" |grep 'mh-chapter-list-ol-0' | sed 's/_blank/\n/g' |grep "<a.*href*" | sed 's/\(.*\)href="\([^"\n]*\)"\(.*\)/\2/g')
chapterNameList=$(cat $name".html" |grep 'mh-chapter-list-ol-0' | sed 's/<i><\/i>/\n/g' | grep "<a.*href*" | sed 's/.*<p>\(.*\)<\/p>/\1/g')

index=1
for chapter in $chapterList; do
    chapterId=$(echo $chapter | awk -F [./] '{print $4}');
    chapterName=$(sed -n $index'p' <<< $chapterNameList);
    index=$(($index+1));
    if [[ -e $chapterName ]]; then
        continue;
    fi;
    echo "下载章节 "$chapterName
    sleep 1
    mkdir $chapterName && cd $chapterName;
    wget $host"/"$chapter -O $chapterId".html" > /dev/null 2>&1;
    imgsBase64=$(cat $chapterId".html" | grep "qTcms_S_m_murl_e=" | sed 's/var.*qTcms_S_m_murl_e="\(.*\)";/\1/g');
    imgList=$(base64 -d <<< $imgsBase64 | sed 's/\$qingtiandy\$/\n/g');
    echo "图片数： " $(wc -l <<<$imgList )
    sleep 2
    page=1;
    for x in $imgList; do
        echo "downloading "$page".jpg"
        wget $x -O $page".jpg" > /dev/null 2>&1 && page=$(($page + 1));
    done;
    cd ..;
done
    
    