<?php

namespace App\Http\Controllers;

use App\Models\Product;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::paginate(10);
        return view('product.index', compact('products'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('product.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateRequest = $request->validate([
            'name' => ['required', 'max:255'],
            'image' => ['required', 'image', 'max:2048'],
            'price' => ['required', 'numeric'],
            'description' => 'required',
        ])
        ;
        $cloudinaryImage = $request->file('image')->storeOnCloudinary('products');
        $url = $cloudinaryImage->getSecurePath();
        $public_id = $cloudinaryImage->getPublicId();

        Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_url' => $url,
            'image_public_id' => $public_id,
        ]);

        return redirect()->route('products.index')->with('message', 'Created successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return view('product.edit', compact('product'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validateRequest = $request->validate([
            'name' => ['sometimes','required', 'max:255'],
            'image' => ['sometimes','required', 'image', 'max:2048'],
            'price' => ['sometimes','required', 'numeric'],
            'description' => ['sometimes','required'],
        ]);

        if($request->hasFile('image')){
            Cloudinary::destroy($product->image_public_id);
            $cloudinaryImage = $request->file('image')->storeOnCloudinary('products');
            $url = $cloudinaryImage->getSecurePath();
            $public_id = $cloudinaryImage->getPublicId();

            $product->update([
                'image_url' => $url,
                'image_public_id' => $public_id,
            ]);

        }

        $product->update([
            'name' => $validateRequest['name'],
            'description' => $validateRequest['description'],
            'price' => $validateRequest['price']
        ]);

        return redirect()->route('products.index')->with('message', 'Updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Cloudinary::destroy($product->image_public_id);
        $product->delete();
        return redirect()->route('products.index')->with('message', 'Deleted Successfully');

    }
}
