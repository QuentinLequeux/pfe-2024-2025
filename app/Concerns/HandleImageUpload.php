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
        $path = $file->store( 's3');

        $imageResized = Image::read($file)->cover($width, $height);

        $imageData = (string) $imageResized->encode();

        $fileName = basename($path);

        Storage::disk('s3')->put($fileName, $imageData);

        //$imageResized->save(Storage::disk('s3')->path(basename($path)));

        return Str::afterLast($path, '/');
    }
}
