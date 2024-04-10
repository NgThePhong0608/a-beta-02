<?php

abstract class Car
{
    public $name;
    public $color;
    public function __construct($name, $color)
    {
        $this->name = $name;
        $this->color = $color;
    }
    abstract public function intro(): string;
}

class Audi extends Car
{
    public function intro(): string
    {
        return "Choose German quality! I'm an $this->name and have $this->color!";
    }
}

class Volvo extends Car
{
    public function intro(): string
    {
        return "Proud to be Swedish! I'm a $this->name and have $this->color!";
    }
}

class Citroen extends Car
{
    public function intro(): string
    {
        return "French extravagance! I'm a $this->name and have $this->color!";
    }
}

$audi = new audi("Audi", "Black");
echo $audi->intro();
echo "<br>";

$volvo = new volvo("Volvo", "Red");
echo $volvo->intro();
echo "<br>";

$citroen = new citroen("Citroen", "Blue");
echo $citroen->intro();
