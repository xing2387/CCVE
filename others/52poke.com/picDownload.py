#! /usr/bin/python3

import requests
from bs4 import BeautifulSoup
import os


homepageUrl = "https://wiki.52poke.com/wiki/%E5%AE%9D%E5%8F%AF%E6%A2%A6%E5%88%97%E8%A1%A8%EF%BC%88%E6%8C%89%E5%85%A8%E5%9B%BD%E5%9B%BE%E9%89%B4%E7%BC%96%E5%8F%B7%EF%BC%89"
homepageText = requests.get(homepageUrl).text


soup = BeautifulSoup(homepageText, 'lxml')
# print(soup.select('table[class="eplist"]'))

tables = []
numIndexs = []
nameIndexs = []

for table in soup.findAll('table', attrs={"class":"eplist"}):
    tables.append(table)
    index = -1
    subColSpans = 0
    for th in table.select('tr')[0].select('th'):
        colSpan = th.get('colspan')
        if not colSpan:
            colSpan = 1
        else:
            subColSpans += int(colSpan)
        index += int(colSpan)
        if "全国" == str(th.string).strip():
            numIndexs.append(index)
        if "宝可梦" == str(th.string).strip():
            nameIndex = index - subColSpans
            # print(str(subColSpans) + ",")
            for th2 in table.select('tr')[1].select('th'):
                nameIndex += 1
                if "英文" == str(th2.string).strip():
                    nameIndexs.append(nameIndex)
                    break


detailPageUrlBase = "https://wiki.52poke.com/wiki/File:{num}{name}.png"


# for index in numIndexs:
#     print("numIndex " + str(index))
# print("")
# for index in nameIndexs:
#     print("nameIndex " + str(index))
# print("\n\n{len}".format(len=len(tables)))

# exit()

index = -1
for table in tables:
    index += 1
    numIndex = numIndexs[index]
    nameIndex = nameIndexs[index]
    # print(str(index) + ": " + str(numIndex) + ", "+str(nameIndex))
    for row in table.select('tr')[2:]:
        ths = row.select('td')
        numStr = str(ths[numIndex].string).strip()[1:]
        nameStr = str(ths[nameIndex].string).strip()
        # print( numStr + " - " + nameStr)
        if numStr.isdigit():
            url = detailPageUrlBase.format(num=numStr, name=nameStr)
            htmlStr = requests.get(url).text
            ss = BeautifulSoup(htmlStr, 'lxml')
            aa = ss.find('a', text="原始文件")
            picUrl = None
            if aa:
                picUrl = aa.get('href').strip()
            else:
                aa = ss.find('div', attrs={'class':'mw-filepage-resolutioninfo'}, text="没有更高的分辨率。")
                if aa:
                    bb = aa.findParent('div', attrs={'class':'fullImageLink'}).find('a')
                    if bb:
                        picUrl = str(bb.get('href'))
                        # print(picUrl)
            if not picUrl:
                print(" \t ================ " + numStr + " - " + nameStr +" , no url ========")
                continue
            if picUrl.startswith("//"):
                picUrl = "http:" + picUrl
            fileName = picUrl[picUrl.rindex("/")+1:]
            print(picUrl + " ---> " + fileName)
            if not os.path.isfile(fileName):
                pic = requests.get(picUrl)
                with open(fileName, "wb") as code:
                    code.write(pic.content)


