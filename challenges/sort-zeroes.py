#!/usr/bin/env python
# -*- coding: utf-8 -*-

# Sample: [0, 0, 1, 7, 0, 8, 2, 0]

a = [0, 0, 1, 7, 0, 8, 2, 0]
print ("RESULT: {}".format(list(filter(lambda i: i == 0, a)) + list(filter(lambda i: i != 0, a))))
