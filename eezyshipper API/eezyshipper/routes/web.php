<?php

use Illuminate\Support\Facades\Route;
use Haruncpi\LaravelIdGenerator\IdGenerator;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {

    return response()->json([
        'name' => 'eezyshipper',
        'message' => 'Hello World',
    ]);
    
    // $config = ['table' => 'users', 'length' => 11, 'prefix' => 'ES'];
    // $id = IdGenerator::generate($config);

    // //\DB::table('users')->insert(['id'=>$id]);

    // //echo $id;

    // return $id;
});

// Route::get('/registermail', function () {
//     return view('mail.reset')->with(['url' => "http://google.com", 'app_url' => url('/')]);
// });



