#!/usr/bin/env python
# pylint: disable=C0111
# pylint: disable=C0103
# pylint: disable=C0330
# pylint: disable=W0621
# ------------------------------------------------------------------------
# Automated posts archiving and removal for Invision Power Board v1.x
#
# Usage: ipb.py [verbose|archive-only]
#  - verbose        Prints additional logs
#  - archive-only   Does not edit/replace and posts content. Just an archive
#                   Markdown file.

from __future__ import print_function
import os
import sys
import time
import traceback
import json
import requests
from lxml import html
from lxml import etree
import re

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

        if not props.get('content'):
            raise NameError('Missing content config to replace the posts with!')

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
    if (config and session):
        print ('Logging user out ...')
        session.get(URL_LOGOUT.format(config['server_url']))

def get_topics(config, session, posts_batch=0):
    response = session.get(URL_LIST_POSTS.format(
        config['server_url'], config['search_id'], posts_batch))

    extracted = {}

    body = html.fromstring(response.content)
    #posts = body.xpath('//td[@class="row4"]/a[@class="linkthru"]')
    el_posts = body.xpath('//div[@class="tableborder"]')
    for el_post in el_posts:
        title = el_post.xpath('.//div[@class="maintitle"]/a[@class="linkthru"][1]/text()')
        title = title[-1]

        published_on = el_post.xpath('.//table[@class="tablebasic"]//td[@class="row4"]/strong/text()')
        published_on = published_on[-1]

        content = el_post.xpath('.//table[@class="tablebasic"]//td[@class="post1" and @align="left" and @width="100%"]')
        content = content[-1]
        content = etree.tostring(content, pretty_print=True)
        #content = re.sub(r'<br>', r'\n', content)

        # topic id the post is located in
        el_link = el_post.xpath('.//table[@class="tablebasic"]//a[@class="linkthru"][last()]')
        el_link = el_link[-1]
        post_link = etree.tostring(el_link)
        topic_id = el_link.get('href').split('&t=')
        topic_id = topic_id[1].split('&hl=')
        topic_id = topic_id[0]

        # post id
        post_id = el_link.text.lstrip('#')

        if config.get('verbose'):
            print ('Found post: {} in topic: {}'.format(post_id, topic_id))        

        posts = extracted.get(topic_id, [])
        posts.append({
            'post_id': post_id,
            'topic_id': topic_id,
            'title': title,
            'published_on': published_on,
            'content': content,
            'link': post_link
        })
        extracted[topic_id] = posts

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

def md_open(config):
    file_name = config['user'] + "_ipb_history.md"
    for i in range(100):
        if os.path.exists(file_name):
            file_name = config['user'] + "_ipb_history" + str(i) + ".md"
        else:
            break

    md_path = re.sub(r'[^\x00-\x7f]', r'', file_name)

    f = open(md_path, 'w')
    f.write('IPB Forum History\n=======================\n\n')
    f.write('User *{}* at forum [{}]({})\n\n'.format(config['user'], 
        config['server_url'], config['server_url']))
    return f

def md_append(config, f, posts):
    if posts.count > 0:
        title = posts[-1]['title']
        f.write("# {}\n".format(title.encode('utf-8')))

        for p in posts:
            if config.get('verbose'):
                print ('Writing post {} ...'.format(p['post_id']))

            f.write("## [Post - {}]({})\n\n".format(
                p['link'],
                p['post_id']))
            f.write(p['content'].encode('utf-8'))
            f.write('\n')

def md_close(config, f):
    if f:
        if config.get('verbose'):
            print ('Archives written to {}'.format(f.name))
        f.close()

#############################################################################
# Main
if __name__ == "__main__":
    try:
        g_config = config_load(os.path.join('.', CONFIG_FILE))

        if len(sys.argv) > 1:
            if 'verbose' in sys.argv:
                g_config['verbose'] = True
            if 'verbose' in sys.argv:
                g_config['archive-only'] = True                
        
        g_session = get_session(g_config)
        md_file = md_open(g_config)

        batch = 0
        g_topics = get_topics(g_config, g_session)

        while g_topics.keys():
            print ('Processing posts batch: {}'.format(batch))

            g_authkey = ''

            for k in g_topics:
                posts = g_topics.get(k)
                md_append(g_config, md_file, posts)

                if not g_config.get('archiv-eonly'):
                    for p in posts:
                        if not g_authkey:
                            g_authkey = get_auth_key(g_config, g_session, 
                                topic_id=p['topic_id'],
                                post_id=p['post_id'])

                            if g_config.get('verbose'):
                                print ('Found auth key: {}'.format(g_authkey))

                        time.sleep(1)

                        if g_config.get('verbose'):
                            print ('Editting post - {} ...'.format(p['post_id']))
                        
                        post_edit(g_config, g_session, 
                            topic_id=p['topic_id'],
                            post_id=p['post_id'],
                            auth_key=g_authkey,
                            content=g_config['content'])
                        time.sleep(1)
            
            batch += POSTS_PER_BATCH
            g_topics = get_topics(g_config, g_session, batch)
            time.sleep(1)
        
    except NameError as e:
        traceback.print_exc(file=sys.stdout)
        print('[ERROR] {}'.format(e))
    except Exception as e:
        traceback.print_exc(file=sys.stdout)
        print('[ERROR] {}'.format(e))
    finally:
        md_close(g_config, md_file)
        close_session(g_config, g_session)