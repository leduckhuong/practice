class PreviewFiles {
    private preview: string;
    private input: string;
    constructor(_preview:string, _input:string) {
        this.preview = _preview;
        this.input = _input;
    }
    public listen():void {
        const previewElement:JQuery<HTMLImageElement> = $(this.preview);
            const inputFileElement:JQuery<HTMLInputElement> = $(this.input);
            inputFileElement.on('change', (e) => {
                const reader:FileReader = new FileReader();
                const files:FileList|null = e.target.files;
                if(files!==null) {
                    const file:File = files[0];
                    reader.readAsDataURL(file);
                    reader.addEventListener('load', (e) => {
                        previewElement.attr({
                            src: e.target?.result || '',
                            alt: file.name
                        });
                    })
                }
            });
    }
}