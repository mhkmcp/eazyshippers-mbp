<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Notifications\RegisterActivate;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class RegisterAPIController extends Controller
{
    public function register(Request $request)
    {
        $loginData = $request->all();
        $validator = \Validator::make($loginData, [
            'users_first_name' => ['required', 'string', 'max:45'],
            'users_last_name' => ['required', 'string', 'max:45'],
            'email' => ['required', 'string', 'email', 'unique:users', 'max:50'],
            'password' => ['required', 'string', 'min:6', 'max:255'],

        ], [
            'users_first_name.required' => 'Please give your firstname!',
            'users_last_name.required' => 'Please give your lastname!',
            'password.required' => 'Please give your password!',
            'email.required' => 'Please give your email!',
            'email.email' => 'Give a valid email address!',
            'email.unique' => 'Email has been used!',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ], 404);
        }


        $user = new User();
        $user->users_first_name = $request->users_first_name;
        $user->users_last_name = $request->users_last_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        User::where('id', $user->id)->update([
            'customer_id'=>sprintf('ES%09d', $user->id)
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registration Successful!',
            'data' => ['user' => $user],
        ], 201);

    }

}