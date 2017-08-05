
#!/usr/bin/env python
# pylint: disable=C0111
# pylint: disable=C0103
# pylint: disable=C0330
# pylint: disable=W0621

from __future__ import print_function
import os
import sys
import time
import argparse
import traceback
import json
import requests
from lxml import html

POSTS_PER_BATCH = 25

CONFIG_FILE = './ipb.conf'
URL_LOGIN = "{}/index.php?act=Login&CODE=01"
URL_LIST_POSTS = "{}/index.php?act=Search&nav=au&CODE=show&searchid={}&\
    search_in=posts&result_type=posts&hl=&st={}"
URL_GOTO_POST = "{}/index.php?act=Post&CODE=08&f=64&t={}&p={}&st=10"
URL_EDIT_POST = "{}/index.php?"
URL_LOGOUT = "{}/index.php?act=Login&CODE=03"

def config_load(config_path):
    if not os.path.exists(config_path):
        raise NameError('Cannot find config file {}!'.format(config_path))

    with open(config_path, 'r') as infile:
        props = json.load(infile)

        if not props.get('server_url') or not props.get('search_id'):
            raise NameError('Server settings not configured!')

        if not props.get('user') or not props.get('password'):
            raise NameError('User or pass not configured!')

        return props

def get_session(config):
    print ("Logging in user - '{}'".format(config['user']))
    with requests.session() as session:
        session.post(URL_LOGIN.format(config['server_url']), data={
            'UserName': config['user'],
            'PassWord': config['password'],
            'CookieDate': '1'
        })
        return session

def close_session(config, session):
    print ('Logging user out ...')
    session.get(URL_LOGOUT.format(config['server_url']))

def get_posts(config, session, page_posts=0):
    response = session.get(URL_LIST_POSTS.format(
        config['server_url'], config['search_id'], page_posts))

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

def get_auth_key(config, session, topic_id, post_id):
    response = session.get(URL_GOTO_POST.format(config['server_url'], 
        topic_id, post_id))
    body = html.fromstring(response.content)
    auth_key = body.xpath('(//input[@name="auth_key"])[1]/@value')
    return auth_key[-1]

def post_edit(config, session, topic_id, post_id, auth_key, content):
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
    session.post(URL_EDIT_POST.format(config['server_url']), data=payload)

#############################################################################
# Main
if __name__ == "__main__":
    try:
        g_config = config_load(os.path.join('.', CONFIG_FILE))
        g_session = get_session(g_config)
        g_posts = get_posts(g_config, g_session)

        g_authkey = ''

        for p in g_posts:
            ## TEST ##
            if p['post_id'] == '416592':
                if not g_authkey:
                    g_authkey = get_auth_key(g_config, g_session, 
                        topic_id=p['topic_id'],
                        post_id=p['post_id'])
                    print ('Found auth key: {}'.format(g_authkey))

                time.sleep(1)

                print ('Editting post - {} ...'.format(p['post_id']))
                post_edit(g_config, g_session, 
                    topic_id=p['topic_id'],
                    post_id=p['post_id'],
                    auth_key=g_authkey,
                    content='---')

                time.sleep(1)

        close_session(g_config, g_session)
    except NameError as e:
        print('[ERROR] {}'.format(e))
    except Exception as e:
        traceback.print_exc(file=sys.stdout)
        print('[ERROR] {}'.format(e))
