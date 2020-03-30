#! /bin/bash

mangaName=$1
outputDirName="$2"

if [[ ! -f "aes.py" ]]; then
    echo "缺少aes.py文件，退出"
    exit
fi

if [[ ! -e "$outputDirName" ]]; then
    mkdir "$outputDirName"
fi
cd "$outputDirName"

mainHost="https://www.manhuadui.com"
#图片资源服务器配置
echo "下载图片资源服务器配置"
configFile=$mainHost"/js/config.js?v0108"
hostArray=($(curl -s $configFile | grep resHost | awk -F , '{print $2"\n"$4}' | sed 's/.*\[\"\(.*\)\"\].*/\1/g'))
hostIndex=0
imageHost=${hostArray[$hostIndex]}


#漫画各章节url
echo "获取漫画各章节url"
wget -q $mainHost"/manhua/"$mangaName"/" -O $mangaName".html"

chapterUrlArray=($(cat $mangaName".html" | grep -E "<a\W*href.*\W*title.*\W*target.*blank\">" | sed "s/.*href=\"\([^\"]*\)\".*/\1/g"))
chapterNameArray=($(cat $mangaName".html" | grep -E "<a\W*href.*\W*title.*\W*target.*blank\">" | sed "s/.*title=\"\([^\"]*\)\".*/\1/g"))

chapterCount=${#chapterNameArray[*]}

echo "共"$chapterCount"章"

for((x=0; x<$chapterCount; x++)); do
    echo "下载第"$((x+1))"章"

    chapterName="${chapterNameArray[$x]}"
    if [[ -e "$chapterName" ]]; then
        continue
    fi
    mangaDir=$(pwd)
    mkdir "$chapterName" && cd "$chapterName"
    wget -q $mainHost""${chapterUrlArray[$x]} -O "$chapterName"".html"
    imagePath=$(cat "$chapterName"".html" |grep chapterPath | sed "s/;/\n/g" | grep chapterPath | sed "s/.*\"\(.*\)\".*/\1/g")

    encodedFilename=$(cat "$chapterName"".html" |grep chapterImages | sed "s/;/\n/g" | grep chapterImages | sed "s/.*\"\(.*\)\".*/\1/g")
    decodedFilename=$(python3 ../../aes.py decode "123456781234567G" "ABCDEF1G34123412" $encodedFilename)
    imagefiles=($(echo $decodedFilename | sed "s/[]\"\[]//g"| awk -F , '{for(i=1;i<=NF;i++){print $i}}'))
    imageCount=${#imagefiles[*]}
    echo "共"$imageCount"页"
    for ((i=0; i<$imageCount; i++)); do
        echo "下载第"$(($x + 1))"/"$chapterCount"章 第$(($i + 1))/"$imageCount"页"
        filenameSubfix=$(echo ${imagefiles[$i]} | awk -F . '{print $2}')
        wget -q "$imageHost""/$imagePath""${imagefiles[$i]}" -O $(($i+1))"$filenameSubfix"
        if [[ $? -eq 0 ]];then
            echo "succcess"
        else
            echo "failed"
        fi
    done
    cd $mangaDir
    echo "下载第"$((x+1))"章　ｄｏｎｅ"
    echo ""
done