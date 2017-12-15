# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# -*- coding: utf-8 -*-
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core import serializers
import requests
import json

from models import Book,ChinaAreaData,Dashboard,OrderCount,TypeCount,ProductCount,Predict,WorldAreaData


@require_http_methods(["GET"])
def show_dashboard(request):
    response = {}
    try:
        boarddata = Dashboard.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", boarddata))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception,e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)

@require_http_methods(["GET"])
def show_orderdata(request):
    response = {}
    try:
        orderdata = OrderCount.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", orderdata))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception,e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)

@require_http_methods(["GET"])
def show_typedata(request):
    response = {}
    try:
        typedata = TypeCount.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", typedata))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception,e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)

@require_http_methods(["GET"])
def show_predictdata(request):
    response = {}
    try:
        orderdata = OrderCount.objects.filter()
        response['orderdata']  = json.loads(serializers.serialize("json", orderdata))
        productdata = ProductCount.objects.filter()
        response['productdata']  = json.loads(serializers.serialize("json", productdata))
        predictdata = Predict.objects.filter()
        response['predictdata']  = json.loads(serializers.serialize("json", predictdata))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception,e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)

@require_http_methods(["GET"])
def show_areadata(request):
    response = {}
    try:
        areadata = ChinaAreaData.objects.filter()
        response['list']  = json.loads(serializers.serialize("json", areadata))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception,e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)

@require_http_methods(["GET"])
def show_worlddata(request):
    response = {}
    try:
        worlddata = WorldAreaData.objects.filter()
        response['worlddata']  = json.loads(serializers.serialize("json", worlddata))
        typedata = TypeCount.objects.filter()
        response['typedata']  = json.loads(serializers.serialize("json", typedata))
        response['msg'] = 'success'
        response['error_num'] = 0
    except  Exception,e:
        response['msg'] = str(e)
        response['error_num'] = 1
    return JsonResponse(response)