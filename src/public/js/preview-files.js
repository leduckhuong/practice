"use strict";
class PreviewFiles {
    constructor(_preview, _input) {
        this.preview = _preview;
        this.input = _input;
    }
    listen() {
        const previewElement = $(this.preview);
        const inputFileElement = $(this.input);
        inputFileElement.on('change', (e) => {
            const reader = new FileReader();
            const files = e.target.files;
            if (files !== null) {
                const file = files[0];
                reader.readAsDataURL(file);
                reader.addEventListener('load', (e) => {
                    var _a;
                    previewElement.attr({
                        src: ((_a = e.target) === null || _a === void 0 ? void 0 : _a.result) || '',
                        alt: file.name
                    });
                });
            }
        });
    }
}
