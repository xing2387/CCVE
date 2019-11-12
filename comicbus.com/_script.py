#! /usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import getopt
import requests
import lxml
from lxml import etree
from lxml import html
import math
import re

cs = ""

#103海贼

id = 0
startChapter = 1
baseUrl = "https://www.comicbus.com/html/{id}.html"
chapterUrl = "https://www.comicbus.xyz/online/comic-{id}.html?ch={chapter}"

imageUrl = "http://img{va}.8comic.com/{vb}/{id}/{chapter}/{pagef}_{subfix}.jpg"

az = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

chapterInfo = []
indexInfo = {}


def indexOf(c):
    return az.index(c)


def cl(str):
    a = str[0]
    b = str[1]
    va = indexOf(a)
    vb = indexOf(b)
    if a == "Z":
        vv = 8000 + vb
    else:
        vv = va * 52 + vb
    return vv


def parseChapterInfo(tableHtml):
    global chapterInfo
    for a in tableHtml.findall('.//a'):
        name = a.text.strip()
        linkInfo = a.xpath('.//@onclick')[0]
        if (not name) and (a.xpath('.//font')):
            name = a.xpath('.//font')[0].text
        if name:
            linkInfo = re.match(
                "cview.*\'(.*?).html\'.*?(\d+).*?(\d+).*?\)", linkInfo).group(1).split("-")
            chapterIndex = linkInfo[1]
            link = chapterUrl.format(id=linkInfo[0], chapter=chapterIndex)
            chapterInfo.append((name, int(chapterIndex), link))


def parseIndexInfo(html):
    global indexInfo
    aa = []
    for script in html.xpath("//script"):
        # print(script.text)
        if type(script.text) is not str:
            continue
        cs = re.match(".*var cs='(.*?)'.*?var.*?var\s*(.*?)\s*=\s*lc.*var\s*(.*?)\s*=\s*lc.*var\s*(.*?)\s*=\s*lc.*var\s*(.*?)\s*=\s*lc.*src=(.*?).jpg", script.text, re.S | re.M)
        if cs:
            css = cs.group(1)
            urlbase = cs.group(6)
            aa.append([1, cs.group(2), urlbase.find(cs.group(2))])
            aa.append([2, cs.group(3), urlbase.find(cs.group(3))])
            aa.append([3, cs.group(4), urlbase.find(cs.group(4))])
            aa.append([4, cs.group(5), urlbase.find(cs.group(5))])
            maxIndex = max(aa, key=lambda b: b[2])
            currSum = 0
            for a in aa:
                a.append(currSum)
                if a[0] == maxIndex[0]:
                    currSum += 40
                else:
                    currSum += 2
                a.append(currSum)
            aa.sort(key=lambda bb: bb[2])
            break
    # print(aa)
    for a in aa:
        value = (a[3], a[4])
        # print(str(aa.index(a)))
        if aa.index(a) == 0:
            indexInfo["pageCount"] = value
        elif aa.index(a) == 1:
            indexInfo["key"] = value
        elif aa.index(a) == 2:
            indexInfo["chapter"] = value
        elif aa.index(a) == 3:
            indexInfo["subfix"] = value


def parseCS(html):
    for script in html.xpath("//script"):
        if type(script.text) is not str:
            continue
        cs = re.match(".*var cs='(.*?)'.*", script.text, re.S | re.M)
        if cs:
            return cs.group(1)
    return None


def main(argv):
    global baseUrl
    global id
    global cs
    global startChapter
    global indexInfo
    try:
        opts, args = getopt.getopt(argv, "", ["id=", "chapter="])
        for opt, arg in opts:
            if opt == "--id":
                id = arg
            elif opt == "--chapter":
                startChapter = int(arg)
    except getopt.GetoptError:
        print("------")
        sys.exit(2)
    base = baseUrl.format(id=id)
    baseContent = requests.get(base).text.encode('ISO-8859-1').decode('big5', errors="ignore")
    html = etree.HTML(baseContent)
    # print(baseContent.encoding)

    table = html.xpath('/descendant::table[@id="rp_ctl04_0_dl_0"]')
    if table:
        table = table[0]
        parseChapterInfo(table)
    table = html.xpath('/descendant::table[@id="rp_ctl05_0_dl_0"]')
    if table:
        table = table[0]
        parseChapterInfo(table)
    print(chapterInfo)

    csSectionIndex = 0
    for x in chapterInfo:
        csSectionIndex += 1
        print(x)
        ccName = x[0]
        ccChapter = x[1]
        ccLink = x[2]
        if os.path.exists(ccName):
            print("skip chapter " + str(ccName))
            continue
        os.mkdir(ccName)
        os.chdir(ccName)

        chapterHtmlStr = requests.get(ccLink).text.encode(
            'ISO-8859-1').decode('big5', errors="ignore")
        chapterHtml = etree.HTML(chapterHtmlStr)
        cs = parseCS(chapterHtml)
        parseIndexInfo(chapterHtml)
        print(indexInfo)

        cStart = csSectionIndex * 46 - 46
        cEnd = csSectionIndex * 46
        cc = cs[cStart: cEnd]
        print(cc+"=cs["+str(cStart) +":" + str(cEnd) +"]")

        indexS = indexInfo["pageCount"][0]
        indexE = indexInfo["pageCount"][1]
        pageCount = cl(cc[indexS:indexE])

        print("downloading chapter " + str(ccName))
        print("page count " + str(pageCount))
        for page in range(0, pageCount):
            offset = indexInfo["subfix"][0]
            vStart = math.floor(page/10 % 10) + \
                math.floor(page % 10)*3 + offset
            vEnd = vStart + 3
            subfix = cc[vStart: vEnd]
            # print("subfix=cc[" + str(vStart) + ","+str(vEnd) + "] " + subfix)
            vv = str(cl(cc[indexInfo["key"][0]:indexInfo["key"][1]]))
            # print("vv=" + vv)
            chapter = cl(cc[indexInfo["chapter"][0]:indexInfo["chapter"][1]])
            img = imageUrl.format(
                va=vv[0], vb=vv[1], id=id, chapter=chapter, pagef="%03d" % (page+1), subfix=subfix)
            print(img)
            r = requests.get(img)
            with open(ccName + "-"+str(page)+".jpg", "wb") as imgFile:
                imgFile.write(r.content)
        os.chdir("..")


if __name__ == "__main__":
    main(sys.argv[1:])
