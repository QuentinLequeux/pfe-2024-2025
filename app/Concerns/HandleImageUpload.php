<?php

namespace App\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

trait HandleImageUpload
{
    /**
     * Store and resize an uploaded image.
     *
     * @param UploadedFile $file
     * @param  array $sizes ['name' => [width, height]]
     * @return array ['name' => 'filename.jpg',...]
     */
    public function storeAndResizeImage(UploadedFile $file, array $sizes = [
        'large' => [400, 300],
        'medium' => [250, 190],
        'small' => [50, 50],
    ]): array
    {
        $filename = uniqid() . '.' . $file->getClientOriginalExtension();
        $storedPaths = [];

        foreach ($sizes as $key => [$width, $height]) {
            $image = Image::read($file)->cover($width, $height);
            $path = "/{$key}/{$filename}";
            //Storage::disk('public')->put($path, (string) $image->encode());
            Storage::disk('s3')->put($path, (string) $image->encode(), 'public');
            $storedPaths[$key] = $path;
        }

        return $storedPaths;
    }
}
