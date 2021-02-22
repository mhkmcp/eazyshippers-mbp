<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('customer_id')->nullable();
            $table->string('users_first_name',45);
            $table->string('users_last_name', 45);
            $table->string('email')->unique();
            $table->string('users_phone')->nullable();
            $table->string('password', 255);
            $table->enum('users_gender', ['Male', 'Female', 'Other'])->nullable(); 
            $table->string('users_date_of_birth')->nullable();
            $table->enum('users_status', ['deactive', 'active'])->default('active')->nullable();
            $table->enum('users_is_admin', ['customer', 'admin'])->default('customer')->nullable();
            $table->enum('users_profile_status', ['profile incomplete', 'profile setup complete'])->default('profile incomplete')->nullable();
            $table->string('users_email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
