import { FileAudio } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react";
import { getFFmpeg } from "./lib/ffmpeg";

export function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  async function convertToMp3() {
    const ffmpeg = await getFFmpeg()
    ffmpeg.readFile(selectedFile?.name as string)
  }

  function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }

    const audioBlob = new Blob([file as Blob], { type: 'audio/mp3' })

    const fileURL = URL.createObjectURL(audioBlob);

    return fileURL
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen  bg-slate-950 space-y-6">
      <h1 className="text-3xl text-slate-200 font-semibold max-w-sm w-full text-center">Edite seus áudios da forma que quiser!</h1>
      <p className="text-slate-400">Aqui você pode cortar, juntar, converter e muito mais!</p>


      <Label className="flex flex-col items-center justify-center gap-2 w-full max-w-sm cursor-pointer text-slate-500 border border-slate-500 px-10 py-10 rounded-md" htmlFor="picture">
        {selectedFile ? selectedFile.name : (
          <>
            <FileAudio />
            Audio
          </>
        )}

      </Label>
      <Input className="sr-only" id="picture" type="file" accept="audio/*" onChange={onFileChange} />


      <Button disabled={!selectedFile} onClick={getFFmpeg} className="max-w-sm w-full" variant={"secondary"}>Processar</Button>
    </main>
  )
}


