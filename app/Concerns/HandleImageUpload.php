<?php

namespace App\Concerns;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
        $path = $file->store( 'public');

        $imageResized = Image::read($file)->cover($width, $height);

        $imageResized->save(Storage::disk('public')->path(basename($path)));

        return Str::afterLast($path, '/');
    }
}
