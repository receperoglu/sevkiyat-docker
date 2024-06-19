<?php

namespace App\Http\Controllers;

use App\Models\FileList;
use Illuminate\Http\Request;

class FileListController extends Controller
{
    public function files()
    {
        return FileList::all();
    }

    public function articelfiles($id)
    {
        return FileList::where("ArticelId", $id)->get();
    }

    public function uploadFile(Request $request)
    {
        $file = $request->file('file');
        $articelId = $request->ArticelId;
        $filetype = $request->FileType;
        $ext = $file->extension();
        $name = $file->getClientOriginalName();
        $hedefDizin = public_path('files');

        $dosyaAdi = time() . '_' . $file->getClientOriginalName();
        $file->move($hedefDizin, $dosyaAdi);
        $dosyaYolu = 'files/' . $dosyaAdi;

        $cleanedName = preg_replace("/[^A-Za-z0-9\-\.]/", " ", $name);
        $removedExtFileName = str_replace(".".$ext, "", $cleanedName);

        $newFile = FileList::create([
            'Type' => $filetype,
            'Path' => $dosyaAdi,
            'ArticelId' => $articelId,
            'FileName' => $removedExtFileName,
            'ext' => $ext
        ]);

        return response()->json(['success' => 1, 'file' => $newFile]);
    }
}
