<template>
    <input class="custom-file-input" type="file" @change="onChange" :index="index" :multiple="multiple" accept="image/*" />
</template>


<script>
export default {
    props: {
        // Support Multiple File?
        multiple: {
            type: Boolean,
            default: false
        },
        index: {
            default: ''
        },
        // Pass the files info when it's done
        done: {
            type: Function,
            default: () => { }
        }
    },
    methods: {
        onChange(e) {
            // get the files
            let files = e.target.files;
            // Process each file
            var allFiles = []
            for (var i = 0; i < files.length; i++) {
                let file = files[i]
                // Make new FileReader
                let reader = new FileReader()
                // Convert the file to base64 text
                reader.readAsDataURL(file)
                // on reader load somthing...
                reader.onload = () => {
                    // Make a fileInfo Object
                    let fileInfo = {
                        name: file.name,
                        type: file.type,
                        size: Math.round(file.size / 1000) + ' kB',
                        base64: reader.result,
                        file: file,
                        index: this.index
                    }
                    // Push it to the state
                    allFiles.push(fileInfo)
                    // If all files have been proceed
                    if (allFiles.length == files.length) {
                        // Apply Callback function
                        if (this.multiple) this.done(allFiles)
                        else this.done(allFiles[0])
                    }
                } // reader.onload
            } // for
        }, // onChange()
    }
};
</script>

<style scope>
.custom-file-input{
    width: 170px;
    float: right;
    outline: none!important;
}
.custom-file-input::-webkit-file-upload-button {
    visibility: hidden;
    outline: none;
}
.custom-file-input::before {
    content: 'آپلود عکس';
    display: inline-block;
    background: #71e0ca;
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 7px 50px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    font-weight: bold;
    box-shadow: 0px 5px 0px #55c9b2;
    transition: all .2s ease-in;
}
.custom-file-input:hover::before{
    box-shadow: 0px 3px 0px #55c9b2;
    transition: all .2s ease-in;
}
.custom-file-input:hover::before {
    outline: none;
}
.custom-file-input:active::before {
    background: #71e0ca;
    outline: none;
    box-shadow: none;
    transition: all .2s ease-in;
}
</style>