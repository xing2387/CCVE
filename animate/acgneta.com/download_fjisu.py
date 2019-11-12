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
import threading
from functools import partial
import time

id = 821
baseUrl = "http://www.fjisu.tv/acg/{id}/1.html"

chapterUrlLists = []


def writeOutput(text, filename):
    out = sys.stdout
    with open(filename, 'w') as f:
        sys.stdout = f
        print(text)
    sys.stdout = out


def download(pid):
    global id
    id = pid
    collectChapterUrl()
    # print(chapterUrlLists)
    if len(chapterUrlLists) <= 0:
        print("没有找到下载链接，退出")
        return
    step = math.ceil(len(chapterUrlLists) / 5)
    threadList = []
    for x in range(0, 5):
        start = x * step
        end = start + step
        print("start_thread - {start},{end}".format(start=start, end=end))
        thread = threading.Thread(target=doDownload, args=(chapterUrlLists[start:end],))
        threadList.append(thread)
        thread.start()
        time.sleep(1)
    for x in threadList:
        x.join()

def collectChapterUrl():
    global chapterUrlLists
    global id
    baseContent = requests.get(baseUrl.format(id=id)).text
    html = etree.HTML(baseContent)
    jsList = html.xpath('/descendant::script')
    if jsList:
        for js in jsList:
            if not js.xpath('.//@src'):
                continue
            jsUrl = js.xpath('.//@src')[0]
            if not jsUrl or not re.findall(r"s{id}.js".format(id=id), jsUrl, re.I):
                continue
            print("jsUrl--- " + jsUrl)
            jsUrlList = []
            jsContent = requests.get(jsUrl).text
            i = 0
            for chapterUrl in re.findall(r'\"\s*(http.*?.[(mp4)(m3u8)])\s*\,', jsContent, re.I):
                i += 1
                print("\t"+chapterUrl)
                jsUrlList.append((i,chapterUrl))
            if len(jsUrlList) > 0:
                chapterUrlLists.append(jsUrlList)
    if len(chapterUrlLists) == 0:
        return
    chapterUrlLists = list(zip(*chapterUrlLists))

def doDownload(urlLists):
    if not urlLists or len(urlLists) <= 0:
        return
    global id
    for urlList in urlLists:
        if not urlList or len(urlList) <= 0:
            continue
        tempUrl = None
        height = 0
        index  = 0
        for u in urlList:
            if not u:
                continue
            chapterUrl = u[1]
            index = u[0]
            videoInfo = getVideoInfo(chapterUrl)
            print(videoInfo)
            if not videoInfo:
                continue
            if not tempUrl:
                tempUrl = chapterUrl
                height = videoInfo['height']
            elif height < videoInfo['height']:
                tempUrl = chapterUrl
                height = videoInfo['height']
        url = tempUrl
        tempUrl = None
        videoOutName = '{index}.mp4'.format(index=index)
        if os.path.exists(videoOutName):
            print("file exist, skip. {file} -> {url} ".format(file=videoOutName, url=url))
            continue
        print("downloading video: {file} : {url}".format(file=videoOutName, url=url))
        ffmpeg.input(url).output(videoOutName).run()

def getVideoInfo(url):
    probe = ffmpeg.probe(url)
    videoStream = next(
        (stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
    return videoStream


def main(argv):
    global id
    try:
        opts, args = getopt.getopt(argv, "", ["id="])
        for opt, arg in opts:
            if opt == "--id":
                id = arg
        download(id)
    except getopt.GetoptError:
        print("------")
        sys.exit(2)


if __name__ == "__main__":
    main(sys.argv[1:])
