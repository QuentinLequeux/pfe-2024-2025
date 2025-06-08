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
        //$path = $file->store( '', 's3');

        $fileName = uniqid() . '.' . $file->getClientOriginalExtension();

        $imageResized = Image::read($file)->cover($width, $height);

        $imageData = (string) $imageResized->encode();

        //$fileName = basename($path);

        Storage::disk('s3')->put($fileName, $imageData, 'public');

        //$imageResized->save(Storage::disk('s3')->path(basename($path)));

        $publicBase = 'https://petshelter.367be3a2035528943240074d0096e0cd.r2.dev';

        return "{$publicBase}/{$fileName}";
    }
}
