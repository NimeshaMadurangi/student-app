<?php

namespace Domain\Facades;

use Illuminate\Support\Facades\Facade;

class StudentFacade extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'student';
    }
}