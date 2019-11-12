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
import ffmpeg
import json
import time
import threading
import download_fjisu


animUrlBase = "https://www.acgneta.com/animes/{aid}.html"
playUrlBase = "https://www.acgneta.com/api/playUrlEpisode?id={aid}"

aid = 529

playUrlList = []

    # var sourceUrl = "http://vd3.bdstatic.com/mda-iic837w83kzhy324/mda-iic837w83kzhy324.mp4";

def downloadAcgnetaMutiTread(pList):
    if not pList or len(pList) == 0:
        return
    step = math.ceil(len(pList) / 4)
    threadList = []
    for x in range(0, 4):
        start = x * step
        end = start + step
        print("start_thread - {start},{end}".format(start=start, end=end))
        thread = threading.Thread(target=downloadAcgneta, args=(pList[start:end],))
        threadList.append(thread)
        thread.start()
        time.sleep(1)
    for x in threadList:
        x.join()


def downloadAcgneta(pList):
    if not pList or len(pList) == 0:
        return
    for info in pList:
        if not info[1]:
            continue
        index = info[0]
        url = info[1]
        filename = "{index}.mp4".format(index=index)
        if os.path.exists(filename):
            continue
        print("download  " + url)
        url = url.replace("dilidili.name", "dilidili.one")
        htmlText = requests.get(url, allow_redirects=True).text
        videoUrl = re.findall(r'var\s+sourceUrl\s*=\s*\"(http.*?.[(mp4)(m3u8)])\s*\"', htmlText, re.I)
        if not videoUrl or len(videoUrl) == 0:
            continue
        ffmpeg.input(videoUrl[0]).output(filename).run()

# "http://www.fjisu.tv/acg/{id}/1.html"

def download(aid):
    global playUrlList
    jsonText = requests.get(playUrlBase.format(aid=aid)).text
    jsonInfoList = json.loads(jsonText)['Data']['List']
    for info in jsonInfoList:
        if not info or not info['Url'] or not info['Episode']:
            continue
        data = (info['Episode'], info['Url'])
        playUrlList.append(data)
        print(data)
    if len(playUrlList) == 0 or not playUrlList[0][1]:
        download_fjisu.download(aid)
        return
    if playUrlList[0][1].find(".fjisu.") != -1:
        aid = re.findall(r'.fjisu.*?/acg/(.+?)/', playUrlList[0][1], re.I)
        if aid and len(aid) > 0:
            download_fjisu.download(aid[0])
        else:
            print("fjisu，找不到动画id")
    else:
        downloadAcgnetaMutiTread(playUrlList)
    return

def main(argv):
    global aid
    try:
        opts, args = getopt.getopt(argv, "", ["id="])
        for opt, arg in opts:
            if opt == "--id":
                aid = arg
        download(aid)
    except getopt.GetoptError:
        print("------")
        sys.exit(2)

if __name__ == "__main__":
    main(sys.argv[1:])