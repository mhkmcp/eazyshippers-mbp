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
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => ['required', 'string', 'email', 'unique:users'],
            'password' => ['required', 'string', 'min:6', 'max:60'],
            'country' => ['required', 'string']
        ], [
            'firstname.required' => 'Please give your firstname!',
            'lastname.required' => 'Please give your lastname!',
            'password.required' => 'Please give your password!',
            'email.required' => 'Please give your email!',
            'email.email' => 'Give a valid email address!',
            'email.unique' => 'Email has been used!',
            'country.required' => 'Please give your country!'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->getMessageBag(),
            ], 404);
        }

        $user = new User();
        $user->firstname = $request->firstname;
        $user->lastname = $request->lastname;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->country = $request->country;
        $user->save();

        $user = User::find($user->id);

        return response()->json([
            'success' => true,
            'message' => 'Registration Successful!',
            'data' => ['user' => $user],
        ], 201);
    }

}