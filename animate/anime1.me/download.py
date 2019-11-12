#! /usr/bin/env python3
# -*- coding:utf-8 -*-

import requests
import ffmpeg
import sys
import math
from lxml import etree
import urllib
import re
import io
import gzip
import json
import http.cookiejar
import os

animBaseUrl = "https://anime1.me/?cat={aid}"


headers = {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/78.0.3904.70 Chrome/78.0.3904.70 Safari/537.36'
}

def main(aid):
    # 创建cookiejar对象
    cookiejar = http.cookiejar.CookieJar()  # CookieJar()
    # 创建handler对象
    handler = urllib.request.HTTPCookieProcessor(cookiejar)
    # 创建opener
    opener = urllib.request.build_opener(handler)
    # htmlStr = requests.get(animBaseUrl.format(aid=aid)).text
    url = animBaseUrl.format(aid=aid)
    req = urllib.request.Request(url, headers=headers)
    htmlStr = opener.open(req).read()
    html = etree.HTML(htmlStr)
    chapterUrlList = html.xpath("//iframe/@src")
    downloadList = []
    index = 0
    for chapter in chapterUrlList:
        index += 1
        req = urllib.request.Request(chapter, headers=headers)
        chapterStr = opener.open(req).read().decode("utf-8")
        param = re.findall(r'\s*x.send\(\'(d=.*?)\'\)', chapterStr, re.I)[0]
        param = param.encode('utf-8')

        req = urllib.request.Request('https://v.anime1.me/apiv2', data=param, headers=headers)
        resp = opener.open(req).read().decode("utf-8")
        urlList = json.loads(resp)['sources']
        tempList = []
        for url in urlList:
            url = url['file']
            if not url:
                continue
            if not url.startswith("http"):
                if not url.startswith("//"):
                    url = "//" + url
                url = "https:" + url
            tempList.append((index, url))
        downloadList.append(tempList)
    doDownload(aid, downloadList)
            

def doDownload(aid, urlLists):
    if not urlLists or len(urlLists) <= 0:
        return
    for urlList in urlLists:
        if not urlList or len(urlList) <= 0:
            continue
        tempUrl = None
        height = 0
        index  = 0
        for u in urlList:
            if not u:
                continue
            print(u)
            chapterUrl = u[1]
            index = u[0]
            videoInfo = getVideoInfo(chapterUrl)
            print(videoInfo)
            if not videoInfo or (not videoInfo['height']):
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
    videoStream = {}
    try:
        probe = ffmpeg.probe(url)
        videoStream = next(
            (stream for stream in probe['streams'] if stream['codec_type'] == 'video'), None)
    except Exception as err:
        print(err)
    return videoStream

if __name__ == "__main__":
    main(sys.argv[1])
