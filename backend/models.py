# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.

# Create your models here.
class Book(models.Model):
    book_name = models.CharField(max_length=64)
    add_time = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.book_name

class Dashboard(models.Model):
    time = models.CharField(max_length=64)           # 订单时间
    order_number = models.CharField(max_length=64)   # 订单号 
    order_name = models.CharField(max_length=64)     # 订单名称

class OrderCount(models.Model):
    date = models.CharField(max_length=64)
    order_count = models.IntegerField()
    product_count = models.IntegerField()
    allprice = models.IntegerField()

class TypeCount(models.Model):
    date = models.CharField(max_length=64)
    naifen_count = models.IntegerField()
    muying_count = models.IntegerField()
    hufu_count = models.IntegerField()
    shipin_count = models.IntegerField()
    richang_count = models.IntegerField()
    baojian_count = models.IntegerField()

class ProductCount(models.Model):
    date = models.CharField(max_length=64)
    naifen_Aptamil = models.IntegerField()
    naifen_Gallia = models.IntegerField()
    naifen_Babybio = models.IntegerField()
    muying_Hipp = models.IntegerField()
    hufu_Herbacin = models.IntegerField()
    hufu_Balea = models.IntegerField()
    shipin_Hipp = models.IntegerField()
    richang_Brita = models.IntegerField()
    richang_Facelle = models.IntegerField()
    baojian_Salus = models.IntegerField()
    baojian_Doppelherz = models.IntegerField()

class Predict(models.Model):
    date = models.CharField(max_length=64)
    order_count = models.IntegerField()
    naifen_Aptamil = models.IntegerField()
    naifen_Gallia = models.IntegerField()
    naifen_Babybio = models.IntegerField()
    muying_Hipp = models.IntegerField()
    hufu_Herbacin = models.IntegerField()
    hufu_Balea = models.IntegerField()
    shipin_Hipp = models.IntegerField()
    richang_Brita = models.IntegerField()
    richang_Facelle = models.IntegerField()
    baojian_Salus = models.IntegerField()
    baojian_Doppelherz = models.IntegerField()

class ChinaAreaData(models.Model):
    name = models.CharField(max_length=100)   # 地区名称 
    value = models.IntegerField()             # 总金额

class WorldAreaData(models.Model):
    name = models.CharField(max_length=100)   # 国家名称
    value = models.IntegerField()             # 商品数量

