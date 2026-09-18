<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index()
    {
        return Note::latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'nullable|string',
        ]);
        return Note::create($validated);
    }

    public function show(Note $note)
    {
        return $note;
    }

    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'body' => 'nullable|string',
        ]);
        $note->update($validated);
        return $note;
    }

    public function destroy(Note $note)
    {
        $note->delete();
        return response()->noContent();
    }
}
