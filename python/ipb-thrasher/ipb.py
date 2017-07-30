
#!/usr/bin/env python
# pylint: disable=C0111
# pylint: disable=C0103
# pylint: disable=C0330

from __future__ import print_function
import os
import sys
import argparse
import traceback
import json
import requests
from lxml import html

CONFIG_FILE = './ipb.conf'
URL_LIST_POSTS = '/index.php?act=Search&nav=au&CODE=show&searchid=bb541bb820a3f0d06f44508afb8a70dd&search_in=posts&result_type=posts'
URL_EDIT_POST = '/index.php?'

def config_load(config_path):
    if not os.path.exists(config_path):
        raise Exception("Cannot find config file {0}!".format(config_path))

    with open(config_path, 'r') as infile:
        return json.load(infile)

def post_edit(content, config):
    result = session.post(URL_EDIT_POST)

    http://forums.bgdev.org/index.php?act=ST&f=39&t=49527&st=0

#############################################################################
# Main
if __name__ == "__main__":
    try:
        #home_dir = os.path.expanduser('~')
        config = config_load(os.path.join('.', CONFIG_FILE))

        URL = config['server_url'] + '/index.php?act=Login&CODE=01'
        payload = {
            'UserName': config['user'],
            'PassWord': 'PassWord:' + config['password'],
            'CookieDate': '1'
        }

        session = requests.session()
        r = requests.post(URL, data=payload)
        print(r.cookies)

        URL = config['server_url'] + URL_LIST_POSTS
        result = session.get(URL)
        tree = html.fromstring(result.content)
        posts = tree.xpath('//td[@class="row4"]/a[@class="linkthru"]/text()')
        print(posts)
    
    except Exception as e:
        traceback.print_exc(file=sys.stdout)
        print("[ERROR] {0}".format(e))