<?php
interface Animal
{
    public function makeSound();
}

class Cat implements Animal
{
    public function makeSound()
    {
        echo "Meow" . "<br/>";
    }
}

class Dog implements Animal
{
    public function makeSound()
    {
        echo "Bark" . "<br/>";
    }
}

class Mouse implements Animal
{
    public function makeSound()
    {
        echo " Squeak " . "<br/>";
    }
}


$cat = new Cat();
$cat->makeSound();

$dog = new Dog();
$dog->makeSound();

$mouse = new Mouse();

$animals = array($cat, $dog, $mouse);

foreach ($animals as $animal) {
    $animal->makeSound();
}
