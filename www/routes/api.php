<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





 use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CorpController;
use App\Http\Controllers\FileListController;
use App\Http\Controllers\OrderDetailController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\SalesTypeController;


use App\Http\Controllers\WayBillController;
use App\Http\Controllers\NoteController;





Route::get('/Articels',[ArticleController::class, 'articles']);
Route::get('/corps',[CorpController::class, 'corps']);
Route::get('/files',[FileListController::class, 'files']);
Route::get('/files/{id}',[FileListController::class, 'articelfiles']);

Route::get('/OrderDetail/{id}',[OrderDetailController::class, 'orderdetail']);
Route::get('/producttype',[ProductTypeController::class, 'producttype']);
Route::get('/salestype',[SalesTypeController::class, 'salestypes']);

Route::get('/waybill/{id}',[WayBillController::class, 'waybill']);

Route::get('/multimotion/{id}',[WayBillController::class, 'multimotion']);

Route::get('/onemotion/{id}',[WayBillController::class, 'onemotion']);

Route::post('/ShipmentSave',[WayBillController::class, 'ShipmentSave']);

Route::get('/waybillphoto/{id}',[WayBillController::class, 'waybillphoto']);

Route::post('/waybillphotosave',[WayBillController::class, 'waybillphotosave']);






Route::get('/note/{id}',[NoteController::class, 'note']);

Route::post('/updateNote',[NoteController::class, 'updateNote']);


Route::post('/uploadFile',[FileListController::class, 'uploadfile']);








