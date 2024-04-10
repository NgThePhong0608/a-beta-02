<?php

class Fruit
{
    private $name;
    private $color;

    // constructor
    function __construct($name, $color)
    {
        $this->name = $name;
        $this->color = $color;
    }

    // destructor
    function __destruct()
    {
        // echo "The fruit is {$this->name} and the color is {$this->color}.";
    }

    function set_name($name)
    {
        $this->name = $name;
    }

    function get_name()
    {
        return $this->name;
    }

    function set_color($color)
    {
        $this->color = $color;
    }

    function get_color()
    {
        return $this->color;
    }
}

// Inheritance
class Strawberry extends Fruit
{
    public $weight;
    public function message()
    {
        echo "Am I a fruit or a berry? ";
    }

    public function __construct($name, $color, $weight)
    {
        $this->name = $name;
        $this->color = $color;
        $this->weight = $weight;
    }
    public function intro()
    {
        echo "The fruit is {$this->name}, the color is {$this->color}, and the weight is {$this->weight} gram.";
    }
}

// PHP Constants
class Goodbye
{
    const LEAVING_MESSAGE = "Thank you for visiting W3Schools.com!\n";
    public function byebye()
    {
        echo self::LEAVING_MESSAGE;
    }
}

$goodbye = new Goodbye();
$goodbye->byebye();

$apple = new Fruit("Apple", "Red");
echo $apple->get_name();
$apple->set_name("Green Apple");
echo $apple->get_name();
echo $apple->get_color();

$strawberry = new Strawberry("Strawberry", "Red", 50);
$strawberry->message() . '<br />';
echo $strawberry->get_name() . '<br />';
$strawberry->intro();
