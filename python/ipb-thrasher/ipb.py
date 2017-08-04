
#!/usr/bin/env python
# pylint: disable=C0111
# pylint: disable=C0103
# pylint: disable=C0330
# pylint: disable=W0621

from __future__ import print_function
import os
import sys
import argparse
import traceback
import json
import requests
from lxml import html


CONFIG_FILE = './ipb.conf'
URL_LOGIN = "{}/index.php?act=Login&CODE=01"
URL_LIST_POSTS = "{}/index.php?act=Search&nav=au&CODE=show&searchid={}&\
    search_in=posts&result_type=posts"
URL_GOTO_POST = "{}/index.php?act=Post&CODE=08&f=64&t={}&p={}&st=10"
URL_EDIT_POST = "{}/index.php?"
URL_LOGOUT = "{}/index.php?act=Login&CODE=03"

def config_load(config_path):
    if not os.path.exists(config_path):
        raise Exception("Cannot find config file {0}!".format(config_path))

    with open(config_path, 'r') as infile:
        return json.load(infile)

def get_session(config):
    print ("Logging in user - '{}'".format(config['user']))
    session = requests.session()
    session.post(URL_LOGIN.format(config['server_url']), data={
        'UserName': config['user'],
        'PassWord': 'PassWord:' + config['password'],
        'CookieDate': '1'
    })
    return session

def close_session(session, config):
    print ('Logging out ...')
    session.get(URL_LOGOUT.format(config['server_url']))

def get_posts(session, config):
    response = session.get(URL_LIST_POSTS.format(
        config['server_url'], config['search_id']))

    body = html.fromstring(response.content)
    posts = body.xpath('//td[@class="row4"]/a[@class="linkthru"]')
    extracted = []

    for p in posts:
        # topic id the post is located in
        topic_id = p.get('href').split('&t=')
        topic_id = topic_id[1].split('&hl=')
        topic_id = topic_id[0]

        # post id
        post_id = p.text.lstrip('#')
        print ('Found post: {} in topic: {}'.format(post_id, topic_id))

        extracted.append({
            'post_id': post_id,
            'topic_id': topic_id
        })

    return extracted

def get_auth_key(session, topic_id, post_id, config):
    response = session.get(URL_GOTO_POST.format(config['server_url'], 
        topic_id, post_id))
    print (*response)
    body = html.fromstring(response.content)
    auth_key = body.xpath('//input[@name="auth_key"]')
    print (*auth_key)
    return auth_key

def post_edit(session, topic_id, post_id, auth_key, content, config):
    payload = {
        'st': '10',
        'act': 'Post',
        's': '',
        'f': '64',
        'auth_key': auth_key,
        'MAX_FILE_SIZE': '1048576',
        'CODE': '09',
        't': topic_id,
        'p': post_id,
        'st': '10',
        'bbmode': 'normal',
        'ffontst': '0',
        'fsize': '0',
        'fcolor': '0',
        'tagcount': '0',
        'helpbox': 'Help',
        'Post': content,
        'enableemo': 'yes',
        'enablesig': 'yes',
        'iconid': '0',
        'FILE_UPLOAD': ''
    }

    response = session.post(URL_EDIT_POST.format(config['server_url']), 
        data=payload)

#############################################################################
# Main
if __name__ == "__main__":
    try:
        g_config = config_load(os.path.join('.', CONFIG_FILE))
        g_session = get_session(g_config)
        #g_posts = get_posts(g_session, g_config)

        auth_key = get_auth_key(g_session, 
            topic_id=49445,
            post_id=416592,
            config=g_config)
        print (auth_key)

        # for p in g_posts:
        #     if (p['post_id'] == '416592'):
        #         auth_key = get_auth_key(g_session, 
        #         topic_id=p['topic_id'],
        #         post_id=p['post_id'],
        #         config=g_config)
        #         print (auth_key)

        close_session(g_session, g_config)
    except Exception as e:
        traceback.print_exc(file=sys.stdout)
        print('[ERROR] {0}'.format(e))
