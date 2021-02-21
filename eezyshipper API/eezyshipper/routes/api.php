<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'prefix' => 'auth',
], function () {
    Route::get('/auth/createToken', 'API\Auth\LoginAPIController@createToken'); // just to check
    Route::post('login', 'API\Auth\LoginAPIController@login');
    Route::post('register', 'API\Auth\RegisterAPIController@register');

});

Route::group([
    'middleware' => 'auth:api',
], function () {
    Route::get('logout', 'API\Auth\LoginAPIController@logout');
    Route::get('user', 'API\Auth\AuthController@auth_user');
});

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('reset_request', 'API\Auth\PasswordResetController@create');
    Route::get('find/{token}', 'API\Auth\PasswordResetController@find');
    Route::post('reset', 'API\Auth\PasswordResetController@reset');
});


Route::get('/location/view-all', 'WarehouseController@index');
Route::post('/location/add', 'WarehouseController@create');
Route::get('/location/edit/{location}', 'WarehouseController@edit');
Route::put('/location/update/{location}', 'WarehouseController@update');
Route::delete('/location/delete/{location}', 'WarehouseController@destroy');


//Supplier details
Route::get('/supplier/view-all', 'SupplierController@index');
Route::post('/supplier/add', 'SupplierController@create');
Route::get('/supplier/edit/{id}', 'SupplierController@edit');
Route::put('/supplier/update/{id}', 'SupplierController@update');
Route::delete('/supplier/delete/{id}', 'SupplierController@destroy');





