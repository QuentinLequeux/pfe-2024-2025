<?php

namespace App\Concerns;

use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

trait HandleImageUpload
{
    /**
     * Store and resize an uploaded image.
     *
     * @param UploadedFile $file
     * @param  int  $width
     * @param  int  $height
     * @return string
     */
    public function storeAndResizeImage(UploadedFile $file, int $width = 400, int $height = 300): string
    {
        $path = $file->store('public');

        //$fileName = uniqid() . '.' . $file->getClientOriginalExtension(); // 1

        $imageResized = Image::read($file)->cover($width, $height);

        // $imageData = (string) $imageResized->encode(); // 2

        $imageResized->save(Storage::disk('public')->path(basename($path)));

        // Storage::disk('s3')->put($fileName, $imageData, 'public'); // 3

        return Str::afterLast($path, '/');

        // return $fileName; // 4
    }
}
