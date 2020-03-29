#! /usr/bin/env python3
#coding:utf-8

##https://www.cnblogs.com/chen0307/p/11345601.html
import base64
import sys
from Crypto.Cipher import AES       #注：python3 安装 Crypto 是 pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple pycryptodome<br><br>
def pkcs7padding(text):
    """
    明文使用PKCS7填充
    最终调用AES加密方法时，传入的是一个byte数组，要求是16的整数倍，因此需要对明文进行处理
    :param text: 待加密内容(明文)
    :return:
    """
    bs = AES.block_size  # 16
    length = len(text)
    bytes_length = len(bytes(text, encoding='utf-8'))
    # tips：utf-8编码时，英文占1个byte，而中文占3个byte
    padding_size = length if(bytes_length == length) else bytes_length
    padding = bs - padding_size % bs
    # tips：chr(padding)看与其它语言的约定，有的会使用'\0'
    padding_text = chr(padding) * padding
    return text + padding_text
 
 
def pkcs7unpadding(text):
    """
    处理使用PKCS7填充过的数据
    :param text: 解密后的字符串
    :return:
    """
    try:
        length = len(text)
        unpadding = ord(text[length-1])
        return text[0:length-unpadding]
    except Exception as e:
        pass
 
 
def aes_encode(key,iv,content):
    """
    AES加密
    key,iv使用同一个
    模式cbc
    填充pkcs7
    :param key: 密钥
    :param content: 加密内容
    :return:
    """
    key_bytes = bytes(key, encoding='utf-8')
    # iv = key_bytes
    cipher = AES.new(key_bytes, AES.MODE_CBC, iv)
    # 处理明文
    content_padding = pkcs7padding(content)
    # 加密
    aes_encode_bytes = cipher.encrypt(bytes(content_padding, encoding='utf-8'))
    # 重新编码
    result = str(base64.b64encode(aes_encode_bytes), encoding='utf-8')
    return result
 
 
def aes_decode(key,iv,content):
    """
    AES解密
    #  key,iv使用同一个
    模式cbc
    去填充pkcs7
    :param key:
    :param content:
    :return:
    """
    try:
        key_bytes = bytes(key, encoding='utf-8')
        # iv = key_bytes
        cipher = AES.new(key_bytes, AES.MODE_CBC, iv)
        # base64解码
        aes_encode_bytes = base64.b64decode(content)
        # 解密
        aes_decode_bytes = cipher.decrypt(aes_encode_bytes)
        # 重新编码
        result = str(aes_decode_bytes, encoding='utf-8')
        # 去除填充内容
        result = pkcs7unpadding(result)
    except Exception as e:
        pass
    if result == None:
        return ""
    else:
        return result


if len(sys.argv) != 5:
    print("参数长度不对")
else:
    key = sys.argv[2]
    iv = sys.argv[3]
    data = sys.argv[4]
    if sys.argv[1] == 'decode':
        print(aes_decode(key,iv,data))
    elif sys.argv[1] == 'encode':
        print(aes_encode(key,iv,data))


# key = '123456781234567G'
# iv = 'ABCDEF1G34123412'
 
# 对英文加密
# mi = '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'
# mi = aes_encode(key,iv,data)
# print(mi)
# 解密
# print(aes_decode(key,iv,mi))
 
 
# # 中英文混合加密
# data = 'Hello, 韩- 梅 -梅'
# aes_encode_mixed = aes_encode(key,iv,data)
# print(aes_encode_mixed)
# # 解密
# print(aes_decode(key,iv,aes_encode_mixed))